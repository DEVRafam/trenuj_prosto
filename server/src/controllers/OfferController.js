const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const { promisify } = require("util");
//
class OfferController {
    constructor(models) {
        this.Offer = models.Offer;
        this.User = models.User;
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
    //
    async getAll(req, res) {
        const exclude = ["createdAt", "updatedAt"];
        let offers = await this.Offer.findAll({
            attributes: {
                exclude,
            },
            order: [["id", "DESC"]],
        });
        const totalAmount = offers.length;
        // Pagination
        const page = req.query.page * 1,
            limit = req.query.limit * 1;
        const start = (page - 1) * limit,
            end = start + limit;
        //
        offers = offers.splice(start, end);
        //
        res.send({
            items: offers,
            totalPagesAmount: Math.ceil(totalAmount / limit),
        });
    }
    //
    async deleteOffer(req, res) {
        // validate token
        const { User, Offer } = this;
        const { id: userId } = req.authorizedToken;
        const user = await User.findOne({ where: { id: userId } });
        if (user === null) return res.sendStatus(403);
        //
        try {
            const { id: offerId } = req.params;
            const offer = await Offer.findOne({ where: { id: offerId * 1 } });
            //
            const dirPath = path.join(__dirname, "..", "..", "upload", "offers", offer.path);
            fse.removeSync(dirPath);
            await offer.destroy();
            //
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(500);
        }
    }
    //
    async getSingle(req, res) {
        const { destination } = req.params;
        //
        const exclude = ["id", "createdAt", "updatedAt"];
        const result = await this.Offer.findOne({
            where: { destination },
            // attributes: { exclude },
        });
        res.send(result);
    }
    //
    async getLogo(req, res) {
        const { destination } = req.params;
        const Offer = await this.Offer.findOne({ where: { destination } });
        res.sendFile(path.join(__dirname, "..", "..", "upload", "offers", Offer.path, Offer.logo));
    }
    //
    async getGalleryImg(req, res) {
        const { destination, index } = req.params;
        const Offer = await this.Offer.findOne({ where: { destination } });
        //
        const img = JSON.parse(Offer.gallery)[index];
        res.sendFile(path.join(__dirname, "..", "..", "upload", "offers", Offer.path, img));
    }
}
module.exports = OfferController;
