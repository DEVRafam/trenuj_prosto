<template>
    <section id="activities">
        <div class="content">
            <header>
                <h2>Lista atrakcji:</h2>
                <span>Ilość: {{ offerData.activities.length }}</span>
            </header>
            <!--  -->
            <div class="activities-wrap">
                <template v-for="(activity, index) in offerData.activities">
                    <SingleActivity :key="`${index}-${activity}`" :activity="activity" :index="index" :offerData="offerData"></SingleActivity>
                </template>
            </div>
            <!--  -->
            <AddNewActivity :offerData="offerData"></AddNewActivity>
        </div>
    </section>
</template>

<script>
import AddNewActivity from "./AddNewActivity";
import SingleActivity from "./SingleActivity.vue";
export default {
    //
    components: { AddNewActivity, SingleActivity },
    props: ["offerData"]
};
</script>
