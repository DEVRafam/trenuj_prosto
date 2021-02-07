const router = require("express").Router();
module.exports = (di) => {
    // Offers controllers:
    const AdminController = di.get("controllers.offers.admin");
    const GettersController = di.get("controllers.offers.getters");
    const FilesToDownload = di.get("controllers.offers.filesToDownload");
    // Middlewares:
    const { authenticate, addingNewOfferValidatorBody } = di.get("middlewares");
    //
    // admin routes
    //
    router.delete("/:id", [authenticate], (...args) => AdminController.deleteOffer(...args));
    router.post("/create", [authenticate, addingNewOfferValidatorBody], (...args) => AdminController.createNewOffer(...args));
    router.patch("/:id", [authenticate], (...args) => AdminController.updateOffer(...args));
    //
    // common user routes
    //
    router.get("/all", (...args) => GettersController.allOffers(...args));
    router.get("/single/:slugName", (...args) => GettersController.singleOffer(...args));
    router.get("/single/:id/logo", (...args) => GettersController.logo(...args));
    router.get("/single/:id/gallery/:index", (...args) => GettersController.galleryImage(...args));
    router.get("/files-to-download-list", (...args) => FilesToDownload.getAllFiles(...args));
    router.get("/download/:fileName", (...args) => FilesToDownload.downloadSingleFile(...args));
    //
    return router;
};
