<template>
    <div class="wrap">
        <template v-if="imageToPreview">
            <div class="img-preview" :style="imageToPreview | bgIMGStyle"></div>
            <!--  -->
            <div class="text">
                <!--  -->
                <span class="size" v-if="imageToPreview">
                    <span>Rozmiar zdjęcia </span>
                    <strong>{{ getAssociatedImage().size | fileSizeUnits }}</strong>
                </span>
                <!--  -->
                <button @click="openModal">Powiększ</button>
                <button @click="openFileDialog">Zmień zdjęcie</button>
            </div>
        </template>
        <template v-else>
            <div class="field-is-empty">
                <h3>
                    <span>Brak zdjęcia</span>
                    <b-icon icon="exclamation-circle"></b-icon>
                </h3>
                <button @click="openFileDialog">Wybierz zdjęcie</button>
            </div>
        </template>
        <!--  -->
        <!--  -->
        <!--  -->
        <!-- hidden button for image upload-->
        <input type="file" accept="image/*" @change="setNewImage" ref="img-input" />
        <!-- modal -->
        <b-modal id="img-preview-modal" title="Podgląd zdjęcia" hide-footer class="modal" ref="modal">
            <div class="modal-img" :style="imageToPreview | bgIMGStyle"></div>
        </b-modal>
    </div>
</template>

<script>
export default {
    props: ["item", "images"],
    data() {
        return {
            imageToPreview: ""
        };
    },
    methods: {
        getAssociatedImage() {
            if (this.item.type === "img") {
                const { item, images } = this;
                const { imgIndex } = item;
                return images[imgIndex];
            }
        },
        setNewImage(e) {
            const imgIndex = Date.now();
            const { item, images } = this;
            // delete previous image
            if (this.getAssociatedImage()) delete images[item.imgIndex];
            //
            item.imgIndex = imgIndex;
            images[imgIndex] = e.target.files[0];
            //
        },
        openFileDialog() {
            this.$refs["img-input"].click();
        },
        openModal() {
            this.$refs.modal.show();
        }
    },
    watch: {
        item: {
            deep: true,
            immediate: true,
            handler() {
                const { item } = this;
                if (item.type === "img") {
                    const img = this.getAssociatedImage();
                    //
                    if (img) {
                        const reader = new FileReader();
                        reader.readAsDataURL(img);
                        reader.onload = e => (this.imageToPreview = e.target.result);
                    }
                    //
                    else if (item.imgIndex) item.imgIndex = null;
                }
            }
        }
    }
};
</script>
