const path = require("path");
const fse = require("fs-extra");
const login = require(path.join(__basepath, "helpers", "login"));
const logout = require(path.join(__basepath, "helpers", "logout"));

///
describe("Delete Single Offer", () => {
    beforeAll(async (done) => {
        Offer = di.get("models").Offer;
        offerThatWillBeDeleted = await Offer.findOne();
        //
        // send delete request
        //
        const { accessToken } = await login();
        const { id } = offerThatWillBeDeleted;
        const url = `/api/offer/${id}`;
        await request.delete(url).set("Authorization", `Bearer ${accessToken}`);
        //
        done();
    });
    afterAll(async (done) => {
        await logout();
        done();
    });
    //
    //
    //
    it("Data in DB should be removed", async (done) => {
        const { id } = offerThatWillBeDeleted;
        //
        const offerThatShouldBeDeleted = await Offer.findOne({ where: { id } });
        expect(offerThatShouldBeDeleted).toBeNull();
        //
        done();
    });
    it("Director that stores images should be removed", async (done) => {
        const { path: dir } = offerThatWillBeDeleted;
        const checkWhetherPathExists = fse.existsSync(path.join(__pathToUploaded, "offers", dir));
        //
        expect(checkWhetherPathExists).toBeFalsy();
        //
        done();
    });
    it("Unauthorized user can not delete offer", async (done) => {
        const { id } = await Offer.findOne();
        const url = `/api/offer/${id}`;
        //
        const { status } = await request.delete(url).set("Authorization", `Bearer badToken123`);
        //
        expect(status).toEqual(401);
        expect(await Offer.findOne({ where: { id } })).not.toBeNull();
        //
        done();
    });
    it("Trying to delete unexisting offer will throw 404", async (done) => {
        const { accessToken } = __loginData;
        const { status } = await request.delete(`/api/offer/23523523523`).set("Authorization", `Bearer ${accessToken}`);
        //
        expect(status).toEqual(404);
        done();
    });
});
