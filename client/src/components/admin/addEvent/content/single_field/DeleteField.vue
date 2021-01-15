<template>
    <div>
        <button @click="showModal" class="delete">Skasuj</button>
        <!--  -->
        <!--  -->
        <!--  -->
        <b-modal id="confirmation-modal" class="modal" title="Potwierdzenie" hide-footer ref="confirmation_modal" size="sm">
            <p class="info">Czy na pewno chcesz usunąć ten element?</p>
            <div class="buttons-wrap">
                <button class="deny" @click="hideModal">Nie</button>
                <button class="allow" @click="handleDelete">Tak</button>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    props: ["item", "index", "eventData", "images"],
    methods: {
        showModal() {
            this.$refs["confirmation_modal"].show();
        },
        hideModal() {
            this.$refs["confirmation_modal"].hide();
        },
        handleDelete() {
            const { item, eventData, index, images } = this;
            const { content } = eventData;
            // delete stored image
            if (item.type === "img" && item.imgIndex) {
                delete images[item.imgIndex];
            }
            //
            content.splice(index, 1);
        }
    }
};
</script>
