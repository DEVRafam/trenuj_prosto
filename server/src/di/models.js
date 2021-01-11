const { DataTypes } = require("sequelize");
//
module.exports = {
    parameters: {
        DataTypes,
    },
    services: {
        "models.user.schema": {
            arguments: ["%DataTypes%"],
            factory: {
                class: "di/modelSchemas/UserModelSchema",
                method: "create",
            },
        },
        "models.offer.schema": {
            arguments: ["%DataTypes%"],
            factory: {
                class: "di/modelSchemas/OfferModelSchema",
                method: "create",
            },
        },
        models: {
            arguments: ["@sequelize"],
            factory: {
                class: "di/services/ModelsFactory",
                method: "getAllModals",
            },
        },
    },
};
