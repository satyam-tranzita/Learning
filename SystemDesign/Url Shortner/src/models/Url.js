import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Url = sequelize.define(
    "Url",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },

        shortCode: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            field: "short_code",
        },

        originalUrl: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: "original_url",
        },

        expiresAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "expires_at",
        },
    },
    {
        tableName: "urls",
        timestamps: true,
        underscored: true,
    }
);