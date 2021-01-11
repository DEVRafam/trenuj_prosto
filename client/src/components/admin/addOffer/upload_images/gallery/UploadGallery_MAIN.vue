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
import { mapState, mapMutations } from "vuex";
export default {
    components: { GalleryHeader, AddItemToGallery, SingleGalleryItem },
    props: ["offerData"],
    computed: {
        ...mapState("admin_add_offer", ["galleryVisualization"])
    },
    methods: {
        ...mapMutations("admin_add_offer", ["resetGalleryVisualization"])
    },
    watch: {
        // prevent from displaying old gallery when current is empty
        offerData: {
            deep: true,
            immediate: true,
            handler(val) {
                if (val.gallery.length === 0) this.resetGalleryVisualization();
            }
        }
    }
};
</script>
