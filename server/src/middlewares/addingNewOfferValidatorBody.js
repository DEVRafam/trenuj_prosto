const Joi = require("joi");
//
module.exports = (req, res, next) => {
    try {
        const { destination, description, dates, price, activities, turistBonPayment } = req.body;
        const dataToValidate = { destination, description, dates, price, activities, turistBonPayment };
        //
        const scheme = Joi.object({
            destination: Joi.string().max(60).min(3).required(),
            description: Joi.string().max(1500).min(20).required(),
            turistBonPayment: Joi.exist(),
            activities: Joi.string().required(),
            dates: Joi.string().required(),
            price: Joi.exist(),
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
