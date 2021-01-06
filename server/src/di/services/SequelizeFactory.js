const { Sequelize } = require("sequelize");
//
class SequelizeFactory {
    static connect(config) {
        const { name, password, host, dialect, user } = config.database;
        const logging = config.sequelize_logging;
        //
        const sequelize = new Sequelize(name, user, password, {
            host,
            dialect,
            logging,
        });
        //
        return sequelize;
    }
}
//
module.exports = SequelizeFactory;
