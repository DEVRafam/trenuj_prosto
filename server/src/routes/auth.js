const router = require("express").Router();
module.exports = (di) => {
    const LoginController = di.get("controllers.login");
    //
    router.post("/login", (...args) => LoginController.login(...args));
    //
    return router;
};
