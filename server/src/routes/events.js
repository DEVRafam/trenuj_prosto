const router = require("express").Router();
module.exports = (di) => {
    // Events Controllers:
    const GettersController = di.get("controllers.events.getters");
    const AdminController = di.get("controllers.events.admin");
    // Middlewares:
    const { authenticate, addingNewEventValidatorBody } = di.get("middlewares");
    //
    // Admin routes:
    //
    router.post("/create", [authenticate, addingNewEventValidatorBody], (...args) => AdminController.createNewEvent(...args));
    router.delete("/:id", [authenticate], (...args) => AdminController.deleteSingleEvent(...args));
    //
    // common user routes
    //
    router.get("/all", (...args) => GettersController.allEvents(...args));
    router.get("/single/:slugName", (...args) => GettersController.singleEvent(...args));
    router.get("/single/:id/recommendations", (...args) => GettersController.singleEventRecommendations(...args));
    router.get("/single/:id/logo", (...args) => GettersController.logo(...args));
    router.get("/single/:id/content-img/:imgIndex", (...args) => GettersController.contentImage(...args));
    //
    return router;
};
