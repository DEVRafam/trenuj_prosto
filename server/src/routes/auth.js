const router = require("express").Router();
module.exports = (di) => {
    const LoginController = di.get("controllers.login");
    const LoginValidator = require("../middlewares/validators/LoginValidator");
    //
    router.post("/login", [LoginValidator], (...args) => LoginController.login(...args));
    //
    return router;
};
