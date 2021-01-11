<template>
    <div class="single-img" id="add-new" @click="openFileDialog">
        <b-icon icon="plus"></b-icon>
        <span class="msg">Dodaj zdjęcie</span>
        <!-- hidden button -->
        <input type="file" accept="image/*" @change="addItemToGallery" ref="img-input" />
    </div>
</template>

<script>
import { mapMutations } from "vuex";
//
export default {
    props: ["offerData"],
    methods: {
        ...mapMutations("admin_add_offer", ["addToGallery"]),
        //
        openFileDialog() {
            this.$refs["img-input"].click();
        },
        addItemToGallery(e) {
            const { addToGallery, offerData } = this;
            const img = e.target.files[0];
            offerData.gallery.push(img);
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = e => addToGallery(e.target.result);
        }
    }
};
</script>
