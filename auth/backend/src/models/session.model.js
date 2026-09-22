import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Session = sequelize.define(
    "Session",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },

        userId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: "user_id"
        },

        deviceName: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: "device_name"
        },

        userAgent: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "user_agent"
        },

        ipAddress: {
            type: DataTypes.STRING(45),
            allowNull: true,
            field: "ip_address"
        },

        lastActiveAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "last_active_at"
        },

        revokedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "revoked_at"
        }
    },
    {
        tableName: "sessions"
    }
);