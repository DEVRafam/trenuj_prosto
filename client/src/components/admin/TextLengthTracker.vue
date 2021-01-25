<template>
    <span class="textLengthInfo" :class="{ error: errorClass }" v-text="generateText()"></span>
</template>

<script>
export default {
    props: ["min", "max", "val"],
    data() {
        return {
            errorClass: false
        };
    },
    methods: {
        generateText() {
            return `${this.val.length}/${this.max}`;
        }
    },
    watch: {
        val: {
            deep: true,
            immediate: true,
            handler(val) {
                const { min, max } = this;
                const { length } = val;
                if (length < min || length > max) this.errorClass = true;
                else this.errorClass = false;
            }
        }
    }
};
</script>
