const fse = require("fs-extra");
const path = require("path");
const dirPath = path.join(__dirname, "..", "..", "upload", "offers");
//
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const di = require("../di/index");
        const schema = di.get("models.offer.schema");
        // create directory for storage uploaded offers images
        fse.ensureDirSync(dirPath);
        //
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
        //
        fse.removeSync(dirPath);
        //
        await queryInterface.dropTable("Offers");
    },
};
