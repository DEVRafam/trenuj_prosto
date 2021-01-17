const path = require("path");
const di = require("../di/index");
const generateMigration = require(path.join(__dirname, "..", "helpers", "migrationGenerator"));
const schema = di.get("models.event.schema");
const dirPath = path.join(__dirname, "..", "..", "upload", "events");
//
module.exports = generateMigration("Events", schema, dirPath);
