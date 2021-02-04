<template>
    <section id="all-offers">
        <OffersHeader></OffersHeader>
        <!--  -->
        <template v-if="offers">
            <template v-if="offers.length">
                <SingleOffer v-for="(offer, index) in offers" :key="index" :offer="offer" :auth="auth"></SingleOffer>
                <Pagination :pages="pages" :currentPage="currentPage" path="/oferty"></Pagination>
            </template>
            <!--  -->
            <h1 class="blank" v-else>
                <b-icon icon="x-circle"></b-icon>
                <span>Nie znaleziono żadnych ofert!</span>
            </h1>
        </template>
        <!--  -->
    </section>
</template>

<script>
import SingleOffer from "./SingleOfferSummary";
import Pagination from "../../Pagination";
//
import { mapState, mapActions } from "vuex";
//
export default {
    components: { SingleOffer, Pagination },
    computed: {
        ...mapState(["API_ADDRESS", "OFFERS_PER_PAGE"])
    },
    data() {
        const currentPage = this.$route.query.page || 1;
        return {
            offers: false,
            pages: 0,
            currentPage,
            auth: false
        };
    },
    methods: {
        ...mapActions("admin_auth", ["deepAuthentication"])
    },
    async mounted() {
        // get all offers data
        const { axios, API_ADDRESS, OFFERS_PER_PAGE: limit, currentPage: page, deepAuthentication } = this;
        const { data } = await axios.get(`${API_ADDRESS}/api/offer/all?page=${page}&limit=${limit}`);
        this.offers = data.items;
        this.pages = data.totalPagesAmount;
        // authorize user
        this.auth = await deepAuthentication();
    }
};
</script>
