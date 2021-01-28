const path = require("path");
//
module.exports = class {
    constructor(models, pathToUploadedOffers) {
        this.Offer = models.Offer;
        this.pathToUploadedOffers = pathToUploadedOffers;
    }
    //
    async logo(req, res) {
        try {
            const { id } = req.params;
            const offerData = await this.Offer.findOne({ where: { id } });
            if (offerData === null) return res.sendStatus(404);
            //
            res.sendFile(path.join(this.pathToUploadedOffers, offerData.path, offerData.logo));
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    //
    async galleryImage(req, res) {
        try {
            const { id, index } = req.params;
            const offerData = await this.Offer.findOne({ where: { id } });
            if (offerData === null) return res.sendStatus(404);
            //
            const img = JSON.parse(offerData.gallery)[index];
            if (img === undefined) return res.sendStatus(404);
            res.sendFile(path.join(this.pathToUploadedOffers, offerData.path, img));
        } catch (e) {
            return res.sendStatus(500);
        }
    }
};
