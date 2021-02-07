const path = require("path");
const login = require(path.join(__basepath, "helpers", "login"));
const logout = require(path.join(__basepath, "helpers", "logout"));
//
const newDates = [{ start: "2051-01-13", end: "2051-01-23", soldOut: false }];
const newActivities = ["nowa aktualnosc czy tam aktywnosc"];
//
describe("Update single offer", () => {
    beforeAll(async (done) => {
        // register globals
        Offer = di.get("models").Offer;
        latestOfferID = (await Offer.findOne({ order: [["id", "DESC"]] })).id;
        // add new offer
        const { accessToken } = await login();
        headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        };
        //

        const { status } = await request.patch(`/api/offer/${latestOfferID}`).set(headers).send({
            dates: newDates,
            activities: newActivities,
        });
        responseStatus = status;
        //
        done();
    });
    afterAll(async (done) => {
        await logout();
        done();
    });
    //
    it("Offer should be updated successfully", async (done) => {
        const offer = await Offer.findOne({ where: { id: latestOfferID } });
        expect(responseStatus).toEqual(201);
        expect(offer.activities).toEqual(JSON.stringify(newActivities));
        expect(offer.dates).toEqual(JSON.stringify(newDates));
        //
        done();
    });
    //
    it("Unauthorized user can not update offer", async (done) => {
        const { status } = await request.patch(`/api/offer/${latestOfferID}`).set("Authorization", `Bearer badToken123`).send({
            dates: newDates,
            activities: newActivities,
        });
        expect(status).toEqual(401);
        //
        done();
    });
    //
    it("Trying to update unexisting offer will throw 404", async (done) => {
        const { status } = await request.patch(`/api/offer/asdasd312312313123123123`).set(headers).send({
            dates: newDates,
            activities: newActivities,
        });
        //
        expect(status).toEqual(404);
        done();
    });
});
