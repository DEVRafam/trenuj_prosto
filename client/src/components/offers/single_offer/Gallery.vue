<template>
    <section id="gallery">
        <h3>Galeria <b-icon icon="card-image"></b-icon></h3>
        <div class="gallery-items">
            <!--  -->
            <template v-for="(_, index) in gallery">
                <div class="single-gallery-item" :key="index" :style="getGalleryImg(index)"></div>
            </template>
            <!--  -->
        </div>
    </section>
</template>

<script>
import { mapState } from "vuex";
export default {
    props: ["gallery"],
    computed: {
        ...mapState(["API_ADDRESS"])
    },
    methods: {
        getGalleryImg(index) {
            if (!this.gallery) return;
            const { API_ADDRESS } = this;
            const { destination } = this.$route.params;
            //
            const url = `${API_ADDRESS}/api/offer/single/${destination}/gallery/${index}`;
            return `background-image: url(${url})`;
        }
    }
};
</script>
