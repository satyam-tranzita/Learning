"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn(
            "refresh_tokens",
            "session_id",
            {
                type: Sequelize.BIGINT.UNSIGNED,
                allowNull: true,
                references: {
                    model: "sessions",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        );

        await queryInterface.addIndex(
            "refresh_tokens",
            ["session_id"]
        );
    },

    async down(queryInterface) {
        await queryInterface.removeColumn(
            "refresh_tokens",
            "session_id"
        );
    }
};