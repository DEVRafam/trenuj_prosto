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
        <Pagination :currentPage="currentPage" :pages="totalPagesAmount" path="/aktualnosci"></Pagination>
    </section>
</template>

<script>
import { mapState } from "vuex";
import helpers from "../all_events_mixin";
import Pagination from "../../Pagination";
export default {
    mixins: [helpers],
    computed: {
        ...mapState(["API_ADDRESS"])
    },
    components: { Pagination },
    data() {
        const currentPage = this.$route.query.page || 1;
        return {
            allEvents: null,
            currentPage,
            totalPagesAmount: null
        };
    },
    async mounted() {
        //
        const { API_ADDRESS, axios, currentPage: page } = this;
        const { data } = await axios.get(`${API_ADDRESS}/api/events/all?page=${page}&limit=6`);
        this.allEvents = data.items;
        this.totalPagesAmount = data.totalPagesAmount;
    }
};
</script>
