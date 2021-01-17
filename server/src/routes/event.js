const router = require("express").Router();
module.exports = (di) => {
    const eventController = di.get("controllers.event");
    // //
    router.post("/create", (...args) => eventController.createNewEvent(...args));
    //
    return router;
};
