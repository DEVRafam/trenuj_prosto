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
            <OfferUploading :class="{ active: currentStage === 'upload' }"></OfferUploading>
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
import { mapState } from "vuex";
export default {
    components: { Describe, Activities, OfferHeader, UploadImages, OfferUploading },
    computed: {
        ...mapState("admin_add_offer", ["currentStage"])
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
            },
            //
            PROPERTY_NAME_IN_LOCAL_STORAGE: "new_offer"
        };
    },
    methods: {
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
    mounted() {
        const offerFromLocalStorage = localStorage.getItem(this.PROPERTY_NAME_IN_LOCAL_STORAGE);
        if (offerFromLocalStorage != null) {
            this.offerData = JSON.parse(offerFromLocalStorage);
            this.offerData.logo = "";
            this.offerData.gallery = [];
        }
    },
    watch: {
        offerData: {
            deep: true,
            handler(val) {
                localStorage.setItem(this.PROPERTY_NAME_IN_LOCAL_STORAGE, JSON.stringify(val));
            }
        }
    }
};
</script>
