const path = require("path");
const jwt = require("jsonwebtoken");
const config = require(path.join(__dirname, "..", "config", "config"));
const { access_secret, refresh_secret, access_expiration, refresh_expiration } = config.tokens;
//
module.exports = (user, tokenType) => {
    const { tokens: refreshToken, updatedAt, ...dataToToken } = JSON.parse(JSON.stringify(user));
    //
    if (tokenType === "ACCESS") {
        return jwt.sign(dataToToken, access_secret, { expiresIn: access_expiration });
    } else if (tokenType === "REFRESH") {
        return jwt.sign(dataToToken, refresh_secret, { expiresIn: refresh_expiration });
    }
};
