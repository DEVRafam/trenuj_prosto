const router = require("express").Router();
const fs = require("fs");
const path = require("path");
//
module.exports = (di) => {
    fs.readdirSync(__dirname).forEach((route) => {
        if (route === "index.js") return;
        const routeName = route.split(".")[0];
        router.use(`/${routeName}`, require(path.join(__dirname, route))(di));
    });
    //
    return router;
};
