module.exports = {
    services: {
        "controllers.user": {
            class: "controllers/UserController",
            arguments: ["@models"],
        },
        "controllers.auth": {
            class: "controllers/AuthController",
            arguments: ["@models"],
        },
    },
};
