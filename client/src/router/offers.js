import SingleOffer from "../components/offers/single_offer/SingleOffer_MAIN";
import AllOffers from "../components/offers/all_offers/AllOffers_MAIN";
import Partners from "../components/offers/Partners";
import Gymnastics from "../components/offers/gymnastics/Gymnastics_MAIN";
import FilesToDownload from "../components/offers/FilesToDownload.vue";
//
export default [
    {
        path: "/oferty/:destination",
        name: "SingleOffer",
        component: SingleOffer,
        meta: {
            title: "Oferta"
        }
    },
    {
        path: "/oferty",
        name: "AllOffers",
        component: AllOffers,
        meta: {
            title: "Oferty"
        },
        query: {
            page: 1
        }
    },
    {
        path: "/wyjezdzali-z-nami",
        name: "Partners",
        component: Partners,
        meta: {
            title: "Wyjeżdżali z nami"
        }
    },
    {
        path: "/gimnastyka-korektycyjna",
        name: "Gymnastics",
        component: Gymnastics,
        meta: {
            title: "Gimnastyka korektycyjna"
        }
    },
    {
        path: "/pliki-do-pobrania",
        name: "FilesToDownload",
        component: FilesToDownload,
        meta: {
            title: "Pliki do pobrania"
        }
    }
];
