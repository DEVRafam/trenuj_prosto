const path = require("path");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert;
        const di = require(path.join(__dirname, "..", "di", "index"));
        const { User } = di.get("models");
        //
        User.create({
            name: "Kacper",
            surname: "Ksiazek",
            email: "kacperksiazek@gmail.com",
            password: "zaq12345",
        });
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
