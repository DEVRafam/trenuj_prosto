const path = require("path");
const { promisify } = require("util");
const fse = require("fs-extra");
//
module.exports = class {
    constructor(models, pathToUploadedOffers) {
        this.Offer = models.Offer;
        this.User = models.User;
        //
        this.pathToUploadedOffers = pathToUploadedOffers;
    }
    //
    // helpers functions only
    //
    async deepUserAuthorization(req) {
        const { id: userId } = req.authorizedToken;
        const result = await this.User.findOne({ where: { id: userId } });
        return !!result;
    }
    // for creating offer
    generateRootDirForCreatingOffer() {
        const dirName = `offer_${Date.now()}`;
        fse.ensureDirSync(path.join(this.pathToUploadedOffers, dirName));
        return dirName;
    }
    async uploadSingleImage(imgKey, req, dirName) {
        const file = req.files[imgKey];
        const ext = file.name.split(".")[1];
        const fileName = `${imgKey}.${ext}`;
        //
        const uploadImg = promisify(file.mv);
        await uploadImg(path.join(this.pathToUploadedOffers, dirName, fileName));
        //
        return fileName;
    }
    async uploadAllImagesForCreatingOffer(req, dirName) {
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
    generateDataObjectForCreatingOffer(req, dirName, logo, gallery) {
        const dataToDB = JSON.parse(JSON.stringify(req.body));
        dataToDB.logo = logo;
        dataToDB.gallery = JSON.stringify(gallery);
        dataToDB.path = dirName;
        return dataToDB;
    }
    // for offer deleting
};
