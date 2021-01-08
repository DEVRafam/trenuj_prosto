const path = require("path");
const generateJWT = require(path.join("..", "..", "helpers", "generateJWT"));
//
class RefreshTokenController {
    //
    constructor(models, jwt, config) {
        this.UserModel = models.User;
        this.jwt = jwt;
        this.config = config;
        // state
        this.propertiesToCompare = ["id", "name", "surname", "email", "password", "createdAt"];
        this.refreshTokenData = null;
        this.decodedRefreshToken = null;
        this.User = null;
        this.body = null;
    }
    //
    async refresh(req, res) {
        // check whether tokens exists
        this.body = req.body;
        const { accessToken, refreshToken } = this.body;
        if (!accessToken || !refreshToken) return res.sendStatus(400);
        // decode refresh token
        if (this.decodeRefreshToken() === false) return res.sendStatus(401);
        // find associated with refresh token user in the db
        if ((await this.findAccociatedUser()) === null) {
            return res.sendStatus(401);
        }
        //
        const { errorCode } = await this.verifyRefreshToken();
        if (errorCode) return res.sendStatus(errorCode);
        //
        if (this.tokensAreEqual()) {
            // generate new access token
            return res.send({
                accessToken: generateJWT(this.User, "ACCESS"),
            });
            //
        } else res.sendStatus(401);
        //
    }
    //
    async verifyRefreshToken() {
        const { refreshToken } = this.body;
        //
        try {
            // it throws en enrror if tokens is either expired or invalid
            const { config, jwt } = this;
            this.refreshTokenData = await jwt.verify(refreshToken, config.tokens.refresh_secret);
            //
            return { errorCode: false };
            //
        } catch (e) {
            // check if refresh token has expired
            if (await this.refreshTokenHasExpired()) return { errorCode: 410 };
            else return { errorCode: 401 };
            //
        }
    }
    //
    tokensAreEqual() {
        const { refreshTokenData, body, propertiesToCompare, jwt } = this;
        const accessTokenData = jwt.decode(body.accessToken);
        try {
            let result = true;
            propertiesToCompare.forEach((property) => {
                if (refreshTokenData[property] !== accessTokenData[property]) {
                    result = false;
                }
            });
            return result;
        } catch (e) {
            return false;
        }
        //
    }
    //
    async refreshTokenHasExpired() {
        const { User, body } = this;
        const tokens = JSON.parse(User.tokens);
        const index = tokens.indexOf(body.refreshToken);
        //
        if (index === -1) return false;
        else {
            // remove token from db
            tokens.splice(index, 1);
            await User.update({ tokens: JSON.stringify(tokens) });
            //
            return true;
        }
    }
    //
    async findAccociatedUser() {
        try {
            const { UserModel, decodedRefreshToken } = this;
            const User = await UserModel.findOne({
                where: {
                    id: decodedRefreshToken.id,
                },
            });
            this.User = User;
            return User;
        } catch (e) {
            return null;
        }
    }
    //
    decodeRefreshToken() {
        const { body, jwt } = this;
        const { refreshToken } = body;
        try {
            this.decodedRefreshToken = jwt.decode(refreshToken);
            return true;
        } catch (e) {
            return false;
        }
    }
}
//
module.exports = RefreshTokenController;
