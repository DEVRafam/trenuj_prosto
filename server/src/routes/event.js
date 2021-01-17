const router = require("express").Router();
module.exports = (di) => {
    const eventController = di.get("controllers.event");
    const { authenticate } = di.get("middlewares");
    // //
    router.post("/create", [authenticate], (...args) => eventController.createNewEvent(...args));
    //
    return router;
};
