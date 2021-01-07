const path = require("path");
const env = require(path.join(__dirname, "..", "helpers", "env"));
// db config required for proper url
const name = env("DATABASE_NAME", "erpsystem"),
    user = env("DATABASE_USERNAME", "root"),
    password = env("DATABASE_PASSWORD", ""),
    dialect = env("DATABASE_DIALECT", "mysql"),
    host = env("DATABASE_HOST", "localhost"),
    port = env("DATABASE_PORT", 3306);
//
const sequelize_logging = env("SEQUELIZE_LOGGING", console.log) == "false" ? false : console.log;
//
//
//
module.exports = {
    sequelize_logging,
    database: {
        name,
        user,
        password,
        dialect,
        host,
        url: `${dialect}://${user}:${password}@${host}:${port}/${name}`,
    },
    tokens: {
        access_secret: env("ACCESS_TOKEN_SECRET", "@%@#$%#@$@#_access_secret"),
        refresh_secret: env("REFRESH_TOKEN_SECRET", "&$%^#$@#!^$_refresh_secret"),
        access_expiration: env("ACCESS_TOKEN_EXPIRATION", "15m"),
        refresh_expiration: env("REFRESH_TOKEN_EXPIRATION", "3h"),
    },
};
