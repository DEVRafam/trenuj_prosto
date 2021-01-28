<template>
    <section id="single-event" v-if="eventData">
        <EventsHeader></EventsHeader>
        <!--  -->
        <div class="content">
            <h1 v-text="eventData.title"></h1>
            <span class="date">{{ generateDate() | fancyDate }}</span>
            <div class="logo" :style="generateLogo() | bgIMGStyle"></div>
            <!--  -->
            <Content :content="JSON.parse(eventData.content)" :id="eventData.id"></Content>
            <!--  -->
            <Recommendations :recommendationsList="recommendationsList" v-if="recommendationsList"></Recommendations>
        </div>
    </section>
</template>

<script>
import Content from "./EventContent";
import Recommendations from "./Recommendations";
import { mapState } from "vuex";
export default {
    components: { Content, Recommendations },
    computed: {
        ...mapState(["API_ADDRESS"])
    },
    data() {
        return {
            eventData: null,
            recommendationsList: false
        };
    },
    methods: {
        generateDate() {
            if (this.eventData) {
                return this.eventData.createdAt.slice(0, 10);
            }
        },
        generateLogo() {
            if (this.eventData) {
                const { API_ADDRESS, eventData } = this;
                return `${API_ADDRESS}/api/events/single/${eventData.id}/logo`;
            }
        },
        async getRecomendations() {
            if (this.eventData) {
                const { axios, API_ADDRESS } = this;
                const { id } = this.eventData;
                const { data: recommendations } = await axios.get(`${API_ADDRESS}/api/events/single/${id}/recommendations`);
                this.recommendationsList = recommendations;
            }
        }
    },
    async mounted() {
        const { title } = this.$route.params;
        const { axios, API_ADDRESS } = this;
        //
        try {
            const { data: eventData } = await axios.get(`${API_ADDRESS}/api/events/single/${title}`);
            this.eventData = eventData;
            document.title = eventData.title;
            //
            await this.getRecomendations();
        } catch (e) {
            this.$router.push({ path: "/404" });
        }
        // reccomendatios for the event
    }
};
</script>
