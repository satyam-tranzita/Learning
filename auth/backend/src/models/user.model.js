import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        passwordHash: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: "password_hash"
        },

        emailVerifiedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "email_verified_at"
        },

        status: {
            type: DataTypes.ENUM(
                "active",
                "suspended",
                "deleted"
            ),
            allowNull: false,
            defaultValue: "active"
        }
    },
    {
        tableName: "users"
    }
);