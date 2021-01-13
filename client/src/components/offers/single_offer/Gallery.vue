<template>
    <section id="gallery">
        <h3>Galeria <b-icon icon="card-image"></b-icon></h3>
        <div class="gallery-items">
            <!--  -->
            <template v-for="(_, index) in gallery">
                <div class="single-gallery-item" :key="index">
                    <div class="img" :style="getGalleryImg(index)"></div>
                    <span @click="openGalleryModal(index)">Powiększ</span>
                </div>
            </template>
            <!--  -->
        </div>
        <!--  -->
        <b-modal id="img-preview-modal" :title="`Zdjęcie (${currentGalleryIndex + 1}/${gallery.length})`" hide-footer class="modal" ref="modal">
            <div class="modal-img" :style="getGalleryImg(currentGalleryIndex)"></div>
            <div class="buttons-wrap">
                <button @click="changeCurrentModalItem('prev')">Poprzednie</button>
                <span class="gallery-page" v-text="`(${currentGalleryIndex + 1}/${gallery.length})`"></span>
                <button @click="changeCurrentModalItem('next')">Następne</button>
            </div>
        </b-modal>
    </section>
</template>

<script>
import { mapState } from "vuex";
export default {
    props: ["offer"],
    computed: {
        ...mapState(["API_ADDRESS"])
    },
    data() {
        return {
            currentGalleryIndex: 0,
            gallery: JSON.parse(this.offer.gallery)
        };
    },
    methods: {
        getGalleryImg(index) {
            if (!this.gallery) return;
            const { API_ADDRESS } = this;
            const { destination } = this.$route.params;
            //
            const url = `${API_ADDRESS}/api/offer/single/${destination}/gallery/${index}`;
            return `background-image: url(${url})`;
        },
        openGalleryModal(index) {
            this.currentGalleryIndex = index;
            this.$refs.modal.show();
        },
        changeCurrentModalItem(direction) {
            const { currentGalleryIndex: current, gallery } = this;
            const { length } = gallery;
            if (direction === "prev" && current > 0) {
                this.currentGalleryIndex--;
            } else if (direction === "next" && current < length - 1) {
                this.currentGalleryIndex++;
            }
        }
    }
};
</script>
