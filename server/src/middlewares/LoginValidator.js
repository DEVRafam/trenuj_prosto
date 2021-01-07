const Joi = require("joi");
const path = require("path");
const betterJoiErorrs = require(path.join("..", "helpers", "betterJoiErorrs"));
//
module.exports = (req, res, next) => {
    const { password, email } = req.body;
    //
    const scheme = Joi.object({
        email: Joi.string().lowercase().trim().max(255).email().required().messages({
            "string.email": "Nieprawidłowy format adresu email",
            "string.trim": "Adres email nie może zawierać żadnych spacji na początku i końcu",
            "string.empty": "Adres email jest wymagany!",
            "string.max": "Maksymalna ilość znaków to {#limit}",
        }),
        password: Joi.string().max(32).required().trim().messages({
            "string.trim": "Hasło nie może zawierać żadnych spacji na początku i końcu",
            "string.empty": "Hasło jest wymagane!",
            "string.max": "Maksymalna ilość znaków to {#limit}",
        }),
    });
    //
    const { error } = scheme.validate({ email, password }, { abortEarly: false });
    if (error) {
        return res.send({
            result: "negative",
            errors: betterJoiErorrs(error),
        });
    } else next();
};
