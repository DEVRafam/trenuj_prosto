<template>
    <section id="add-event">
        <Header :eventData="eventData" @reset="reset"></Header>
        <!--  -->
        <div id="main-wrap">
            <Content :eventData="eventData"></Content>
            <Summary :eventData="eventData"></Summary>
        </div>
        <!--  -->
    </section>
</template>

<script>
import Content from "./content/Content_MAIN";
import Summary from "./summary/Summary_MAIN";
import Header from "./header/Header_MAIN";
//
import handleLocalStorage from "./saveEventInLocalStorage";
export default {
    mixins: [handleLocalStorage],
    components: { Content, Summary, Header },
    data() {
        return {
            eventData: {
                title: "",
                logo: "",
                content: [],
                images: {}
            },
            //
            PROPERTY_NAME_IN_LOCAL_STORAGE: "newEvent"
        };
    },
    methods: {
        reset() {
            this.eventData = {
                title: "",
                logo: "",
                content: [],
                images: {}
            };
        }
    }
};
</script>
