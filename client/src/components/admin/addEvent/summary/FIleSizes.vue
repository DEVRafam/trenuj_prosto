<template>
    <div class="fileSizes" v-if="imagesAmount | logoSize">
        <span class="wrap" v-if="logoSize">
            <span>Rozmiar loga </span>
            <strong>{{ logoSize | fileSizeUnits }}</strong>
        </span>
        <span class="wrap" v-if="imagesAmount > 0">
            <span>Rozmiar wszystkich </span>
            <strong v-text="imagesAmount"></strong>
            <span> zdjęć z treści wynosi </span>
            <strong>{{ imagesTotalSize | fileSizeUnits }}</strong>
        </span>
    </div>
</template>

<script>
export default {
    props: ["eventData"],
    computed: {
        logoSize() {
            try {
                return this.eventData.logo.size;
            } catch (e) {
                return false;
            }
        }
    },
    data() {
        return {
            imagesTotalSize: 0,
            imagesAmount: 0
        };
    },
    methods: {
        getImagesData() {
            const { images } = this.eventData;
            let result = 0;
            let amount = 0;
            for (let key in images) {
                amount++;
                result += images[key].size;
            }
            this.imagesAmount = amount;
            this.imagesTotalSize = result;
        }
    },
    watch: {
        eventData: {
            deep: true,
            immediate: true,
            handler() {
                this.getImagesData();
            }
        }
    }
};
</script>
