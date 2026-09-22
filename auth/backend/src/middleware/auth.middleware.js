import {
    verifyAccessToken
} from "../utils/token.js";

import { ApiError } from "../utils/api-error.js";

export const authenticate = (
    req,
    res,
    next
) => {
    try {
        const authorization =
            req.headers.authorization;

        if (!authorization) {
            throw new ApiError(
                401,
                "Authentication required"
            );
        }

        const [
            scheme,
            token
        ] = authorization.split(" ");

        if (
            scheme !== "Bearer" ||
            !token
        ) {
            throw new ApiError(
                401,
                "Invalid authorization header"
            );
        }

        const payload =
            verifyAccessToken(token);

        if (payload.type !== "access") {
            throw new ApiError(
                401,
                "Invalid access token"
            );
        }

        req.user = {
            id: payload.sub,
            sessionId:payload.sessionId
        };

        next();
    } catch (error) {
        if (
            error.name ===
            "JsonWebTokenError"
        ) {
            return next(
                new ApiError(
                    401,
                    "Invalid access token"
                )
            );
        }

        if (
            error.name ===
            "TokenExpiredError"
        ) {
            return next(
                new ApiError(
                    401,
                    "Access token expired"
                )
            );
        }

        next(error);
    }
};