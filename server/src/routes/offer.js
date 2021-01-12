const router = require("express").Router();
module.exports = (di) => {
    const OfferController = di.get("controllers.offer");
    const { authenticate } = di.get("middlewares");
    //
    router.post("/create", [authenticate], (...args) => OfferController.createNewOffer(...args));
    //
    //
    router.get("/all", (...args) => OfferController.getAll(...args));
    //
    router.get("/single/:destination", (...args) => OfferController.getSingle(...args));
    //
    router.get("/single/:destination/logo", (...args) => OfferController.getLogo(...args));
    //
    //
    //
    return router;
};
