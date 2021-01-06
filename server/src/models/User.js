const path = require("path");
const di = require(path.join(__dirname, "..", "di", "index"));
//
module.exports = (sequelize) => {
    let User = {};
    const scheme = di.get("models.user.schema");
    //
    if (sequelize) {
        User = sequelize.define("User", {
            ...scheme,
        });
    }
    //
    return User;
};
