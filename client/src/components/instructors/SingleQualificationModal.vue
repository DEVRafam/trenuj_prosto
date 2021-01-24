<template>
    <b-modal id="img-preview-modal" title="Podgląd kwalifikacji" hide-footer class="modal" ref="modal" @hidden="resetModal">
        <div class="modal-img" :style="loadImageForModal()"></div>
        <div class="buttons-wrap">
            <button @click="changeCurrentModalItem('prev')">Poprzednie</button>
            <span class="gallery-page" v-text="`(${modalImageIndex + 1}/${currentInstructorQualificationsAmount})`"></span>
            <button @click="changeCurrentModalItem('next')">Następne</button>
        </div>
    </b-modal>
</template>

<script>
export default {
    props: ["instructor", "modalImageIndex", "images", "showModal"],
    computed: {
        currentInstructorQualificationsAmount() {
            return this.images[this.instructor].length;
        }
    },
    methods: {
        loadImageForModal() {
            const { instructor, images, modalImageIndex } = this;
            return `background-image: url(/img/instructors/${instructor}/${images[instructor][modalImageIndex]})`;
        },
        changeCurrentModalItem(direction) {
            const { modalImageIndex: current, images, instructor } = this;
            const { length } = images[instructor];
            //
            if (direction === "prev" && current > 0) {
                this.$emit("change-index", current - 1);
            } else if (direction === "next" && current < length - 1) {
                this.$emit("change-index", current + 1);
            }
        },
        resetModal() {
            this.$emit("hide-modal");
        }
    },
    watch: {
        showModal(val) {
            if (val) this.$refs.modal.show();
        }
    }
};
</script>
