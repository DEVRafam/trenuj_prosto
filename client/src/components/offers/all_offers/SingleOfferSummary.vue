<template>
    <div class="single-offer" ref="offer">
        <AdminInterface :offer="offer" v-if="auth"></AdminInterface>
        <!--  -->
        <div class="img" :style="getLogo()" :class="{ soldOut: isTotallySoldOut }">
            <span>WYPRZEDANE</span>
        </div>
        <div class="content">
            <h2 v-text="offer.destination"></h2>
            <span class="term" v-text="offerTerm()"></span>
            <p v-text="offerDescription()"></p>
            <router-link :to="`/oferty/${offer.slug}`">Zobacz więcej</router-link>
        </div>
    </div>
</template>

<script>
import AdminInterface from "./admin/AdminInterface_MAIN";
import { mapState } from "vuex";
export default {
    components: { AdminInterface },
    computed: {
        ...mapState(["API_ADDRESS"]),
        isTotallySoldOut() {
            const dates = JSON.parse(this.offer.dates);
            let soldOutsAmount = 0;
            dates.forEach(termin => {
                if (termin.soldOut) soldOutsAmount++;
            });
            //
            return soldOutsAmount === dates.length;
        }
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
            const dates = JSON.parse(this.offer.dates);
            if (dates.length > 1) {
                return "Dostępne w wielu terminach!";
            } else {
                const { start, end } = dates[0];
                //
                const a = val => val.slice(0, 10);
                return `${a(start)} do ${a(end)}`;
            }
        }
    }
};
</script>
