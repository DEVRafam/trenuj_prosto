const fse = require("fs-extra");
const path = require("path");
const dirPath = path.join(__dirname, "..", "..", "upload", "offers");
const TABLE_NAME = "Events";
//
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const di = require("../di/index");
        const schema = di.get("models.event.schema");
        // create directory for storage uploaded offers images
        fse.ensureDirSync(dirPath);
        //
        await queryInterface.createTable(TABLE_NAME, {
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
        //
        fse.removeSync(dirPath);
        //
        await queryInterface.dropTable(TABLE_NAME);
    },
};
