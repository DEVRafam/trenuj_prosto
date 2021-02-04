const router = require("express").Router();
module.exports = (di) => {
    // controlers
    const LoginController = di.get("controllers.auth.login");
    const LogoutController = di.get("controllers.auth.logout");
    const RefreshTokenController = di.get("controllers.auth.refresh");
    const ChangePasswordController = di.get("controllers.auth.changePassword");
    //
    const { LoginValidator, authenticate, changePasswordValidator } = di.get("middlewares");
    //
    router.post("/login", [LoginValidator], (...args) => LoginController.login(...args));
    router.post("/logout", [authenticate], (...args) => LogoutController.logout(...args));
    router.post("/refresh_token", (...args) => RefreshTokenController.refresh(...args));
    router.post("/change-password", [changePasswordValidator, authenticate], (...args) => ChangePasswordController.change(...args));
    //
    return router;
};
