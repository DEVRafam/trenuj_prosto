<template>
    <div class="single-img">
        <div class="img" :style="img | bgIMGStyle"></div>
        <!--  -->
        <span class="zoom" @click="previewImg">Podgląd</span>
        <span class="size">{{ offerData.gallery[index].size | fileSizeUnits }}</span>
        <span class="delete" @click="removeImgFromGallery">Usuń</span>
        <!-- modal -->
        <b-modal id="img-preview-modal" title="Podgląd zdjęcia z galerii" hide-footer class="modal" ref="modal">
            <div class="modal-img" :style="img | bgIMGStyle"></div>
        </b-modal>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    props: ["img", "index", "offerData"],
    methods: {
        ...mapMutations("admin_add_offer", ["removeFromGallery"]),
        removeImgFromGallery() {
            const { index, removeFromGallery, offerData } = this;
            //
            removeFromGallery(index);
            offerData.gallery.splice(index, 1);
        },
        previewImg() {
            this.$refs["modal"].show();
        }
    }
};
</script>
