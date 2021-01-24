<template>
    <section id="qualifications">
        <div class="single-image" v-for="(item, index) in images[instructor]" :key="`${instructor}_${item}`">
            <div class="img" :style="loadImageForGeneral(item)"></div>
            <span @click="openModal(index)">Podgląd</span>
        </div>
        <!--  -->
        <!--  -->
        <!--  -->
        <Modal :images="images" :modalImageIndex="modalImageIndex" :instructor="instructor" :showModal="showModal" @change-index="val => (modalImageIndex = val)" @hide-modal="() => (showModal = false)"></Modal>
    </section>
</template>

<script>
import Modal from "./SingleQualificationModal";
export default {
    components: { Modal },
    props: ["instructor"],
    methods: {
        loadImageForGeneral(img) {
            return `background-image: url(/img/instructors/${this.instructor}/${img})`;
        },
        openModal(val) {
            this.modalImageIndex = val;
            this.showModal = true;
        }
    },
    data() {
        return {
            images: {
                arek: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
                kamil: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]
            },
            modalImageIndex: false,
            showModal: false
        };
    }
};
</script>
