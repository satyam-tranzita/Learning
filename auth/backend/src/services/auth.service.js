import { sequelize } from "../config/database.js";
import { User, RefreshToken ,Session} from "../models/index.js";

import {
    hashPassword,
    comparePassword
} from "../utils/password.js";

import {
    generateAccessToken,
    generateRefreshToken,
    hashToken,
    verifyRefreshToken
} from "../utils/token.js";

import {
    generateVerificationToken,
    storeVerificationToken
} from "./email-verification.service.js";

import {
    publishVerificationEmail
} from "./email-queue.service.js";

import { ApiError } from "../utils/api-error.js";

export const registerUser = async ({
    name,
    email,
    password
}) => {
    const existingUser =
        await User.findOne({
            where: { email }
        });

    if (existingUser) {
        throw new ApiError(
            409,
            "Email already registered"
        );
    }

    const passwordHash =
        await hashPassword(password);

    const user =
        await User.create({
            name,
            email,
            passwordHash,
            emailVerifiedAt: null
        });

    const verificationToken =
        generateVerificationToken();

    await storeVerificationToken(
        verificationToken,
        user.id
    );

    await publishVerificationEmail({
        email: user.email,
        name: user.name,
        token: verificationToken
    });

    return user;
};

export const loginUser = async ({
    email,
    password,
    ipAddress,
    userAgent
}) => {
    const user = await User.findOne({
        where: { email }
    });

    if (!user) {
        throw new ApiError(
            401,
            "Invalid email or password"
        );
    }

    if (user.status !== "active") {
        throw new ApiError(
            403,
            "Account is not active"
        );
    }

    const passwordValid = await comparePassword(
        password,
        user.passwordHash
    );

    if (!passwordValid) {
        throw new ApiError(
            401,
            "Invalid email or password"
        );
    }

    const transaction =
        await sequelize.transaction();

    try {
        const session = await Session.create(
            {
                userId: user.id,
                deviceName: "Unknown Device",
                userAgent,
                ipAddress,
                lastActiveAt: new Date()
            },
            { transaction }
        );

        const accessToken =
            generateAccessToken(
                user,
                session.id
            );

        const refreshToken =
            generateRefreshToken(user);

        const refreshTokenHash =
            hashToken(refreshToken);

        const expiresAt = new Date();

        expiresAt.setDate(
            expiresAt.getDate() + 7
        );

        await RefreshToken.create(
            {
                userId: user.id,
                sessionId: session.id,
                tokenHash: refreshTokenHash,
                expiresAt
            },
            { transaction }
        );

        await transaction.commit();

        return {
            user,
            session,
            accessToken,
            refreshToken
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


export const findUserById = async (id) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    return user;
};


export const refreshUserToken = async (refreshToken) => {
    let payload;

    // --------------------------------
    // 1. Verify JWT signature + expiry
    // --------------------------------

    try {
        payload = verifyRefreshToken(refreshToken);
    } catch (error) {
        throw new ApiError(
            401,
            "Invalid or expired refresh token"
        );
    }

    if (payload.type !== "refresh") {
        throw new ApiError(
            401,
            "Invalid refresh token"
        );
    }

    const tokenHash = hashToken(refreshToken);

    // --------------------------------
    // 2. Start transaction
    // --------------------------------

    const transaction = await sequelize.transaction();

    try {
        // --------------------------------
        // 3. Find + LOCK refresh token row
        // --------------------------------
        //
        // SELECT ... FOR UPDATE
        //
        // This prevents two simultaneous
        // refresh requests from using the
        // same refresh token.
        // --------------------------------

        const storedToken = await RefreshToken.findOne({
            where: {
                tokenHash
            },
            lock: transaction.LOCK.UPDATE,
            transaction
        });

        if (!storedToken) {
            throw new ApiError(
                401,
                "Invalid refresh token"
            );
        }

        // --------------------------------
        // 4. Detect refresh-token reuse
        // --------------------------------

        if (storedToken.revokedAt) {

            // Revoke all active refresh tokens
            // belonging to this user.
            await RefreshToken.update(
                {
                    revokedAt: new Date()
                },
                {
                    where: {
                        userId: storedToken.userId,
                        revokedAt: null
                    },
                    transaction
                }
            );

            throw new ApiError(
                401,
                "Refresh token reuse detected. Please login again."
            );
        }

        // --------------------------------
        // 5. Check database expiration
        // --------------------------------

        if (storedToken.expiresAt < new Date()) {
            throw new ApiError(
                401,
                "Refresh token expired"
            );
        }

        // --------------------------------
        // 6. Find user
        // --------------------------------

        const user = await User.findByPk(
            storedToken.userId,
            {
                transaction
            }
        );

        if (!user) {
            throw new ApiError(
                401,
                "User not found"
            );
        }

        if (user.status !== "active") {
            throw new ApiError(
                403,
                "Account is not active"
            );
        }

        // --------------------------------
        // 7. Find session
        // --------------------------------

        const session = await Session.findByPk(
            storedToken.sessionId,
            {
                transaction
            }
        );

        if (!session) {
            throw new ApiError(
                401,
                "Session not found"
            );
        }

        // --------------------------------
        // 8. Check session status
        // --------------------------------

        if (session.revokedAt) {
            throw new ApiError(
                401,
                "Session has been revoked"
            );
        }

        const now = new Date();

        // --------------------------------
        // 9. Update session activity
        // --------------------------------

        session.lastActiveAt = now;

        await session.save({
            transaction
        });

        // --------------------------------
        // 10. Revoke OLD refresh token
        // --------------------------------

        storedToken.revokedAt = now;

        await storedToken.save({
            transaction
        });

        // --------------------------------
        // 11. Generate NEW tokens
        // --------------------------------

        const newAccessToken =
            generateAccessToken(
                user,
                session.id
            );

        const newRefreshToken =
            generateRefreshToken(user);

        const newRefreshTokenHash =
            hashToken(newRefreshToken);

        // --------------------------------
        // 12. Calculate expiration
        // --------------------------------

        const expiresAt = new Date();

        expiresAt.setDate(
            expiresAt.getDate() + 7
        );

        // --------------------------------
        // 13. Store NEW refresh token
        // --------------------------------

        await RefreshToken.create(
            {
                userId: user.id,
                sessionId: session.id,
                tokenHash: newRefreshTokenHash,
                expiresAt
            },
            {
                transaction
            }
        );

        // --------------------------------
        // 14. Commit everything together
        // --------------------------------

        await transaction.commit();

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };

    } catch (error) {

        // --------------------------------
        // Rollback everything if anything
        // fails.
        // --------------------------------

        await transaction.rollback();

        throw error;
    }
};


export const logoutUser = async (refreshToken) => {
    if (!refreshToken) {
        return;
    }

    const tokenHash = hashToken(refreshToken);

    const storedToken = await RefreshToken.findOne({
        where: {
            tokenHash
        }
    });

    if (!storedToken) {
        return;
    }

    await RefreshToken.update(
        {
            revokedAt: new Date()
        },
        {
            where: {
                tokenHash,
                revokedAt: null
            }
        }
    );

    if (storedToken.sessionId) {
        await Session.update(
            {
                revokedAt: new Date()
            },
            {
                where: {
                    id: storedToken.sessionId,
                    revokedAt: null
                }
            }
        );
    }
};


export const logoutAllDevices = async (userId) => {
    const now = new Date();

    await RefreshToken.update(
        {
            revokedAt: now
        },
        {
            where: {
                userId,
                revokedAt: null
            }
        }
    );

    await Session.update(
        {
            revokedAt: now
        },
        {
            where: {
                userId,
                revokedAt: null
            }
        }
    );
};

