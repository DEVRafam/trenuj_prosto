const path = require("path");
const genereteSeeder = require(path.join("..", "helpers", "seederGenerator"));
const di = require(path.join(__dirname, "..", "di", "index"));
const { Offer } = di.get("models");
const data = require(path.join(__dirname, "offers_template", "data"));
//
module.exports = genereteSeeder(Offer, data, {
    imagesTemplate: path.join(__dirname, "offers_template", "images"),
    uploadDir: path.join(__dirname, "..", "..", "upload", "offers"),
});
