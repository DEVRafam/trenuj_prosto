class LogoutController {
    //
    constructor(models, jwt) {
        this.UserModel = models.User;
        this.jwt = jwt;
    }
    //
    async logout(req, res) {
        await this.getUserFromDataBase(req.authorizedToken.id);
        const { userFromDB } = this;
        if (userFromDB === null) return res.sendStatus(400);
        //
        let tokensList = JSON.parse(userFromDB.tokens);
        const index = tokensList.indexOf(req.body.refreshToken);
        if (index === -1) return res.sendStatus(400);
        //
        tokensList.splice(index, 1);
        await userFromDB.update({ tokens: JSON.stringify(tokensList) });
        //
        res.sendStatus(200);
    }
    //
    async getUserFromDataBase(id) {
        this.userFromDB = await this.UserModel.findOne({ where: { id } });
    }
}
//
module.exports = LogoutController;
