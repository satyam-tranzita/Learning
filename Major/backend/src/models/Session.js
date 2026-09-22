import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Session = sequelize.define(
    "Session",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        refreshTokenHash: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        },

        revokedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        tableName: "sessions",
        timestamps: true
    }
);

export default Session;
