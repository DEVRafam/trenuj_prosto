const router = require("express").Router();
module.exports = (di) => {
    const eventController = di.get("controllers.event");
    const { authenticate } = di.get("middlewares");
    // //
    router.post("/create", [authenticate], (...args) => eventController.createNewEvent(...args));
    //
    router.get("/all", (...args) => eventController.getAll(...args));
    //
    router.get("/single/:title", (...args) => eventController.getSingle(...args));
    //
    router.get("/single/:title/logo", (...args) => eventController.getLogo(...args));
    //
    router.get("/single/:id/content-img/:imgIndex", (...args) => eventController.getContentImage(...args));
    //
    router.get("/single/:id/recommendations", (...args) => eventController.getRecommendatios(...args));
    return router;
};
