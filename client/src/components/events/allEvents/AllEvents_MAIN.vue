<template>
    <section id="all-events">
        <EventsHeader></EventsHeader>
        <!--  -->
        <div class="events-wrap">
            <template v-if="allEvents">
                <!--  -->
                <SingleEvent v-for="(item, index) in allEvents" :key="index" :item="item" :auth="auth"></SingleEvent>
                <!--  -->
            </template>
        </div>
        <!--  -->
        <Pagination :currentPage="currentPage" :pages="totalPagesAmount" path="/aktualnosci"></Pagination>
    </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Pagination from "../../Pagination";
import SingleEvent from "./SingleEventSummary";
export default {
    computed: {
        ...mapState(["API_ADDRESS"])
    },
    components: { Pagination, SingleEvent },
    data() {
        const currentPage = this.$route.query.page || 1;
        return {
            allEvents: null,
            currentPage,
            totalPagesAmount: null,
            auth: false
        };
    },
    async mounted() {
        const { API_ADDRESS, axios, currentPage: page, deepAuthentication } = this;
        const { data } = await axios.get(`${API_ADDRESS}/api/events/all?page=${page}&limit=6`);
        this.allEvents = data.items;
        this.totalPagesAmount = data.totalPagesAmount;
        //
        // authorize user
        //
        this.auth = await deepAuthentication();
    },
    methods: {
        ...mapActions("admin_auth", ["deepAuthentication"])
    }
};
</script>
