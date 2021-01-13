const path = require("path");
const fse = require("fs-extra");
//
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const di = require(path.join(__dirname, "..", "di", "index"));
        const { Offer } = di.get("models");
        //
        const data = require(path.join(__dirname, "offers_template", "data"));
        // copy images
        data.forEach((offer) => {
            const src = path.join(__dirname, "offers_template", "images", offer.path);
            const dest = path.join(__dirname, "..", "..", "upload", "offers", offer.path);
            fse.copySync(src, dest);
        });
        // bulk insertion
        await Offer.bulkCreate(data);
    },

    down: async (queryInterface, Sequelize) => {},
};
