<template>
    <section id="add-offer">
        <header id="main">
            <h1>Dodaj ofertę</h1>
            <button>Kontynuuj</button>
            <button>Resetuj</button>
        </header>
        <!--  -->
        <div class="stages">
            <div class="stage" id="content">
                <Describe :offerData="offerData"></Describe>
                <Activities :offerData="offerData"></Activities>
            </div>
            <!--  -->
            <div class="stage" id="images">
                <!-- IMAGES UPLOAD TO DO -->
            </div>
        </div>
    </section>
</template>
<script>
//
import Describe from "./describe/DescribeOffer_MAIN";
import Activities from "./activities/Activites_MAIN";
//
export default {
    components: { Describe, Activities },
    data() {
        return {
            offerData: {
                destination: "",
                description: "",
                logo: "",
                gallery: "",
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
            PROPERTY_NAME_IN_LOCAL_STORAGE: "new_offer"
        };
    },
    mounted() {
        const offerFromLocalStorage = localStorage.getItem(this.PROPERTY_NAME_IN_LOCAL_STORAGE);
        if (offerFromLocalStorage != null) {
            this.offerData = JSON.parse(offerFromLocalStorage);
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
