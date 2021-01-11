"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const di = require("../di/index");
        const schema = di.get("models.offer.schema");
        await queryInterface.createTable("Offers", {
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
            },
            ...schema,
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()"),
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Offers");
    },
};
