describe("GET recommendations for single event", () => {
    beforeAll(async (done) => {
        const latestEventID = (await di.get("models").Event.findOne({ order: [["ID", "DESC"]] })).id;
        const { body, status } = await request.get(`/api/events/single/${latestEventID}/recommendations`);
        singleRecommendation = body[0];
        requestStatus = status;
        //
        done();
    });
    //
    it("data should been loaded", () => {
        expect(requestStatus).toEqual(200);
    });
    //
    it("data should contains only certin properties", () => {
        // exclude
        ["updatedAt", "path", "logo"].forEach((p) => {
            expect(singleRecommendation).not.toHaveProperty(p);
        });
        // include
        ["slug", "id", "title", "content"].forEach((p) => {
            expect(singleRecommendation).toHaveProperty(p);
        });
    });
});
