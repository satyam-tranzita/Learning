import crypto from "crypto";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateAccessToken = (user,sessionId) => {
    return jwt.sign(
        {
            sub: String(user.id),
            sessionId:String(sessionId),
            type: "access"
        },
        env.jwt.accessSecret,
        {
            expiresIn: env.jwt.accessExpiresIn
        }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            sub: String(user.id),
            type: "refresh"
        },
        env.jwt.refreshSecret,
        {
            expiresIn: env.jwt.refreshExpiresIn
        }
    );
};

export const verifyAccessToken = (token) => {
    return jwt.verify(
        token,
        env.jwt.accessSecret
    );
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(
        token,
        env.jwt.refreshSecret
    );
};

export const hashToken = (token) => {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
};


//randomToken
export const generateRandomToken = () => {
    return crypto.randomBytes(32).toString("hex");
};
