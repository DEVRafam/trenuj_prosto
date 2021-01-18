<template>
    <section id="all-events">
        <EventsHeader></EventsHeader>
        <!--  -->
        <div class="events-wrap">
            <template v-if="allEvents">
                <div class="single-event" v-for="(item, index) in allEvents" :key="index">
                    <span class="date" v-text="generateDate(item)"></span>
                    <div class="logo" :style="getLogo(item) | bgIMGStyle"></div>
                    <h3 v-text="item.title"></h3>
                    <router-link :to="generateRouterPath(item)">Zobacz wiecej</router-link>
                </div>
            </template>
        </div>
        <!--  -->
    </section>
</template>

<script>
import { mapState } from "vuex";
import helpers from "../all_events_mixin";
export default {
    mixins: [helpers],
    computed: {
        ...mapState(["API_ADDRESS"])
    },
    data() {
        return {
            allEvents: null
        };
    },
    async mounted() {
        //
        const { API_ADDRESS, axios } = this;
        const { data } = await axios.get(`${API_ADDRESS}/api/events/all`);
        this.allEvents = data;
    }
};
</script>
