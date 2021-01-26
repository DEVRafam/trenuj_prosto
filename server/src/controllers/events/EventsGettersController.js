const path = require("path");
const { Op } = require("sequelize");
const paginationHandler = require(path.join(__dirname, "..", "..", "helpers", "paginationHandler"));
//
class EventsGettersController extends require(path.join(__dirname, "GettersAbstract")) {
    constructor(models) {
        const pathToUploadedEvents = path.join(__dirname, "..", "..", "..", "upload/events");
        super(models, pathToUploadedEvents);
        //
        this.EXCLUDE_FROM_SINGLE_EVENT = ["updatedAt", "path", "logo"];
        this.EXCLUDE_FORM_ALL_EVENTS = ["updatedAt", "path", "images", "logo"];
    }
    /**
     * @api {get} /api/events/all?page&?limit Get all events for certin page
     * @apiQuery page {Number} number of page
     * @apiQuery limit {Number} limit for events amount per single page
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "totalPagesAmount": 2,
     *          "items": [{
     *              "id": 4,
     *              "title": "Zwierzęta hodowlane",
     *              "content": "[{\"type\":\"text\",\"text\":\"Zwierzęta hodowlane – zwierzęta udomowione lub dzikie, które chowane w odpowiednich warunkach (gospodarstwo rolne, ogród zoologiczny, specjalistyczne fermy) służą jako źródło żywności (mięso, mleko, tłuszcz, jajka) i innych materiałów (skóra, futro, wełna, pierze), a także jako siła pociągowa, do jazdy wierzchem, jako zwierzęta juczne lub pełniące inne funkcje użytkowe. Osobniki o szczególnych walorach użytkowych i hodowlanych hoduje się jako materiał reprodukcyjny – zwierzęta zarodowe.\"},{\"type\":\"header\",\"text\":\"Gospodarskie zwierzę hodowlane czystorasowe\"},{\"type\":\"text\",\"text\":\"Zgodnie z ustawą o organizacji hodowli i rozrodzie zwierząt gospodarskich[1] zwierzęciem hodowlanym czystorasowym jest zwierzę pochodzące co najmniej od dwóch pokoleń przodków wpisanych do księgi danej rasy, które spełnia wymagania wpisu do księgi, a w przypadku koniowatych – z wyjątkiem koni pełnej krwi angielskiej, czystej krwi arabskiej, kuców szetlandzkich, koników polskich i hucułów – zwierzę pochodzące co najmniej od dwóch pokoleń przodków wpisanych do księgi danej rasy lub ras biorących udział w doskonaleniu tej rasy, które spełnia wymagania wpisu do księgi.\"},{\"type\":\"img\",\"imgIndex\":1610955856821}]",
     *              "createdAt": "2021-01-25T19:27:39.000Z"
     *          }]
     *     }
     */
    async allEvents(req, res) {
        try {
            const events = await this.Event.findAll({
                attributes: { exclude: this.EXCLUDE_FORM_ALL_EVENTS },
                order: [["id", "DESC"]],
            });
            if (events === null) return res.sendStatus(404);
            res.send(paginationHandler(req.query, events));
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    /**
     * @api {get} /api/offer/single/:destination" Get single offer via destination reference
     * @apiQuery destination {String} destination associated with Offer in the database
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "id": 2,
     *         "destination": "Berlin",
     *         "description": "Berlin – stolica, największe miasto Niemiec i zarazem kraj związkowy. Zajmuje powierzchnię ok. 892 km² i zamieszkuje go około 3,7 mln osób[2]. Jest największym miastem w Unii Europejskiej pod względem liczby mieszkańców. Berlin jest podzielony na dwanaście okręgów administracyjnych (Bezirk). Przez przestrzeń miejską przepływają m.in. rzeki Sprewa i Hawela, a ponadto znajduje się wiele jezior i zatok, w tym największe Müggelsee. ",
     *         "gallery": ["gallery-item-0.jpg","gallery-item-1.jpg","gallery-item-2.jpg","gallery-item-3.jpg","gallery-item-4.jpg"],
     *         "start": "2021-01-19T00:00:00.000Z",
     *         "end": "2021-01-29T00:00:00.000Z",
     *         "price": 1500,
     *         "activities":"[\"\\tWieża Eiffla\",\"\\tMuzeum w Luwrze \",\"Katedra Notre-Dame \",\"Łuk Triumfalny w Paryżu\"]",
     *
     *     }
     */
    async singleEvent(req, res) {
        const { title } = req.params;
        //
        const result = await this.Event.findOne({
            where: { title },
            attributes: { exclude: this.EXCLUDE_FROM_SINGLE_EVENT },
        });
        if (result) res.send(result);
        else res.sendStatus(404);
    }
    /**
     * @api {get} /single/:id/recommendations Get all events for certin page
     * @apiParam id {Number} id of Event, that will be excluded on generation recommendations process
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *         "recommendations": [{
     *             "id": 4,
     *             "title": "Zwierzęta hodowlane",
     *             "content": "[{\"type\":\"text\",\"text\":\"Zwierzęta hodowlane – zwierzęta udomowione lub dzikie, które chowane w odpowiednich warunkach (gospodarstwo rolne, ogród zoologiczny, specjalistyczne fermy) służą jako źródło żywności (mięso, mleko, tłuszcz, jajka) i innych materiałów (skóra, futro, wełna, pierze), a także jako siła pociągowa, do jazdy wierzchem, jako zwierzęta juczne lub pełniące inne funkcje użytkowe. Osobniki o szczególnych walorach użytkowych i hodowlanych hoduje się jako materiał reprodukcyjny – zwierzęta zarodowe.\"},{\"type\":\"header\",\"text\":\"Gospodarskie zwierzę hodowlane czystorasowe\"},{\"type\":\"text\",\"text\":\"Zgodnie z ustawą o organizacji hodowli i rozrodzie zwierząt gospodarskich[1] zwierzęciem hodowlanym czystorasowym jest zwierzę pochodzące co najmniej od dwóch pokoleń przodków wpisanych do księgi danej rasy, które spełnia wymagania wpisu do księgi, a w przypadku koniowatych – z wyjątkiem koni pełnej krwi angielskiej, czystej krwi arabskiej, kuców szetlandzkich, koników polskich i hucułów – zwierzę pochodzące co najmniej od dwóch pokoleń przodków wpisanych do księgi danej rasy lub ras biorących udział w doskonaleniu tej rasy, które spełnia wymagania wpisu do księgi.\"},{\"type\":\"img\",\"imgIndex\":1610955856821}]",
     *             "createdAt": "2021-01-25T19:27:39.000Z"
     *         }]
     */
    async singleEventRecommendations(req, res) {
        const { id } = req.params;
        const recommendations = await this.Event.findAll({
            where: {
                id: { [Op.ne]: id },
            },
            attributes: { exclude: this.EXCLUDE_FORM_ALL_EVENTS },
            limit: 3,
            order: [["id", "DESC"]],
        });
        //
        res.send(recommendations);
    }
}
module.exports = EventsGettersController;
