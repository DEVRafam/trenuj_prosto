const path = require("path");
const fse = require("fs-extra");
const login = require(path.join(__basepath, "helpers", "login"));
const logout = require(path.join(__basepath, "helpers", "logout"));

///
describe("Delete Single Event", () => {
    beforeAll(async (done) => {
        Event = di.get("models").Event;
        eventThatWillBeDeleted = await Event.findOne();
        //
        // send delete request
        //
        const { accessToken } = await login();
        const { id } = eventThatWillBeDeleted;
        const url = `/api/events/${id}`;
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
        const { id } = eventThatWillBeDeleted;
        //
        const eventThatShouldBeDeleted = await Event.findOne({ where: { id } });
        expect(eventThatShouldBeDeleted).toBeNull();
        //
        done();
    });
    it("Director that stores images should be removed", async (done) => {
        const { path: dir } = eventThatWillBeDeleted;
        const checkWhetherPathExists = fse.existsSync(path.join(__pathToUploaded, "events", dir));
        //
        expect(checkWhetherPathExists).toBeFalsy();
        //
        done();
    });
    it("Unauthorized user can not delete offer", async (done) => {
        const { id } = await Event.findOne();
        const url = `/api/events/${id}`;
        //
        const { status } = await request.delete(url).set("Authorization", `Bearer badToken123`);
        //
        expect(status).toEqual(401);
        expect(await Event.findOne({ where: { id } })).not.toBeNull();
        //
        done();
    });
    it("Trying to delete unexisting offer will throw 404", async (done) => {
        const { accessToken } = __loginData;
        const { status } = await request.delete(`/api/events/23523523523`).set("Authorization", `Bearer ${accessToken}`);
        //
        expect(status).toEqual(404);
        done();
    });
});
