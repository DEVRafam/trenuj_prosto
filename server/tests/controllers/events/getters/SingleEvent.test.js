describe("GET single event", () => {
    beforeAll(async (done) => {
        const latestOfferSlugName = (await di.get("models").Event.findOne({ order: [["id", "DESC"]] })).toJSON().slug;
        const { status: s, body } = await request.get(`/api/events/single/${latestOfferSlugName}`);
        offerData = body;
        status = s;
        firstContentImage = Object.values(JSON.parse(offerData.images))[0].split("-")[1].split(".")[0];
        //
        done();
    });
    //
    it("data should been loaded", () => {
        expect(status).toEqual(200);
    });
    //
    it("data should contains only certin properties", () => {
        // exclude
        ["updatedAt", "path", "logo"].forEach((p) => {
            expect(offerData).not.toHaveProperty(p);
        });
        // include
        ["slug", "id", "title", "images", "content"].forEach((p) => {
            expect(offerData).toHaveProperty(p);
        });
    });
    //
    it("should throw 404 error while trying to fetch unexisting event data", async (done) => {
        const { status } = await request.get(`/api/events/single/sdgfghjdrfsefgfghfsaffg`);
        expect(status).toEqual(404);
        //
        done();
    });
    //
    // IMAGES
    //
    it("access to single event logo", async (done) => {
        const { status } = await request.get(`/api/events/single/${offerData.id}/logo`);
        expect(status).toEqual(200);
        done();
    });
    //
    it("access to single event gallery image", async (done) => {
        const { status } = await request.get(`/api/events/single/${offerData.id}/content-img/${firstContentImage}`);
        expect(status).toEqual(200);
        done();
    });
    //
    it("should throw 404 while accessing to unexisting event logo", async (done) => {
        const { status } = await request.get("/api/events/single/52323252/logo");
        expect(status).toEqual(404);
        done();
    });
    //
    it("should throw 404 while accessing to unexisting event content item", async (done) => {
        const { status } = await request.get("/api/events/single/52323252/content-img/1");
        expect(status).toEqual(404);
        done();
    });
    //
    it("should throw 404 while accessing to unexisting gallery image of existing event", async (done) => {
        const { status } = await request.get(`/api/events/single/${offerData.id}/content-img/1423423`);
        expect(status).toEqual(404);
        done();
    });
});
