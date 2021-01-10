<template>
    <section id="gallery">
        <div class="content">
            <GalleryHeader :offerData="offerData"></GalleryHeader>
            <!--  -->
            <section class="all-images">
                <AddItemToGallery :offerData="offerData"></AddItemToGallery>
                <!--  -->
                <template v-for="(img, index) in galleryVisualization">
                    <SingleGalleryItem :key="index" :index="index" :img="img" :offerData="offerData"></SingleGalleryItem>
                </template>
            </section>
        </div>
    </section>
</template>

<script>
import GalleryHeader from "./GalleryHeader";
import AddItemToGallery from "./AddItemToGallery";
import SingleGalleryItem from "./SingleGalleryItem";
//
import { mapState } from "vuex";
export default {
    components: { GalleryHeader, AddItemToGallery, SingleGalleryItem },
    props: ["offerData"],
    computed: {
        ...mapState("admin_add_offer", ["galleryVisualization"])
    }
};
</script>
