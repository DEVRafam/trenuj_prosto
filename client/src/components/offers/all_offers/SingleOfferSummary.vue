<template>
    <div class="single-offer" ref="offer">
        <DeleteOffer :offer="offer" v-if="auth"></DeleteOffer>
        <!--  -->
        <div class="img" :style="getLogo()"></div>
        <div class="content">
            <h2 v-text="offer.destination"></h2>
            <span class="term" v-text="offerTerm()"></span>
            <p v-text="offerDescription()"></p>
            <router-link :to="`/oferty/${offer.destination}`">Zobacz więcej</router-link>
        </div>
    </div>
</template>

<script>
import DeleteOffer from "./DeleteSingleOffer";
import { mapState } from "vuex";
export default {
    components: { DeleteOffer },
    computed: {
        ...mapState(["API_ADDRESS"])
    },
    props: ["offer", "auth"],
    data() {
        return {
            descriptionLength: 200
        };
    },
    methods: {
        getLogo() {
            if (!this.offer) return;
            const { API_ADDRESS, offer } = this;
            const { id } = offer;
            //
            const url = `${API_ADDRESS}/api/offer/single/${id}/logo`;
            return `background-image: url(${url})`;
        },
        offerDescription() {
            const { offer, descriptionLength: limit } = this;
            return `${offer.description.slice(0, limit)}...`;
        },
        offerTerm() {
            const { start, end } = this.offer;
            //
            const a = val => val.slice(0, 10);
            return `${a(start)} do ${a(end)}`;
        }
    }
};
</script>
