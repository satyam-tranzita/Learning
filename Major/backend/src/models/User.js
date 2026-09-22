import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
           role: {
            type: DataTypes.ENUM(
                "USER",
                "MANAGER",
                "ADMIN"
            ),
            allowNull: false,
            defaultValue: "USER"
        },
    },
    {
        tableName: "users",
        timestamps: true
    }
);

export default User;