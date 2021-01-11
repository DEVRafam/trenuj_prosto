const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const config = require(path.join(__dirname, "..", "config", "config"));
//
module.exports = {
    parameters: {
        jwt,
        bcrypt,
        config,
    },
    services: {
        "controllers.user": {
            class: "controllers/UserController",
            arguments: ["@models"],
        },
        "controllers.offer": {
            class: "controllers/OfferController",
            arguments: ["@models"],
        },
        "controllers.auth.login": {
            class: "controllers/auth/LoginController",
            arguments: ["@models", "%jwt%", "%bcrypt%"],
        },
        "controllers.auth.logout": {
            class: "controllers/auth/LogoutController",
            arguments: ["@models", "%jwt%"],
        },
        "controllers.auth.refresh": {
            class: "controllers/auth/RefreshTokenController",
            arguments: ["@models", "%jwt%", "%config%"],
        },
    },
};
