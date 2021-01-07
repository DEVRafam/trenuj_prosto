const path = require("path");
const betterJoiErorrs = require(path.join("..", "..", "helpers", "betterJoiErorrs"));
const generateJWT = require(path.join("..", "..", "helpers", "generateJWT"));
//
class LoginController {
    //
    constructor(models, Joi, jwt, bcrypt) {
        this.UserModel = models.User;
        this.Joi = Joi;
        this.jwt = jwt;
        this.bcrypt = bcrypt;
    }
    //
    async login(req, res) {
        // validate email and password
        const error = this.validateBody(req.body);
        if (error) {
            return res.send({
                result: "negative",
                errors: betterJoiErorrs(error),
            });
        }
        // try to find User with given email in the database
        // then if find someone compare his password with given password
        const { email, password } = req.body;
        const User = await this.UserModel.findOne({ where: { email } });
        const passwordIsCorrect = User && (await this.bcrypt.compare(password, User.password));
        //
        if (User === null || !passwordIsCorrect) {
            return res.send({
                result: "negative",
                errors: "credentials_do_not_match",
            });
        }
        // Credentials're fine, so we're gonna generate tokens
        // and return a proper object
        this.verifiedUser = User;
        return res.send({
            ...this.UserObjectToReturn(),
            ...(await this.generateTokens()),
        });
    }
    // validate email and password syntax
    validateBody(body) {
        const { password, email } = body;
        const { Joi } = this;
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
        const { error } = scheme.validate({ email, password }, { abortEarly: false });
        return error;
    }
    // exclude some properties from User object
    UserObjectToReturn() {
        const { id, email, password, tokens, createdAt, updatedAt, ...result } = this.verifiedUser.toJSON();
        return result;
    }
    // generate tokens and save refresh token in db
    async generateTokens() {
        const { verifiedUser: User } = this;
        const accessToken = generateJWT(User, "ACCESS");
        const refreshToken = generateJWT(User, "REFRESH");
        // update User modal
        const tokens = JSON.parse(User.tokens);
        tokens.push(refreshToken);
        await User.update({ tokens: JSON.stringify(tokens) });
        //
        return {
            accessToken,
            refreshToken,
        };
    }
    //
}
//
module.exports = LoginController;
