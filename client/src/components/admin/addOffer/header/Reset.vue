<template>
    <div>
        <button @click="showModal">Resetuj</button>
        <!-- RESET MODAL -->
        <b-modal id="confirmation-modal" class="modal" title="Potwierdzenie" hide-footer ref="confirmation_modal">
            <p class="info">Czy na pewno chcesz zresetować ofertę?</p>
            <div class="buttons-wrap">
                <button class="deny" @click="hideModal">Nie</button>
                <button class="allow" @click="handleReset">Tak</button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState("admin_add_offer", ["currentStage"])
    },
    methods: {
        handleReset() {
            this.$emit("reset");
            this.hideModal();
        },
        showModal() {
            if (this.currentStage === "upload") return;
            this.$refs.confirmation_modal.show();
        },
        hideModal() {
            this.$refs.confirmation_modal.hide();
        }
    }
};
</script>
