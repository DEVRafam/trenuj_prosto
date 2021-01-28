const path = require("path");
const fse = require("fs-extra");
const login = require(path.join(__basepath, "helpers", "login"));
const logout = require(path.join(__basepath, "helpers", "logout"));
//
describe("Create new offer", () => {
    beforeAll(async (done) => {
        // load datas
        const loadAsset = (asset) => path.join(__basepath, "assets", asset);
        const { destination, description, start, end, price, activities, turistBonPayment } = require(loadAsset("offerData"));
        // register globals
        Offer = di.get("models").Offer;
        newOfferDestination = destination;
        // add new offer
        const { accessToken } = await login();
        headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        };
        //
        await request
            .post("/api/offer/create")
            .set(headers)
            .field("destination", destination)
            .field("description", description)
            .field("start", start)
            .field("end", end)
            .field("price", price)
            .field("activities", activities)
            .field("turistBonPayment", turistBonPayment)
            .attach("logo", loadAsset("logo.jpg"))
            .attach("img-one", loadAsset("image-1.jpg"))
            .attach("img-two", loadAsset("image-2.jpg"));
        // fetch latest offer
        latest = await Offer.findOne({ order: [["id", "DESC"]] });
        //
        done();
    });
    afterAll(async (done) => {
        await logout();
        done();
    });
    //
    it("New offer has been created", () => {
        expect(latest.destination).toEqual(newOfferDestination);
    });
    //
    it("Director that stores images should be created", () => {
        const { path: dir } = latest;
        const checkWhetherPathExists = fse.existsSync(path.join(__pathToUploaded, "offers", dir));
        //
        expect(checkWhetherPathExists).not.toBeFalsy();
    });
    //
    it("should throw 400 response status when sending data is invalid", async (done) => {
        const { status } = await request.post("/api/offer/create").set(headers).field("destination", "asdasd").field("description", "asd").field("start", "1341").field("end", "asdsadd").field("price", 0).field("activities", Date.now()).field("turistBonPayment", false);
        expect(status).toEqual(400);
        //
        done();
    });
});
