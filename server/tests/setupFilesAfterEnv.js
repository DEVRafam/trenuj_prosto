const path = require("path");
const app = require(path.join(__dirname, "..", "src", "app"));
const di = require(path.join(__dirname, "..", "src", "di", "index.js"));
//
global.di = di;
global.request = require("supertest")(app);
//
global.__loginData = null;
global.__basepath = __dirname;
global.__pathToUploaded = path.join(__dirname, "..", "upload");
//
jest.setTimeout(10000);
//
const sequelize = di.get("sequelize");
//
afterAll(async () => {
    jest.clearAllMocks();
    await sequelize.close();
});
