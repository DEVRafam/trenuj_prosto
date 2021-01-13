<template>
    <div class="logo" :style="getLogo()"></div>
</template>

<script>
import { mapState } from "vuex";

export default {
    props: ["offer"],
    computed: {
        ...mapState(["API_ADDRESS"])
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
