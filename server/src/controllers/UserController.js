class UserController {
    /**
     * @param {UserRepository} UserRepository
     */
    constructor(models) {
        this.models = models;
    }
    //
    async getAllUsers(req, res) {
        const { User } = this.models;
        res.send(await User.findAndCountAll());
    }
    //
}
module.exports = UserController;
