import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const RefreshToken = sequelize.define(
    "RefreshToken",
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
        sessionId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
            field: "session_id"
        },

        tokenHash: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true,
            field: "token_hash"
        },

        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "expires_at"
        },

        revokedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "revoked_at"
        }
    },
    {
        tableName: "refresh_tokens"
    }
);