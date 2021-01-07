const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//
module.exports = {
    parameters: {
        jwt,
        bcrypt,
    },
    services: {
        "controllers.user": {
            class: "controllers/UserController",
            arguments: ["@models"],
        },
        "controllers.login": {
            class: "controllers/auth/LoginController",
            arguments: ["@models", "%jwt%", "%bcrypt%"],
        },
        "controllers.logout": {
            class: "controllers/auth/LogoutController",
            arguments: ["@models", "%jwt%"],
        },
    },
};
