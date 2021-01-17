const path = require("path");
const di = require("../di/index");
const generateMigration = require(path.join(__dirname, "..", "helpers", "migrationGenerator"));
const schema = di.get("models.user.schema");
//
module.exports = generateMigration("Users", schema);
