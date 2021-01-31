<template>
    <section id="single-offer">
        <OffersHeader></OffersHeader>
        <!--  -->
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
import Contains from "./Contains";
import Gallery from "./Gallery";
import OfferHeader from "./OfferHeader";
import OfferLogo from "./OfferLogo";
import Organization from "./Organization";
//
import { mapState } from "vuex";
//
export default {
    components: { Contains, Gallery, OfferHeader, OfferLogo, Organization },
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
        const { destination: slug } = this.$route.params;
        //
        try {
            const { data: offer } = await axios.get(`${API_ADDRESS}/api/offer/single/${slug}`);
            this.offer = offer;
            document.title = offer.destination;
        } catch (e) {
            this.$router.push({ path: "/404" });
        }
    }
};
</script>
