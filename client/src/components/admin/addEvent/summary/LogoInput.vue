<template>
    <div class="logo-input">
        <div class="logo-preview" :style="logoToPreview | bgIMGStyle">
            <span v-if="!logoToPreview">Nie dodano loga</span>
        </div>
        <div class="buttons-wrap">
            <button @click="openFileDialog" v-text="generateButtonText()"></button>
            <button @click="openModal">Podgląd</button>
        </div>
        <!--  -->
        <!--  -->
        <!-- hidden button for image upload-->
        <input type="file" accept="image/*" @change="setNewLogo" ref="img-input" />
        <!--  -->
        <b-modal id="img-preview-modal" title="Podgląd loga" hide-footer class="modal" ref="modal">
            <div class="modal-img" :style="logoToPreview | bgIMGStyle"></div>
        </b-modal>
    </div>
</template>
<script>
export default {
    props: ["eventData"],
    data() {
        return {
            logoToPreview: ""
        };
    },
    methods: {
        openFileDialog() {
            this.$refs["img-input"].click();
        },
        setNewLogo(e) {
            this.eventData.logo = e.target.files[0];
        },
        openModal() {
            this.$refs.modal.show();
        },
        generateButtonText() {
            if (this.logoToPreview) return "Zmień logo";
            else return "Dodaj logo";
        }
    },
    watch: {
        eventData: {
            deep: true,
            immediate: true,
            handler(val) {
                if (val.logo) {
                    const reader = new FileReader();
                    reader.readAsDataURL(val.logo);
                    reader.onload = e => (this.logoToPreview = e.target.result);
                }
            }
        }
    }
};
</script>
