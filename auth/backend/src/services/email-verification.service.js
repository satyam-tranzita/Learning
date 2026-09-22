import {
    User
} from "../models/index.js";

import {
    ApiError
} from "../utils/api-error.js";

import {
    publishVerificationEmail
} from "./email-queue.service.js";

import crypto from "crypto";
import { redisClient } from "../config/redis.js";

const VERIFICATION_TTL = 60 * 5;

const RESEND_COOLDOWN = 60;

const MAX_RESENDS_PER_HOUR = 5;

const getTokenKey = (tokenHash) => {
    return `email_verify:token:${tokenHash}`;
};

const getUserKey = (userId) => {
    return `email_verify:user:${userId}`;
};

const getCooldownKey = (userId) => {
    return `email_verify:cooldown:${userId}`;
};

const getRateLimitKey = (userId) => {
    return `email_verify:resend:${userId}`;
};

export const generateVerificationToken = () => {
    return crypto
        .randomBytes(32)
        .toString("hex");
};

export const hashVerificationToken = (token) => {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
};

export const storeVerificationToken = async (
    token,
    userId
) => {
    const tokenHash =
        hashVerificationToken(token);

    const tokenKey =
        getTokenKey(tokenHash);

    const userKey =
        getUserKey(userId);

    const oldTokenHash =
        await redisClient.get(userKey);

    if (oldTokenHash) {
        await redisClient.del(
            getTokenKey(oldTokenHash)
        );
    }

    await redisClient.set(
        tokenKey,
        String(userId),
        {
            EX: VERIFICATION_TTL
        }
    );

    await redisClient.set(
        userKey,
        tokenHash,
        {
            EX: VERIFICATION_TTL
        }
    );

    return tokenHash;
};

export const getVerificationUserId = async (
    token
) => {
    const tokenHash =
        hashVerificationToken(token);

    const tokenKey =
        getTokenKey(tokenHash);

    const userId =
        await redisClient.get(tokenKey);

    if (!userId) {
        return null;
    }

    return Number(userId);
};

export const deleteVerificationToken = async (
    token
) => {
    const tokenHash =
        hashVerificationToken(token);

    const tokenKey =
        getTokenKey(tokenHash);

    const userId =
        await redisClient.get(tokenKey);

    await redisClient.del(tokenKey);

    if (userId) {
        await redisClient.del(
            getUserKey(userId)
        );
    }
};

export const checkResendRateLimit = async (
    userId
) => {
    const cooldownKey =
        getCooldownKey(userId);

    const rateLimitKey =
        getRateLimitKey(userId);

    const cooldownExists =
        await redisClient.exists(
            cooldownKey
        );

    if (cooldownExists) {
        return {
            allowed: false,
            reason: "cooldown"
        };
    }

    const requestCount =
        await redisClient.get(
            rateLimitKey
        );

    if (
        requestCount &&
        Number(requestCount) >=
            MAX_RESENDS_PER_HOUR
    ) {
        return {
            allowed: false,
            reason: "hourly_limit"
        };
    }

    return {
        allowed: true
    };
};

export const recordResendRequest = async (
    userId
) => {
    const cooldownKey =
        getCooldownKey(userId);

    const rateLimitKey =
        getRateLimitKey(userId);

    await redisClient.set(
        cooldownKey,
        "1",
        {
            EX: RESEND_COOLDOWN
        }
    );

    const count =
        await redisClient.incr(
            rateLimitKey
        );

    if (count === 1) {
        await redisClient.expire(
            rateLimitKey,
            60 * 60
        );
    }
};


export const verifyEmail = async (
    token
) => {
    if (!token) {
        throw new ApiError(
            400,
            "Verification token is required"
        );
    }

    const userId =
        await getVerificationUserId(
            token
        );

    if (!userId) {
        throw new ApiError(
            400,
            "Invalid or expired verification link"
        );
    }

    const user =
        await User.findByPk(userId);

    if (!user) {
        throw new ApiError(
            400,
            "Invalid verification link"
        );
    }

    if (user.emailVerifiedAt) {
        await deleteVerificationToken(
            token
        );

        return;
    }

    await User.update(
        {
            emailVerifiedAt: new Date()
        },
        {
            where: {
                id: userId,
                emailVerifiedAt: null
            }
        }
    );

    await deleteVerificationToken(
        token
    );
};

export const resendVerificationEmail = async (
    userId
) => {
    const user =
        await User.findByPk(userId);

    if (!user) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    if (user.emailVerifiedAt) {
        throw new ApiError(
            400,
            "Email is already verified"
        );
    }

    const rateLimit =
        await checkResendRateLimit(
            userId
        );

    if (!rateLimit.allowed) {
        if (
            rateLimit.reason ===
            "cooldown"
        ) {
            throw new ApiError(
                429,
                "Please wait before requesting another verification email"
            );
        }

        throw new ApiError(
            429,
            "Too many verification email requests. Please try again later."
        );
    }

    const token =
        generateVerificationToken();

    await storeVerificationToken(
        token,
        user.id
    );

    await recordResendRequest(
        user.id
    );

    await publishVerificationEmail({
        email: user.email,
        name: user.name,
        token
    });
};