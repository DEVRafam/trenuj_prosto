module.exports = {
    up: async (queryInterface, Sequelize) => {
        const di = require("../di/index");
        const schema = di.get("models.user.schema");
        await queryInterface.createTable("Users", {
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
    down: async (queryInterface) => {
        await queryInterface.dropTable("Users");
    },
};
