const path = require("path");
const bcrypt = require("bcrypt");
module.exports = {
    up: async () => {
        const di = require(path.join(__dirname, "..", "di", "index"));
        const { User } = di.get("models");
        // hash password
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash("TrenujProsto123", salt);
        //
        await User.create({
            name: "Kamil",
            surname: "Kuzia",
            email: "kamil.kuzia@onet.pl",
            password,
        });
    },

    down: async () => {},
};
