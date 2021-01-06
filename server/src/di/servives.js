const path = require("path");
const config = require(path.join(__dirname, "..", "config", "config"));
//
module.exports = {
    parameters: {
        config,
    },
    services: {
        sequelize: {
            arguments: ["%config%"],
            factory: {
                class: "di/services/SequelizeFactory",
                method: "connect",
            },
        },
    },
};
