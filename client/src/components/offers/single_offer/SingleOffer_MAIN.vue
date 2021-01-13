<template>
    <section id="single-offer">
        <ActivitiesHeader></ActivitiesHeader>
        <OffersNavigation></OffersNavigation>
        <div class="content" v-if="offer">
            <h1 v-text="offer.destination"></h1>
            <!--  -->
            <span class="date">
                <span>Wyciaczka w dniach:</span>
                <strong v-text="offerTerm()"></strong>
            </span>
            <!--  -->
            <div class="logo" :style="getLogo()"></div>
            <!--  -->
            <p class="description" v-text="offer.description"></p>
            <!--  -->
            <h3 class="price">
                <span>Cena </span>
                <strong class="price" v-text="`${offer.price} zł`"></strong>
                <span> od osoby obejmuje: </span>
            </h3>
            <!--  -->
            <ActivitiesList :list="JSON.parse(offer.activities)"></ActivitiesList>
            <!--  -->
            <h3 class="bon-payment" v-if="offer.turistBonPayment == 'true'">Możliwość płacenia bonem turystycznym</h3>
            <!--  -->
            <Gallery :gallery="JSON.parse(offer.gallery)"></Gallery>
        </div>
    </section>
</template>
<script>
import OffersNavigation from "../OffersNavigation";
import ActivitiesList from "./ActivitiesList";
import Gallery from "./Gallery";
//
import { mapState } from "vuex";
//
export default {
    components: { OffersNavigation, ActivitiesList, Gallery },
    computed: {
        ...mapState(["API_ADDRESS"])
    },
    data() {
        return {
            offer: false
        };
    },
    async mounted() {
        const { axios, API_ADDRESS } = this;
        const { destination } = this.$route.params;
        //
        const { data: offer } = await axios.get(`${API_ADDRESS}/api/offer/single/${destination}`);
        this.offer = offer;
    },
    methods: {
        getLogo() {
            if (!this.offer) return;
            const { API_ADDRESS } = this;
            const { destination } = this.$route.params;
            //
            const url = `${API_ADDRESS}/api/offer/single/${destination}/logo`;
            return `background-image: url(${url})`;
        },
        offerTerm() {
            if (!this.offer) return;
            const { start, end } = this.offer;
            //
            const a = val => val.slice(0, 10);
            return `${a(start)} do ${a(end)}`;
        }
    }
};
</script>
