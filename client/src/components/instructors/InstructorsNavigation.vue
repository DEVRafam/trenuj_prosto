<template>
    <section id="instructors-navigation">
        <template v-for="item in navData">
            <button v-text="item.name" :key="item.val" @click="handleBtnClick(item.val)" :disabled="handleDisable(item.val)"></button>
        </template>
    </section>
</template>

<script>
export default {
    props: ["instructor"],
    data() {
        return {
            navData: [
                {
                    name: "Arkadiusz Owczarczyk",
                    val: "arek"
                },
                {
                    name: "Kamil Kuzia",
                    val: "kamil"
                }
            ]
        };
    },
    methods: {
        handleBtnClick(val) {
            this.$emit("change-instructor", val);
        },
        handleDisable(val) {
            return this.instructor === val;
        }
    }
};
</script>
