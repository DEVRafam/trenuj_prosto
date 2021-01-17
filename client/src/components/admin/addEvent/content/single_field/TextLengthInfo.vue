<template>
    <span class="length" v-text="generateLength()" :class="{ error: errorClass }"></span>
</template>

<script>
//
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState("admin_add_event", ["HEADER_LENGTH", "TEXT_LENGTH"])
    },
    props: ["item"],
    data() {
        return {
            errorClass: false
        };
    },
    methods: {
        getLengthObject() {
            const { HEADER_LENGTH, TEXT_LENGTH, item } = this;
            return {
                header: HEADER_LENGTH,
                text: TEXT_LENGTH
            }[item.type];
        },
        generateLength() {
            const { text } = this.item;
            return `${text.length}/${this.getLengthObject().max}`;
        }
    },
    watch: {
        item: {
            deep: true,
            immediate: true,
            handler(val) {
                const { min, max } = this.getLengthObject();
                const { length } = val.text;
                if (length < min || length > max) this.errorClass = true;
                else this.errorClass = false;
            }
        }
    }
};
</script>
