const jwt = require("jsonwebtoken");
const path = require("path");
const config = require(path.join("..", "config", "config"));
const { access_secret } = config.tokens;
//
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, access_secret, (err, dataFromToken) => {
            //
            const keys = Object.keys(dataFromToken);
            const propertiesToCheck = ["id", "name", "surname", "email", "password", "tokens", "createdAt", "updatedAt", "iat", "exp"];
            let tokenIsRight = true;
            //
            propertiesToCheck.forEach((property) => {
                if (!keys.includes(property)) tokenIsRight = false;
            });
            //
            //
            if (tokenIsRight) {
                req.authorizedToken = dataFromToken;
                next();
            } else res.sendStatus(401);
        });
    } catch (e) {
        res.sendStatus(401);
    }
};
