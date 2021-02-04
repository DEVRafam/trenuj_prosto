class ChangePasswordController {
    //
    constructor(models, jwt, bcrypt) {
        this.UserModel = models.User;
        this.jwt = jwt;
        this.bcrypt = bcrypt;
    }
    //
    async change(req, res) {
        await this.getUserFromDataBase(req.authorizedToken.id);
        const { userFromDB } = this;
        const { oldPassword, newPassword, refreshToken } = req.body;
        //
        if (userFromDB === null) return res.sendStatus(400);
        if (!(await this.bcrypt.compare(oldPassword, userFromDB.password))) {
            return res.send({
                result: "negative",
                message: "Stare hasło jest niepoprawne",
            });
        }
        //
        const tokensList = JSON.parse(userFromDB.tokens);
        const index = tokensList.indexOf(refreshToken);
        if (index === -1) {
            return res.sendStatus(400);
        }
        tokensList.splice(index, 1);
        //
        const password = await this.hashPassword(newPassword);
        await userFromDB.update({ tokens: JSON.stringify(tokensList), password });
        return res.send({ result: "positive" });
    }
    //
    async getUserFromDataBase(id) {
        this.userFromDB = await this.UserModel.findOne({ where: { id } });
    }
    //
    async hashPassword(pass) {
        const { bcrypt } = this;
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(pass, salt);
    }
}
//
module.exports = ChangePasswordController;
