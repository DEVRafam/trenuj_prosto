const path = require("path");
//
class OffersGettersController extends require(path.join(__dirname, "abstracts", "GettersAbstract")) {
    constructor(models) {
        const pathToUploadedOffers = path.join(__dirname, "..", "..", "..", "upload/offers");
        super(models, pathToUploadedOffers);
        //
        this.EXCLUDE_FROM_SINGLE_OFFER = ["createdAt", "updatedAt", "path", "logo"];
        this.EXCLUDE_FORM_ALL_OFFERS = ["createdAt", "updatedAt", "activities", "turistBonPayment", "path", "price", "gallery", "logo"];
    }
    /**
     * @api {get} /api/offer/all Get all offers for certin page
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         items: [{
     *             id: 2,
     *             destination: 'Berlin',
     *             description: 'Berlin – stolica, największe miasto Niemiec i zarazem kraj związkowy. Zajmuje powierzchnię ok. 892 km² i zamieszkuje go około 3,7 mln osób[2]. Jest największym miastem w Unii Europejskiej pod względem liczby mieszkańców. Berlin jest podzielony na dwanaście okręgów administracyjnych (Bezirk). Przez przestrzeń miejską przepływają m.in. rzeki Sprewa i Hawela, a ponadto znajduje się wiele jezior i zatok, w tym największe Müggelsee. ',
     *             start: 2021-01-19T00:00:00.000Z,
     *             end: 2021-01-29T00:00:00.000Z,
     *         }],
     *         totalPagesAmount: 5
     *     }
     */
    async allOffers(req, res) {
        try {
            let offers = await this.Offer.findAll({
                attributes: {
                    exclude: this.EXCLUDE_FORM_ALL_OFFERS,
                },
                order: [["id", "DESC"]],
            });
            if (offers === null) return res.sendStatus(404);
            //
            const { totalPagesAmount, items } = this._handleAllOffersPagination(req.query, offers);
            res.send({
                items,
                totalPagesAmount,
            });
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
    async singleOffer(req, res) {
        try {
            const result = await this.Offer.findOne({
                where: { destination: req.params.destination },
                attributes: { exclude: this.EXCLUDE_FROM_SINGLE_OFFER },
            });
            //
            return result ? res.send(result) : res.sendStatus(404);
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    //
    // Helpers
    //
    _handleAllOffersPagination(query, offers) {
        // calculate range indexes
        const page = query.page * 1,
            limit = query.limit * 1;
        const start = (page - 1) * limit,
            end = start + limit;
        //
        return {
            totalPagesAmount: Math.ceil(offers.length / limit),
            items: offers.splice(start, end),
        };
    }
}
module.exports = OffersGettersController;
