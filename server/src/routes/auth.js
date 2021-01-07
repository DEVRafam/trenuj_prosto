const router = require("express").Router();
module.exports = (di) => {
    // controlers
    const LoginController = di.get("controllers.login");
    const LogoutController = di.get("controllers.logout");
    //
    const { LoginValidator, authenticate } = di.get("middlewares");
    //
    router.post("/login", [LoginValidator], (...args) => LoginController.login(...args));
    router.post("/logout", [authenticate], (...args) => LogoutController.logout(...args));
    //
    return router;
};
