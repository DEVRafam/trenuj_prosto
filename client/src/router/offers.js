import SingleOffer from "../components/offers/single_offer/SingleOffer_MAIN";
import AllOffers from "../components/offers/all_offers/AllOffers_MAIN";
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
        }
    }
];
