class EventController {
    constructor(models) {
        this.models = models;
    }
    //
    async createNewEvent(req, res) {
        console.log(req.headers);
        res.sendStatus(200);
    }
    //
}
module.exports = EventController;
