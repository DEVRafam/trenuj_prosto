<template>
    <div class="single-activity">
        <span class="order" v-text="index + 1"></span>
        <h5 v-text="activity"></h5>
        <button @click="deleteActivity">
            <b-icon icon="trash"></b-icon>
        </button>
    </div>
</template>

<script>
export default {
    props: ["index", "activity", "offerData"],
    methods: {
        deleteActivity() {
            const { offerData, index } = this;
            offerData.activities.splice(index, 1);
        }
    }
};
</script>

<style></style>
