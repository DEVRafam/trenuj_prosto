const fs = require("fs");
const path = require("path");
//
module.exports = () => {
    const p = path.join(__dirname, "..", "..", "files_to_download");
    //
    return {
        pathToDir: p,
        items: fs.readdirSync(p),
    };
};
