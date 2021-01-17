const path = require("path");
const di = require("../di/index");
const generateMigration = require(path.join(__dirname, "..", "helpers", "migrationGenerator"));
const schema = di.get("models.offer.schema");
const dirPath = path.join(__dirname, "..", "..", "upload", "offers");
//
module.exports = generateMigration("Offers", schema, dirPath);
