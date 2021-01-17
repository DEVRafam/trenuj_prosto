<template>
    <b-form-textarea placeholder="Wpisz tekst..." v-model="item.text" :maxlength="TEXT_LENGTH.max" rows="5"></b-form-textarea>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState("admin_add_event", ["TEXT_LENGTH"])
    },
    props: ["item"]
};
</script>
