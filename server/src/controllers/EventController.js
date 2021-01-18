const path = require("path");
const fse = require("fs-extra");
const { promisify } = require("util");
const { Op } = require("sequelize");
//
class EventController {
    constructor(models) {
        this.Event = models.Event;
        this.User = models.User;
        //
        this.bulkDataExcludes = ["updatedAt", "path", "images", "content"];
    }
    //
    async createNewEvent(req, res) {
        try {
            const dirName = `event_${Date.now()}`;
            const root = path.join(__dirname, "..", "..", "upload", "events", dirName);
            // variables to store uploaded images names
            let logo,
                images = [];
            // Upload images
            fse.ensureDirSync(root);
            for (let imgKey in req.files) {
                const file = req.files[imgKey];
                const ext = file.name.split(".")[1];
                const fileName = `${imgKey}.${ext}`;
                //
                const uploadImg = promisify(file.mv);
                await uploadImg(`${root}/${fileName}`);
                // //
                if (imgKey === "logo") logo = fileName;
                else images.push(fileName);
            }
            //
            const dataToDB = JSON.parse(JSON.stringify(req.body));
            dataToDB.logo = logo;
            dataToDB.images = JSON.stringify(images);
            dataToDB.path = dirName;
            //
            await this.Event.create(dataToDB);
            //
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(500);
        }
    }
    //
    async deleteSingleEvent(req, res) {
        const { User, Event } = this;
        const { id: userId } = req.authorizedToken;
        const user = await User.findOne({ where: { id: userId } });
        if (user === null) return res.sendStatus(403);
        //
        try {
            const { id: eventID } = req.params;
            const event = await Event.findOne({ where: { id: eventID * 1 } });
            //
            const dirPath = path.join(__dirname, "..", "..", "upload", "events", event.path);
            fse.removeSync(dirPath);
            await event.destroy();
            //
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(500);
        }
    }
    //
    async getAll(req, res) {
        const { bulkDataExcludes: exclude } = this;
        //
        let events = await this.Event.findAll({
            attributes: { exclude },
            order: [["id", "DESC"]],
        });
        const totalAmount = events.length;
        // Pagination
        const page = req.query.page * 1,
            limit = req.query.limit * 1;
        const start = (page - 1) * limit,
            end = start + limit;
        //
        events = events.splice(start, end);
        res.send({
            items: events,
            totalPagesAmount: Math.ceil(totalAmount / limit),
        });
    }
    //
    async getSingle(req, res) {
        const { title } = req.params;
        const exclude = ["updatedAt", "path"];
        //
        const result = await this.Event.findOne({
            where: { title },
            attributes: { exclude },
        });
        if (result) res.send(result);
        else res.sendStatus(404);
    }
    //
    async getLogo(req, res) {
        const { title } = req.params;
        const Event = await this.Event.findOne({ where: { title } });
        res.sendFile(path.join(__dirname, "..", "..", "upload", "events", Event.path, Event.logo));
    }
    //
    async getContentImage(req, res) {
        const { id, imgIndex } = req.params;
        const Event = await this.Event.findOne({ where: { id } });
        //
        let img;
        JSON.parse(Event.images).forEach((singleImage) => {
            if (singleImage.includes(imgIndex)) {
                img = singleImage;
            }
        });
        //
        res.sendFile(path.join(__dirname, "..", "..", "upload", "events", Event.path, img));
    }
    //
    async getRecommendatios(req, res) {
        const { id } = req.params;
        const { bulkDataExcludes: exclude } = this;
        //
        const recommendations = await this.Event.findAll({
            where: {
                id: { [Op.ne]: id },
            },
            attributes: { exclude },
            limit: 3,
            order: [["id", "DESC"]],
        });
        //
        res.send(recommendations);
    }
}
module.exports = EventController;
