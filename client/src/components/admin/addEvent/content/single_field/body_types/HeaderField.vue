<template>
    <b-form-textarea placeholder="Wpisz tekst nagłówka..." v-model="item.text" :maxlength="HEADER_LENGTH.max" rows="2"></b-form-textarea>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState("admin_add_event", ["HEADER_LENGTH"])
    },
    props: ["item"]
};
</script>
