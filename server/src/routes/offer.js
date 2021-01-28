const router = require("express").Router();
module.exports = (di) => {
    // Offers controllers:
    const AdminController = di.get("controllers.offers.admin");
    const GettersController = di.get("controllers.offers.getters");
    // Middlewares:
    const { authenticate, addingNewOfferValidatorBody } = di.get("middlewares");
    //
    // admin routes
    //
    router.delete("/:id", [authenticate], (...args) => AdminController.deleteOffer(...args));
    router.post("/create", [authenticate, addingNewOfferValidatorBody], (...args) => AdminController.createNewOffer(...args));
    //
    // common user routes
    //
    router.get("/all", (...args) => GettersController.allOffers(...args));
    router.get("/single/:slugName", (...args) => GettersController.singleOffer(...args));
    router.get("/single/:id/logo", (...args) => GettersController.logo(...args));
    router.get("/single/:id/gallery/:index", (...args) => GettersController.galleryImage(...args));
    //
    return router;
};
