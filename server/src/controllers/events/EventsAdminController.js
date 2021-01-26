const path = require("path");
//
class EventsAdminController extends require(path.join(__dirname, "..", "AdminAbstract")) {
    constructor(models) {
        const pathToUploadedDir = path.join(__dirname, "..", "..", "..", "upload/events");
        super(models, pathToUploadedDir);
    }
    /**
     * @api {post} /api/event/create Create new event
     *
     * @apiHeader authorization {String} Bearer token to authorize user
     *
     * @apiParam logo {File}
     * @apiParam gallery-item-N {File} // N-th content image
     * @apiParam title {String}
     * @apiParam content {String}
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "title": "Berlin"
     *       "content": '[{"type":"header","text":"Ogolne informacje"},{"type":"text","text":"Bali – indonezyjska wyspa w archipelagu Małych Wysp Sundajskich. Jest położona w łańcuchu wysp; od Jawy (na zachodzie) oddziela ją cieśnina Bali, a od wyspy Lombok (na wschodzie) cieśnina Lombok. Stanowi zasadniczą część prowincji Bali. Powierzchnia: 5,6 tys. km²\\nDługość: 145 km\\nSzerokość: 80 km\\nLiczba mieszkańców: 3,4 mln mieszk. (2005)\\nOdległość od Jawy: 3,2 km\\nNajwyższe wzniesienie: czynny wulkan Agung 3142 m n.p.m. (ostatnia erupcja w maju 2019[1])"},{"type":"text","text":"Ludność stanowią głównie Balijczycy, wyznający tzw. hinduizm balijski, a muzułmanie stanowią kilkuprocentową mniejszość."},{"type":"img","imgIndex":1610957020851},{"type":"header","text":"Historia wyspy"},{"type":"text","text":"Od najdawniejszych czasów Bali pozostawało pod dominacją polityczną i kulturalną sąsiedniej Jawy. Wchodziło w skład kolejnych królestw, których ośrodkiem była Jawa. Od 1343 roku w granicach najpotężniejszego z nich, królestwa Majapahit. W XVI wieku Bali zyskało niezależność polityczną, a po podboju Jawy przez muzułmanów (koniec XVI w.) stało się centrum bogatej, pozostającej pod wpływem sztuki południowoindyjskiej, oryginalnej indonezyjskiej kultury, cechującej się m.in. bogatą ornamentyką, z motywami figuralnymi, roślinnymi, fantastycznymi, występującymi w malarstwie na tkaninach, rzeźbie w kamieniu i drewnie, w batiku, w świątyniach, rozwiniętym złotnictwem i płatnerstwem oraz tzw. teatrem cieni (wayang).\\n\\n"},{"type":"text","text":"W epoce kolonialnej przez długi czas zachowało niezależność, dopiero od 1839 roku Holendrzy zaczęli przejmować kontrolę nad wyspą. Niektóre z królestw balijskich zaczęły zawierać tajne porozumienia z kolonializatorami. Gdy na początku XX wieku rozpoczęły się walki między balijskimi regencjami, wkroczyli Holendrzy. W 1906 roku wojska kompanii VOC, wspomagane przez najemników z Moluków, zaatakowały od strony Sanur. Balijskie rodziny królewskie wiedziały, że nie mają szans z przeważającą siłą Holenderskiej Kompanii Wschodnioindyjskiej. Woleli popełnić zbiorowe samobójstwo puputan, niż się poddać. W 1908 roku podobne wydarzenia miały miejsca w Klungkung. Od tego momentu Holendrzy przejęli kontrolę administracyjną nad wyspą."},{"type":"header","text":"Gospodarka"},{"type":"img","imgIndex":1610957033592}]',
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
    async createNewEvent(req, res) {
        try {
            // deeper authorization
            if (!(await this.deepUserAuthorization(req))) {
                return res.sendStatus(403);
            }
            // generate root dir name
            const dirName = this.createDirToStoreImages("event");
            // upload all images
            const { logo, gallery: images } = await this.uploadAllImages(req, dirName);
            //
            const dataToDB = this.generateDataObjectForCreatingEvent(req, dirName, logo, images);
            await this.Event.create(dataToDB);
            //
            res.sendStatus(201);
        } catch (e) {
            res.sendStatus(500);
        }
    }
    /**
     * @api {delete} /api/event/:id
     *
     * @apiHeader authorization {String} Bearer token to authorize user
     *
     * @apiParam id {Number} ID associated with Event, that will be delated
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
    async deleteSingleEvent(req, res) {
        try {
            if (!(await this.deepUserAuthorization(req))) {
                return res.sendStatus(403);
            } else {
                return res.sendStatus(await this.deleteRow(req, "Event"));
            }
        } catch (e) {
            res.sendStatus(500);
        }
    }
    //

    //
}
module.exports = EventsAdminController;
