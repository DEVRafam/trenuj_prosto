const path = require("path");
const fse = require("fs-extra");
const login = require(path.join(__basepath, "helpers", "login"));
const logout = require(path.join(__basepath, "helpers", "logout"));
//
describe("Create new event", () => {
    beforeAll(async (done) => {
        // load datas
        const loadAsset = (asset) => path.join(__basepath, "assets", asset);
        const { title, content } = require(loadAsset("eventData"));
        // register globals
        Event = di.get("models").Event;
        newEventTitle = title;
        // add new event
        const { accessToken } = await login();
        headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        };
        const { status } = await request.post("/api/events/create").set(headers).field("title", title).field("content", content).attach("logo", loadAsset("logo.jpg")).attach("image-1611844271268", loadAsset("image-1.jpg")).attach("image-1611844256549", loadAsset("image-2.jpg"));
        creatingResponseStatusCode = status;
        // fetch latest event
        latest = await Event.findOne({ order: [["id", "DESC"]] });
        //
        done();
    });
    afterAll(async (done) => {
        await logout();
        done();
    });
    //
    it("New event has been created", () => {
        expect(creatingResponseStatusCode).toEqual(201);
        expect(latest.title).toEqual(newEventTitle);
    });
    //
    it("Director that stores images should be created", () => {
        const { path: dir } = latest;
        const checkWhetherPathExists = fse.existsSync(path.join(__pathToUploaded, "events", dir));
        //
        expect(checkWhetherPathExists).not.toBeFalsy();
    });
    //
    it("should throw 400 response status when sending data is invalid", async (done) => {
        const { status } = await request.post("/api/events/create").set(headers).field("title", "dasdasdas").field("content", "aada");
        expect(status).toEqual(400);

        //
        done();
    });
});
