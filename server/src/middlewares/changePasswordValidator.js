const Joi = require("joi");
const path = require("path");
const betterJoiErorrs = require(path.join("..", "helpers", "betterJoiErorrs"));
//
module.exports = (req, res, next) => {
    const { newPassword } = req.body;
    //
    const scheme = Joi.object({
        newPassword: Joi.string().max(255).min(6).required().messages({
            "string.empty": "Nowe hasło jest wymagane!",
            "string.max": "Maksymalna ilość znaków nowego hasła to {#limit}",
            "string.min": "Minimalna ilość znaków nowego hasła to {#limit}",
        }),
    });
    //
    const { error } = scheme.validate({ newPassword });
    if (error) {
        return res.send({
            result: "negative",
            message: betterJoiErorrs(error)[0].message,
        });
    } else next();
};
