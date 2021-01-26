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
        // offers
        "controllers.offers.admin": {
            class: "controllers/offers/OffersAdminController",
            arguments: ["@models"],
        },
        "controllers.offers.getters": {
            class: "controllers/offers/OffersGettersController",
            arguments: ["@models"],
        },
        // events
        "controllers.events.getters": {
            class: "controllers/events/EventsGettersController",
            arguments: ["@models"],
        },
        "controllers.events.admin": {
            class: "controllers/events/EventsAdminController",
            arguments: ["@models"],
        },
        // authorization
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
