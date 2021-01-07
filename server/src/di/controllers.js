const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//
module.exports = {
    parameters: {
        Joi,
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
            arguments: ["@models", "%Joi%", "%jwt%", "%bcrypt%"],
        },
    },
};
