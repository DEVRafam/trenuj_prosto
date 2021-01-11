const path = require("path");
const di = require(path.join(__dirname, "..", "di", "index"));
//
module.exports = (sequelize) => {
    let Offer = {};
    const scheme = di.get("models.offer.schema");
    //
    if (sequelize) {
        Offer = sequelize.define("Offer", {
            ...scheme,
        });
    }
    //
    return Offer;
};
