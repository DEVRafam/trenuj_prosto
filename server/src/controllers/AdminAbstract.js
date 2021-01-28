const path = require("path");
const { promisify } = require("util");
const fse = require("fs-extra");
const generateSlugName = require("../helpers/generateSlugName");
//
module.exports = class {
    constructor(models, pathToUploadedDir) {
        this.Offer = models.Offer;
        this.User = models.User;
        this.Event = models.Event;
        //
        this.pathToUploadedDir = pathToUploadedDir;
    }
    async deepUserAuthorization(req) {
        const { id: userId } = req.authorizedToken;
        const result = await this.User.findOne({ where: { id: userId } });
        return !!result;
    }
    createDirToStoreImages(prefix) {
        const dirName = `${prefix}_${Date.now()}`;
        fse.ensureDirSync(path.join(this.pathToUploadedDir, dirName));
        return dirName;
    }
    async uploadSingleImage(imgKey, req, dirName) {
        const file = req.files[imgKey];
        const ext = file.name.split(".")[1];
        const fileName = `${imgKey}.${ext}`;
        //
        const uploadImg = promisify(file.mv);
        await uploadImg(path.join(this.pathToUploadedDir, dirName, fileName));
        //
        return fileName;
    }
    async uploadAllImages(req, dirName) {
        let logo,
            gallery = [];
        for (let imgKey in req.files) {
            const fileName = await this.uploadSingleImage(imgKey, req, dirName);
            if (imgKey === "logo") logo = fileName;
            else gallery.push(fileName);
        }
        //
        return { logo, gallery };
    }
    async deleteRow(req, model) {
        const { id } = req.params;
        const modelData = await this[model].findOne({ where: { id: id * 1 } });
        //
        if (modelData === null) return 404;
        else {
            const dirPath = path.join(this.pathToUploadedDir, modelData.path);
            fse.removeSync(dirPath);
            await modelData.destroy();
            return 200;
        }
    }
    // OFFER DATA
    generateDataObjectForCreatingOffer(req, dirName, logo, gallery) {
        const dataToDB = JSON.parse(JSON.stringify(req.body));
        dataToDB.logo = logo;
        dataToDB.gallery = JSON.stringify(gallery);
        dataToDB.path = dirName;
        dataToDB.slug = generateSlugName(dataToDB.destination);
        return dataToDB;
    }
    // EVENT DATA
    generateDataObjectForCreatingEvent(req, dirName, logo, images) {
        const dataToDB = JSON.parse(JSON.stringify(req.body));
        dataToDB.logo = logo;
        dataToDB.images = JSON.stringify(images);
        dataToDB.path = dirName;
        dataToDB.slug = generateSlugName(dataToDB.title);
        return dataToDB;
    }
};
