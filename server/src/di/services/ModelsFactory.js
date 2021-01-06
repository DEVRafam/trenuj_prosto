class ModelsFactory {
    static getAllModals(sequelize) {
        return require("../../models/index")(sequelize);
    }
}
//
module.exports = ModelsFactory;
