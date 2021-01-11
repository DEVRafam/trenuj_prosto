const router = require("express").Router();
module.exports = (di) => {
    const OfferController = di.get("controllers.offer");
    // //
    router.post("/create", (...args) => OfferController.createNewOffer(...args));
    //
    return router;
};
