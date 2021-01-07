const path = require("path");
const bcrypt = require("bcrypt");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const di = require(path.join(__dirname, "..", "di", "index"));
        const { User } = di.get("models");
        // hash password
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash("zaq12345", salt);
        //
        await User.create({
            name: "Kacper",
            surname: "Ksiazek",
            email: "kacperksiazek@gmail.com",
            password,
        });
    },

    down: async (queryInterface, Sequelize) => {},
};
