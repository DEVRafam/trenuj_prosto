<template>
    <section id="all-offers">
        <ActivitiesHeader></ActivitiesHeader>
        <OffersNavigation></OffersNavigation>
        <!--  -->
        <template v-if="offers.length">
            <SingleOffer v-for="(offer, index) in offers" :key="index" :offer="offer"></SingleOffer>
        </template>
    </section>
</template>

<script>
import SingleOffer from "./SingleOfferSummary";
import OffersNavigation from "../OffersNavigation";
import { mapState } from "vuex";
//
export default {
    components: { SingleOffer, OffersNavigation },
    computed: {
        ...mapState(["API_ADDRESS"])
    },
    data() {
        return {
            offers: []
        };
    },
    async mounted() {
        const { axios, API_ADDRESS } = this;
        const { data } = await axios.get(`${API_ADDRESS}/api/offer/all`);
        this.offers = data;
    }
};
</script>
