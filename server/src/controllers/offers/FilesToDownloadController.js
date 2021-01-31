const path = require("path");
const getAllFilesToDownload = require(path.join(__dirname, "..", "..", "helpers", "getAllFilesToDownload"));
//
class FilesToDownloadController {
    constructor() {
        const { items, pathToDir } = getAllFilesToDownload();
        this.allFiles = items;
        this.pathToDir = pathToDir;
    }
    //
    getAllFiles(req, res) {
        res.send(this.allFiles);
    }
    downloadSingleFile(req, res) {
        const { fileName } = req.params;
        const { allFiles, pathToDir } = this;
        //
        if (!allFiles.includes(fileName)) return res.sendStatus(404);
        else {
            res.download(path.join(pathToDir, fileName));
        }
    }
}
module.exports = FilesToDownloadController;
