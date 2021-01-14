<template>
    <section id="add-offer">
        <OfferHeader @reset="reset" :offerData="offerData"></OfferHeader>
        <!--  -->
        <div class="stages">
            <!--  -->
            <section class="stage" id="wrap-content" :class="{ active: currentStage === 'content' }">
                <Describe :offerData="offerData"></Describe>
                <Activities :offerData="offerData"></Activities>
            </section>
            <!--  -->
            <UploadImages :offerData="offerData" :class="{ active: currentStage === 'images' }"></UploadImages>
            <!--  -->
            <OfferUploading :class="{ active: currentStage === 'upload' }" :offerData="offerData"></OfferUploading>
        </div>
    </section>
</template>
<script>
//
import Describe from "./describe/DescribeOffer_MAIN";
import Activities from "./activities/Activites_MAIN";
import OfferHeader from "./header/Header_MAIN";
import UploadImages from "./upload_images/UploadImages_MAIN.vue";
import OfferUploading from "./OfferUploading";
//
import { mapState, mapMutations } from "vuex";
import handleLocalStorage from "./saveOfferInLocalStorage";
export default {
    mixins: [handleLocalStorage],
    components: { Describe, Activities, OfferHeader, UploadImages, OfferUploading },
    computed: {
        ...mapState("admin_add_offer", ["currentStage", "PROPERTY_NAME_IN_LOCAL_STORAGE"])
    },
    data() {
        return {
            offerData: {
                destination: "",
                description: "",
                logo: "",
                gallery: [],
                start: "",
                end: "",
                price: 0,
                activities: [],
                turistBonPayment: false
            },
            imagesToDisplay: {
                logo: {},
                gallery: {}
            }
            //
        };
    },
    methods: {
        ...mapMutations("admin_add_offer", ["setCurrentStage", "changeUploadingStatus"]),
        reset() {
            this.offerData = {
                destination: "",
                description: "",
                logo: "",
                gallery: [],
                start: "",
                end: "",
                price: 0,
                activities: [],
                turistBonPayment: false
            };
            location.reload();
        }
    },
    beforeDestroy() {
        this.setCurrentStage("content");
        this.changeUploadingStatus("pending");
    }
};
</script>
