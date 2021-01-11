<template>
    <section id="wrap-images" class="stage">
        <UploadLogo :offerData="offerData"></UploadLogo>
        <UploadGallery :offerData="offerData"></UploadGallery>
    </section>
</template>

<script>
import UploadLogo from "./UploadLogo";
import UploadGallery from "./gallery/UploadGallery_MAIN";
//
export default {
    props: ["offerData"],
    components: { UploadLogo, UploadGallery }
};
</script>

<style></style>
