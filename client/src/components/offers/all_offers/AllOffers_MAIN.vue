<template>
    <section id="all-offers">
        <h1>Wszystkie oferty</h1>
        <!--  -->
        <template v-if="offers.length">
            <SingleOffer v-for="(offer, index) in offers" :key="index" :offer="offer"></SingleOffer>
        </template>
    </section>
</template>

<script>
import SingleOffer from "./SingleOfferSummary";
import { mapState } from "vuex";
export default {
    components: { SingleOffer },
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
        console.log(data);
        this.offers = data;
    }
};
</script>
