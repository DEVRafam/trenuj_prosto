console.clear();
//
const app = require("express")();
const path = require("path");
const env = require(path.join(__dirname, "helpers", "env"));
//
// DI
//
const di = require("./di");
//
// PACKAGES
//
const packages = ["cors", "helmet", "express-fileupload"];
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
packages.forEach((middleware) => app.use(require(middleware)()));
//
// ROUTES
//
const routes = require(path.join(__dirname, "routes", "index"))(di);
app.use("/api", routes);
//
// LISTENING
//
const port = env("APP_PORT", 3000);
app.listen(port, () => {
    console.log(`app is running at port ${port}`);
});
