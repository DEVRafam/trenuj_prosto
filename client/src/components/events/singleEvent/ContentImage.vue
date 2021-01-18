<template>
    <div class="image-wrap">
        <div class="img" :style="getContentImage() | bgIMGStyle"></div>
        <span class="preview" @click="openModal">Zobacz</span>
        <!--  -->
        <!--  -->
        <!--  -->
        <b-modal id="img-preview-modal" title="Podgląd zdjęcia" hide-footer class="modal" ref="modal">
            <div class="modal-img" :style="getContentImage() | bgIMGStyle"></div>
        </b-modal>
    </div>
</template>

<script>
import { mapState } from "vuex";
//
export default {
    computed: {
        ...mapState(["API_ADDRESS"])
    },
    props: ["content", "id", "item"],
    methods: {
        openModal() {
            this.$refs.modal.show();
        },
        getContentImage() {
            const { API_ADDRESS, id, item } = this;
            return `${API_ADDRESS}/api/events/single/${id}/content-img/${item.imgIndex}`;
        }
    }
};
</script>
