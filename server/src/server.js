console.clear();
const path = require("path");
const app = require("./app");
const env = require(path.join(__dirname, "helpers", "env"));
//
// LISTENING
//
const port = env("APP_PORT", 3000);
const server = app.listen(port, () => {
    console.log(`app is running at port ${port}`);
});
//
module.exports = server;
