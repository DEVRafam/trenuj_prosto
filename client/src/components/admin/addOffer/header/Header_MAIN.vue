<template>
    <header id="main" v-if="currentStage !== 'upload'">
        <h1>Dodaj ofertę</h1>
        <!-- Stage manager -->
        <button v-if="currentStage === 'content'" @click="setCurrentStage('images')" class="stage-manager">Kontynuuj</button>
        <button v-if="currentStage === 'images'" @click="setCurrentStage('content')" class="stage-manager">Wróć</button>
        <!--  -->
        <Reset @reset="$emit('reset')"></Reset>
        <!--  -->
        <Upload :offerData="offerData"></Upload>
    </header>
</template>

<script>
import Reset from "./Reset";
import Upload from "./Upload";
import { mapState, mapMutations } from "vuex";
//
export default {
    props: ["offerData"],
    components: { Reset, Upload },
    computed: {
        ...mapState("admin_add_offer", ["currentStage"])
    },
    methods: {
        ...mapMutations("admin_add_offer", ["setCurrentStage"])
    }
};
</script>
