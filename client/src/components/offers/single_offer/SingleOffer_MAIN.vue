<template>
    <section id="single-offer">
        <div class="img" :style="getLogo()"></div>
        <p v-text="offer"></p>
    </section>
</template>
//destination
<script>
import { mapState } from "vuex";
export default {
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
        }
    }
};
</script>
