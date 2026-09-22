export const errorMiddleware = (
    err,
    req,
    res,
    next
) => {
    console.error(err);

    const statusCode = err.statusCode || 500;

    const response = {
        success: false,
        message:
            statusCode === 500
                ? "Internal server error"
                : err.message
    };

    if (err.details) {
        response.details = err.details;
    }

    if (process.env.NODE_ENV !== "production") {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};