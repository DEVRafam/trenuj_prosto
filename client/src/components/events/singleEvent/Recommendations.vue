<template>
    <section id="all-events">
        <h2>Zobacz również</h2>
        <!--  -->
        <div class="events-wrap">
            <div class="single-event" v-for="(item, index) in recommendationsList" :key="index">
                <span class="date" v-text="generateDate(item)"></span>
                <div class="logo" :style="getLogo(item) | bgIMGStyle"></div>
                <h3 v-text="item.title"></h3>
                <router-link :to="generateRouterPath(item)">Zobacz wiecej</router-link>
            </div>
        </div>
        <!--  -->
    </section>
</template>

<script>
import { mapState } from "vuex";
import helpers from "../all_events_mixin";
export default {
    props: ["recommendationsList"],
    computed: {
        ...mapState(["API_ADDRESS"])
    },
    mixins: [helpers]
};
</script>
