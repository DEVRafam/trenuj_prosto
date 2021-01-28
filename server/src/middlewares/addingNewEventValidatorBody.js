const Joi = require("joi");
//
module.exports = (req, res, next) => {
    try {
        const { title, content } = req.body;
        const dataToValidate = { title, content };
        //
        const scheme = Joi.object({
            title: Joi.string().max(60).min(3).required(),
            content: Joi.string().max(5000).min(20).required(),
        });
        //
        const { error } = scheme.validate(dataToValidate, { abortEarly: false });
        //
        if (error || !req.files.logo) {
            return res.sendStatus(400);
        } else {
            next();
        }
    } catch (e) {
        return res.sendStatus(400);
    }
};
