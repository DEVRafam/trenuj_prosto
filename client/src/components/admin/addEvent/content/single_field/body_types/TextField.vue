<template>
    <b-form-textarea placeholder="Wpisz tekst..." v-model="item.text" :maxlength="MAX_TEXT_LENGTH" rows="5"></b-form-textarea>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState("admin_add_event", ["MAX_HEADER_LENGTH", "MAX_TEXT_LENGTH"])
    },
    props: ["item"]
};
</script>
