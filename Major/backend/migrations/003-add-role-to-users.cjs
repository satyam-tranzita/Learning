"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("users", "role", {
            type: Sequelize.ENUM(
                "USER",
                "MANAGER",
                "ADMIN"
            ),
            allowNull: false,
            defaultValue: "USER"
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn("users", "role");
    }
};