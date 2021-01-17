const path = require("path");
const fse = require("fs-extra");
const { promisify } = require("util");
//
class EventController {
    constructor(models) {
        this.Event = models.Event;
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
                console.log(imgKey);
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
            console.log("server error");
            res.sendStatus(500);
        }
    }
    //
}
module.exports = EventController;
