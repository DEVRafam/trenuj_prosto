<template>
    <section id="single-offer">
        <OffersHeader></OffersHeader>
        <OffersNavigation></OffersNavigation>
        <div class="content" v-if="offer">
            <!--  -->
            <OfferHeader :offer="offer"></OfferHeader>
            <OfferLogo :offer="offer"></OfferLogo>
            <!--  -->
            <p class="description" v-text="offer.description"></p>
            <!--  -->
            <Contains :offer="offer"></Contains>
            <Gallery :offer="offer"></Gallery>
            <Organization></Organization>
        </div>
    </section>
</template>
<script>
import OffersNavigation from "../OffersNavigation";
import Contains from "./Contains";
import Gallery from "./Gallery";
import OfferHeader from "./OfferHeader";
import OfferLogo from "./OfferLogo";
import Organization from "./Organization";
//
import { mapState } from "vuex";
//
export default {
    components: { OffersNavigation, Contains, Gallery, OfferHeader, OfferLogo, Organization },
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
        try {
            const { data: offer } = await axios.get(`${API_ADDRESS}/api/offer/single/${destination}`);
            this.offer = offer;
            document.title = offer.destination;
        } catch (e) {
            this.$router.push({ path: "/404" });
        }
    }
};
</script>
