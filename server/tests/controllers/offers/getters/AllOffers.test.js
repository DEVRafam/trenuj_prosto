describe("GET all offers", () => {
    beforeAll(async (done) => {
        allOffers = (await request.get("/api/offer/all?page=1&limit=5")).body;
        singleOffer = allOffers.items[0];
        //
        done();
    });
    //
    it("should response contains both totalPagesAmount and items properties", () => {
        expect(allOffers).toHaveProperty("totalPagesAmount");
        expect(allOffers).toHaveProperty("items");
    });
    //
    it("should single offer excludes certin properties", () => {
        ["createdAt", "updatedAt", "turistBonPayment", "path", "price", "gallery", "logo"].forEach((p) => {
            expect(singleOffer).not.toHaveProperty(p);
        });
    });
});
