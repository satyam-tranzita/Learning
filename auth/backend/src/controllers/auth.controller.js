import {
    registerUser,
    loginUser,
    findUserById,
    refreshUserToken,
    logoutUser,
    logoutAllDevices
} from "../services/auth.service.js";
import { ApiError } from "../utils/api-error.js";

import {
    resendVerificationEmail
} from "../services/email-verification.service.js";
import {
    verifyEmail
} from "../services/email-verification.service.js";


export const register = async (
    req,
    res,
    next
) => {
    try {
        const user =
            await registerUser(req.body);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    status: user.status
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req,
    res,
    next
) => {
    try {
        const {
            email,
            password
        } = req.body;

        const result = await loginUser({
            email,
            password,
            ipAddress: req.ip,
            userAgent: req.get("user-agent")
        });

        res.cookie(
            "refreshToken",
            result.refreshToken,
            {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        );

        return res.status(200).json({
            success: true,
            data: {
                accessToken: result.accessToken,
                user: {
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email,
                    status: result.user.status
                }
            }
        });
    } catch (error) {
        next(error);
    }
};


export const getMe = async (
    req,
    res,
    next
) => {
    try {
        const user =
            await findUserById(req.user.id);

        return res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    status: user.status,
                    emailVerifiedAt:
                        user.emailVerifiedAt
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

export const refresh = async (
    req,
    res,
    next
) => {
    try {
        const refreshToken =
            req.cookies.refreshToken;

        if (!refreshToken) {
            throw new ApiError(
                401,
                "Refresh token required"
            );
        }

        const {
            accessToken,
            refreshToken: newRefreshToken
        } = await refreshUserToken(
            refreshToken
        );

        res.cookie(
            "refreshToken",
            newRefreshToken,
            {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge:
                    7 * 24 * 60 * 60 * 1000
            }
        );

        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            data: {
                accessToken
            }
        });
    } catch (error) {
        next(error);
    }
};


export const logout = async (
    req,
    res,
    next
) => {
    try {
        const refreshToken =
            req.cookies.refreshToken;

        await logoutUser(refreshToken);

        res.clearCookie(
            "refreshToken",
            {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            }
        );

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};


export const logoutAll = async (
    req,
    res,
    next
) => {
    try {
        await logoutAllDevices(
            req.user.id
        );

        res.clearCookie(
            "refreshToken",
            {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            }
        );

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};


export const verifyEmailController = async (
    req,
    res,
    next
) => {
    try {
        const { token } = req.query;

        await verifyEmail(token);

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });
    } catch (error) {
        next(error);
    }
};


export const resendVerification = async (
    req,
    res,
    next
) => {
    try {
        const {
            email
        } = req.body;

        const user =
            await User.findOne({
                where: { email }
            });

        /*
         * Don't reveal whether the
         * email exists.
         */
        if (
            !user ||
            user.emailVerifiedAt
        ) {
            return res.status(200).json({
                success: true,
                message:
                    "If the account exists and requires verification, an email has been sent."
            });
        }

        await resendVerificationEmail(
            user.id
        );

        return res.status(200).json({
            success: true,
            message:
                "If the account exists and requires verification, an email has been sent."
        });
    } catch (error) {
        next(error);
    }
};