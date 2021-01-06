const fs = require("fs");
const path = require("path");
const { ContainerBuilder, JsFileLoader } = require("node-dependency-injection");
//
//
const main = () => {
    const srcDir = path.join(__dirname, "..");
    const container = new ContainerBuilder(true, srcDir);
    const loader = new JsFileLoader(container);
    //
    const allDIElements = fs.readdirSync(__dirname).filter((file) => file !== path.basename(__filename) && file.split(".")[1] === "js");
    allDIElements.forEach((diPath) => {
        loader.load(path.join(__dirname, diPath));
    });
    //
    return container;
};
//
module.exports = main();
