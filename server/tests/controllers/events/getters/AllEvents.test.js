describe("GET all events", () => {
    beforeAll(async (done) => {
        allEvents = (await request.get("/api/events/all?page=1&limit=5")).body;
        singleEvent = allEvents.items[0];
        //
        done();
    });
    //
    it("response should contains both totalPagesAmount and items properties", () => {
        expect(allEvents).toHaveProperty("totalPagesAmount");
        expect(allEvents).toHaveProperty("items");
    });
    //
    it("single event should excludes certin properties", () => {
        ["updatedAt", "turistBonPayment", "path", "images", "logo"].forEach((p) => {
            expect(singleEvent).not.toHaveProperty(p);
        });
    });
});
