<template>
    <b-form-textarea placeholder="Wpisz tekst nagłówka..." v-model="item.text" :maxlength="MAX_HEADER_LENGTH" rows="2"></b-form-textarea>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState("admin_add_event", ["MAX_HEADER_LENGTH"])
    },
    props: ["item"]
};
</script>
