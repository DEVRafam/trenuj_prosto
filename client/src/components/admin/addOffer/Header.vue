<template>
    <header id="main">
        <h1>Dodaj ofertę</h1>
        <!-- Stage manager -->
        <!--  -->
        <button v-if="currentStage === 'content'" @click="setCurrentStage('upload')" class="stage-manager">Kontynuuj</button>
        <button v-if="currentStage === 'upload'" @click="setCurrentStage('content')" class="stage-manager">Wróć</button>
        <!--  -->
        <button v-b-modal.confirmation-modal>Resetuj</button>
        <!-- RESET MODAL -->
        <b-modal id="confirmation-modal" class="modal" title="Potwierdzenie" hide-footer ref="confirmation_modal">
            <p class="info">Czy na pewno chcesz zresetować ofertę?</p>
            <div class="buttons-wrap">
                <button class="deny" @click="hideModal">Nie</button>
                <button class="allow" @click="handleReset">Tak</button>
            </div>
        </b-modal>
    </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    computed: {
        ...mapState("admin_add_offer", ["currentStage"])
    },
    methods: {
        ...mapMutations("admin_add_offer", ["setCurrentStage"]),
        handleReset() {
            this.$emit("reset");
            this.hideModal();
        },
        hideModal() {
            this.$refs.confirmation_modal.hide();
        }
    }
};
</script>
