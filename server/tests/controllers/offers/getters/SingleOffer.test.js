describe("GET single offers", () => {
    beforeAll(async (done) => {
        const latestOfferSlugName = (await di.get("models").Offer.findOne({ order: [["id", "DESC"]] })).toJSON().slug;
        const { status: s, body } = await request.get(`/api/offer/single/${latestOfferSlugName}`);
        offerData = body;
        status = s;
        //
        done();
    });
    //
    it("data should been loaded", () => {
        expect(status).toEqual(200);
    });
    //
    it("data should contains only certin properties", () => {
        ["createdAt", "updatedAt", "path", "logo"].forEach((p) => {
            expect(offerData).not.toHaveProperty(p);
        });
        ["destination", "description", "gallery", "termins", "price", "activities", "turistBonPayment", "slug"].forEach((p) => {
            expect(offerData).toHaveProperty(p);
        });
    });
    //
    it("should throw 404 error while trying to fetch unexisting offer data", async (done) => {
        const { status } = await request.get(`/api/offer/single/sdgfghjdrfsefgfghfsaffg`);
        expect(status).toEqual(404);
        //
        done();
    });
    //
    // IMAGES
    //
    it("access to single offer logo", async (done) => {
        const { status } = await request.get(`/api/offer/single/${offerData.id}/logo`);
        expect(status).toEqual(200);
        done();
    });
    //
    it("access to single offer gallery image", async (done) => {
        const { status } = await request.get(`/api/offer/single/${offerData.id}/gallery/1`);
        expect(status).toEqual(200);
        done();
    });
    //
    it("should throw 404 while accessing to unexisting offer logo", async (done) => {
        const { status } = await request.get("/api/offer/single/52323252/logo");
        expect(status).toEqual(404);
        done();
    });
    //
    it("should throw 404 while accessing to unexisting offer gallery item", async (done) => {
        const { status } = await request.get("/api/offer/single/52323252/gallery/1");
        expect(status).toEqual(404);
        done();
    });
    //
    it("should throw 404 while accessing to unexisting gallery image of existing offer", async (done) => {
        const { status } = await request.get(`/api/offer/single/${offerData.id}/gallery/1423423`);
        expect(status).toEqual(404);
        done();
    });
});
