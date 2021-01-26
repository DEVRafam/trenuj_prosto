const path = require("path");
//
class OffersAdminController extends require(path.join(__dirname, "..", "AdminAbstract")) {
    constructor(models) {
        const pathToUploadedDir = path.join(__dirname, "..", "..", "..", "upload/offers");
        super(models, pathToUploadedDir);
    }
    /**
     * @api {post} /api/offer/create Create new offer
     *
     * @apiHeader authorization {String} Bearer token to authorize user
     *
     * @apiParam logo {File}
     * @apiParam gallery-item-N {File} // N-th gallery image
     * @apiParam destination {String}
     * @apiParam description {String}
     * @apiParam activities {JSON}
     * @apiParam end {Date}
     * @apiParam start {Date}
     * @apiParam turistBonPayment {Boolean}
     * @apiParam price {Number}
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "destination": "Berlin"
     *       "description": "Berlin – stolica, największe miasto Niemiec i zarazem kraj związkowy. Zajmuje powierzchnię ok. 892 km² i zamieszkuje go około 3,7 mln osób[2]. Jest największym miastem w Unii Europejskiej pod względem liczby mieszkańców. Berlin jest podzielony na dwanaście okręgów administracyjnych (Bezirk). Przez przestrzeń miejską przepływają m.in. rzeki Sprewa i Hawela, a ponadto znajduje się wiele jezior i zatok, w tym największe Müggelsee. ",
     *       "activities": '["\\tWieża Eiffla","\\tMuzeum w Luwrze ","Katedra Notre-Dame ","Łuk Triumfalny w Paryżu"]',
     *       "price": 1000,
     *       "start": "2021-01-19T00:00:00.000Z",
     *       "end": "2021-01-29T00:00:00.000Z",
     *       "turistBonPayment": "true"
     *
     *     }
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 CREATED
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 BAD REQUEST
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 UNAUTHORIZED
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 INTERNAL SERVER ERROR
     *
     */
    async createNewOffer(req, res) {
        try {
            // deeper authorization
            if (!(await this.deepUserAuthorization(req))) {
                return res.sendStatus(403);
            }
            // generate root dir name
            const dirName = this.createDirToStoreImages("offer");
            // upload all images
            const { logo, gallery } = await this.uploadAllImages(req, dirName);
            // insert new offer data into database
            const dataToDB = this.generateDataObjectForCreatingOffer(req, dirName, logo, gallery);
            await this.Offer.create(dataToDB);
            return res.sendStatus(201);
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    /**
     * @api {delete} /api/offer/:id
     *
     * @apiHeader authorization {String} Bearer token to authorize user
     *
     * @apiParam id {Number} ID associated with Offer, that will be delated
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 BAD REQUEST
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 UNAUTHORIZED
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 403 FORBIDDEN
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 INTERNAL SERVER ERROR
     *
     */
    async deleteOffer(req, res) {
        try {
            if (!(await this.deepUserAuthorization(req))) {
                return res.sendStatus(403);
            } else {
                return res.sendStatus(await this.deleteRow(req, "Offer"));
            }
        } catch (e) {
            res.sendStatus(500);
        }
    }
}
module.exports = OffersAdminController;
