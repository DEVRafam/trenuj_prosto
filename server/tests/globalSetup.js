const di = require("../src/di/index");

module.exports = async () => {
    console.clear();
    const sequelize = di.get("sequelize");

    global.di = di;
    global.sequelize = sequelize;
    //
    //
    await sequelize.close();
};
