const path = require("path");
const generateJWT = require(path.join("..", "..", "helpers", "generateJWT"));
//
class LoginController {
    //
    constructor(models, jwt, bcrypt) {
        this.UserModel = models.User;
        this.jwt = jwt;
        this.bcrypt = bcrypt;
    }
    //
    async login(req, res) {
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
