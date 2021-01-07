const fs = require("fs");
const path = require("path");
//
class MiddlewaresFactory {
    static getAllMiddlewares() {
        const result = {};
        //
        const root = path.join(__dirname, "..", "..", "middlewares");
        const middlewares = fs.readdirSync(root).filter((file) => file.slice(-3) === ".js");
        //
        middlewares.forEach((singleMiddleware) => {
            const fileBase = singleMiddleware.split(".")[0];
            result[fileBase] = require(path.join(root, fileBase));
        });
        //
        return result;
    }
}
//
MiddlewaresFactory.getAllMiddlewares();
module.exports = MiddlewaresFactory;
