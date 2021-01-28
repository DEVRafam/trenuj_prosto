const path = require("path");
//
module.exports = class {
    constructor(models, pathToUploadedEvents) {
        this.Event = models.Event;
        this.pathToUploadedEvents = pathToUploadedEvents;
    }
    //
    async logo(req, res) {
        try {
            const { id } = req.params;
            const eventData = await this.Event.findOne({ where: { id } });
            if (eventData === null) return res.sendStatus(404);
            //
            res.sendFile(path.join(this.pathToUploadedEvents, eventData.path, eventData.logo));
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    //
    async contentImage(req, res) {
        try {
            const { id, imgIndex } = req.params;
            const eventData = await this.Event.findOne({ where: { id } });
            if (eventData === null) return res.sendStatus(404);
            //
            let img = false;
            JSON.parse(eventData.images).forEach((singleImage) => {
                if (singleImage.includes(imgIndex)) {
                    img = singleImage;
                }
            });
            if (!img) return res.sendStatus(404);
            res.sendFile(path.join(this.pathToUploadedEvents, eventData.path, img));
        } catch (e) {
            return res.sendStatus(500);
        }
    }
};
