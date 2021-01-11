const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
//
class OfferController {
    constructor(models) {
        this.Offer = models.Offer;
    }
    //
    async createNewOffer(req, res) {
        try {
            const { destination, start } = req.body;
            const dirName = `${start}_${destination}`;
            const root = path.join(__dirname, "..", "..", "upload", "offers", dirName);
            // variables to store uploaded images names
            let logo,
                gallery = [];
            // Upload images
            fs.mkdir(root, {}, (err) => {});
            for (let imgKey in req.files) {
                const file = req.files[imgKey];
                const ext = file.name.split(".")[1];
                const fileName = `${imgKey}.${ext}`;
                //
                const uploadImg = promisify(file.mv);
                await uploadImg(`${root}/${fileName}`);
                //
                if (imgKey === "logo") logo = fileName;
                else gallery.push(fileName);
            }
            //
            const dataToDB = JSON.parse(JSON.stringify(req.body));
            dataToDB.logo = logo;
            dataToDB.gallery = JSON.stringify(gallery);
            dataToDB.path = dirName;
            //
            await this.Offer.create(dataToDB);
            //
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(500);
        }
    }
}
module.exports = OfferController;
