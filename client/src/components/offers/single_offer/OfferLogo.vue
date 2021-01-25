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
            const { id } = this.offer;
            //
            const url = `${API_ADDRESS}/api/offer/single/${id}/logo`;
            return `background-image: url(${url})`;
        }
    }
};
</script>
