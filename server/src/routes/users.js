const router = require("express").Router();
module.exports = (di) => {
    const userController = di.get("controllers.user");
    // //
    router.get("/all", (...args) => userController.getAllUsers(...args));
    //
    return router;
};
