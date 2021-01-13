<template>
    <section id="all-offers">
        <ActivitiesHeader></ActivitiesHeader>
        <OffersNavigation></OffersNavigation>
        <!--  -->
        <template v-if="offers.length">
            <SingleOffer v-for="(offer, index) in offers" :key="index" :offer="offer"></SingleOffer>
            <Pagination :pages="pages" :currentPage="currentPage"></Pagination>
        </template>
        <!--  -->
    </section>
</template>

<script>
import SingleOffer from "./SingleOfferSummary";
import OffersNavigation from "../OffersNavigation";
import Pagination from "./Pagination";
import { mapState } from "vuex";
//
export default {
    components: { SingleOffer, OffersNavigation, Pagination },
    computed: {
        ...mapState(["API_ADDRESS", "OFFERS_PER_PAGE"])
    },
    data() {
        const currentPage = this.$route.query.page || 1;
        return {
            offers: [],
            pages: 0,
            currentPage
        };
    },
    async mounted() {
        const { axios, API_ADDRESS, OFFERS_PER_PAGE: limit, currentPage: page } = this;

        const { data } = await axios.get(`${API_ADDRESS}/api/offer/all?page=${page}&limit=${limit}`);
        this.offers = data.items;
        this.pages = data.totalPagesAmount;
    }
};
</script>
