<template>
    <section id="single-event-content">
        <template v-for="(item, index) in content">
            <!--  -->
            <h3 v-if="item.type === 'header'" :key="index" v-text="item.text"></h3>
            <!--  -->
            <p v-else-if="item.type === 'text'" :key="index" v-text="item.text"></p>
            <!--  -->
            <ContentImage v-else-if="item.type === 'img'" :key="index" :content="content" :id="id" :item="item"></ContentImage>
        </template>
    </section>
</template>

<script>
import ContentImage from "./ContentImage";
import { mapState } from "vuex";
//
export default {
    computed: {
        ...mapState(["API_ADDRESS"])
    },
    components: {
        ContentImage
    },
    props: ["content", "id"],
    methods: {
        getContentImage(item) {
            const { API_ADDRESS, id } = this;
            return `${API_ADDRESS}/api/events/single/${id}/content-img/${item.imgIndex}`;
        }
    }
};
</script>
