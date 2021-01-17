const path = require("path");
const di = require(path.join(__dirname, "..", "di", "index"));
//
module.exports = (sequelize) => {
    let Event = {};
    const scheme = di.get("models.event.schema");
    //
    if (sequelize) {
        Event = sequelize.define("Event", {
            ...scheme,
        });
    }
    //
    return Event;
};
