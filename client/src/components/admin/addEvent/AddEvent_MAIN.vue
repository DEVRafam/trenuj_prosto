<template>
    <section id="add-event">
        <!--  -->
        <template v-if="uloadStatus === false">
            <Header :eventData="eventData" @reset="reset"></Header>
            <!--  -->
            <div id="main-wrap">
                <Content :eventData="eventData"></Content>
                <Summary :eventData="eventData"></Summary>
            </div>
        </template>
        <!--  -->
        <Uploading :eventData="eventData" v-else></Uploading>
    </section>
</template>

<script>
import Content from "./content/Content_MAIN";
import Summary from "./summary/Summary_MAIN";
import Header from "./header/Header_MAIN";
import Uploading from "./Uploading";
//
import handleLocalStorage from "./saveEventInLocalStorage";
import { mapState, mapMutations } from "vuex";
export default {
    mixins: [handleLocalStorage],
    components: { Content, Summary, Header, Uploading },
    computed: {
        ...mapState("admin_add_event", ["uloadStatus", "PROPERTY_NAME_IN_LOCAL_STORAGE", "uploadAccess"])
    },
    data() {
        return {
            eventData: {
                title: "",
                logo: "",
                content: [],
                images: {}
            }
        };
    },
    methods: {
        ...mapMutations("admin_add_event", ["setUploadStatus"]),
        reset() {
            this.eventData = {
                title: "",
                logo: "",
                content: [],
                images: {}
            };
        }
    },
    beforeDestroy() {
        this.setUploadStatus(false);
    }
};
</script>
