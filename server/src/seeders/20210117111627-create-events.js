const path = require("path");
const genereteSeeder = require(path.join("..", "helpers", "seederGenerator"));
const di = require(path.join(__dirname, "..", "di", "index"));
const { Event } = di.get("models");
const data = require(path.join(__dirname, "events_template", "data"));
//
module.exports = genereteSeeder(Event, data, {
    imagesTemplate: path.join(__dirname, "events_template", "images"),
    uploadDir: path.join(__dirname, "..", "..", "upload", "events"),
});
