import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Task = sequelize.define(
    "Task",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        status: {
            type: DataTypes.ENUM(
                "TODO",
                "IN_PROGRESS",
                "COMPLETED"
            ),
            defaultValue: "TODO"
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "tasks",
        timestamps: true
    }
);

export default Task;