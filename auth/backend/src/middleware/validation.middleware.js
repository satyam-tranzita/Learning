import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

export const validationMiddleware = (
    req,
    res,
    next
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new ApiError(
                422,
                "Validation failed",
                errors.array().map((error) => ({
                    field: error.path,
                    message: error.msg
                }))
            )
        );
    }

    next();
};