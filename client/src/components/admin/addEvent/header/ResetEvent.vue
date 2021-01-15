<template>
    <div>
        <button @click="showModal">Resetuj</button>
        <!--  -->
        <!--  -->
        <!--  -->
        <b-modal id="confirmation-modal" class="modal" title="Potwierdzenie" hide-footer ref="confirmation_modal" size="sm">
            <p class="info">Czy na pewno chcesz zresetować aktualność?</p>
            <div class="buttons-wrap">
                <button class="deny" @click="hideModal">Nie</button>
                <button class="allow" @click="handleReset">Tak</button>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    methods: {
        showModal() {
            this.$refs["confirmation_modal"].show();
        },
        hideModal() {
            this.$refs["confirmation_modal"].hide();
        },
        handleReset() {
            this.$emit("reset");
            this.hideModal();
        }
    }
};
</script>
