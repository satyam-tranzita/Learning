"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            id: {
                type: Sequelize.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },

            name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },

            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },

            password_hash: {
                type: Sequelize.STRING(255),
                allowNull: true
            },

            email_verified_at: {
                type: Sequelize.DATE,
                allowNull: true
            },

            status: {
                type: Sequelize.ENUM(
                    "active",
                    "suspended",
                    "deleted"
                ),
                allowNull: false,
                defaultValue: "active"
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal(
                    "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                )
            }
        });

        await queryInterface.addIndex(
            "users",
            ["email"],
            {
                unique: true,
                name: "users_email_unique"
            }
        );
    },

    async down(queryInterface) {
        await queryInterface.dropTable("users");
    }
};