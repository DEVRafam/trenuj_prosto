<template>
    <section id="logo">
        <div class="content">
            <h2>Logo wycieczki:</h2>
            <div class="img-preview" :style="logoVisualization | bgIMGStyle"></div>
            <!--  -->
            <div class="wrap">
                <button @click="selectImgButtonClick">Wybierz zdjęcie</button>
                <span class="img-size" v-if="offerData.logo">
                    <span>Rozmiar zdjęcia: </span>
                    <span class="emphasized">{{ offerData.logo.size | fileSizeUnits }}</span>
                </span>
                <!-- hidden button -->
                <input type="file" accept="image/*" @change="handleUploadLogo" ref="img-input" />
            </div>
            <!--  -->
            <span class="note">* Im mniejszy rozmiar zdjęcia, tym szybciej się będzie ono ładować. Zalecany rozmiar to w granicach do <strong>300kb</strong>.</span>
        </div>
    </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
//
export default {
    props: ["offerData"],
    computed: {
        ...mapState("admin_add_offer", ["logoVisualization"])
    },
    methods: {
        ...mapMutations("admin_add_offer", ["setLogoVisualization"]),
        handleUploadLogo(e) {
            const { setLogoVisualization } = this;
            const img = e.target.files[0];
            this.offerData.logo = img;
            //
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = preview => setLogoVisualization(preview.target.result);
        },
        selectImgButtonClick() {
            this.$refs["img-input"].click();
        }
    }
};
</script>
