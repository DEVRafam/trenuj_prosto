<template>
    <div class="activities-list">
        <!--  -->
        <template v-for="(activity, index) in list">
            <div class="single-activity" :key="index">
                <b-icon icon="check"></b-icon>
                <span class="text" v-text="activity"></span>
            </div>
        </template>
        <!--  -->
    </div>
</template>

<script>
export default {
    props: ["list"]
};
</script>
