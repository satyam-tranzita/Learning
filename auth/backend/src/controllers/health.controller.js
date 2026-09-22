import { sequelize } from "../config/database.js";

export const healthCheck = async (req, res, next) => {
    try {
        await sequelize.authenticate();

        return res.status(200).json({
            success: true,
            message: "AuthCore API is healthy",
            data: {
                service: "authcore-api",
                database: "connected",
                environment: process.env.NODE_ENV
            }
        });
    } catch (error) {
        next(error);
    }
};