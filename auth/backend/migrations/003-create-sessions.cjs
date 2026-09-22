"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("sessions", {
            id: {
                type: Sequelize.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },

            user_id: {
                type: Sequelize.BIGINT.UNSIGNED,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },

            device_name: {
                type: Sequelize.STRING(100),
                allowNull: true
            },

            user_agent: {
                type: Sequelize.TEXT,
                allowNull: true
            },

            ip_address: {
                type: Sequelize.STRING(45),
                allowNull: true
            },

            last_active_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },

            revoked_at: {
                type: Sequelize.DATE,
                allowNull: true
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }
        });

        await queryInterface.addIndex(
            "sessions",
            ["user_id"]
        );
    },

    async down(queryInterface) {
        await queryInterface.dropTable("sessions");
    }
};