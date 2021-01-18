<template>
    <!--  -->
    <div class="single-event">
        <DeleteBtn v-if="auth" :id="item.id"></DeleteBtn>
        <span class="date" v-text="generateDate(item)"></span>
        <div class="logo" :style="getLogo(item) | bgIMGStyle"></div>
        <h3 v-text="item.title"></h3>
        <router-link :to="generateRouterPath(item)">Zobacz wiecej</router-link>
    </div>
    <!--  -->
</template>

<script>
import helpers from "../all_events_mixin";
import { mapState } from "vuex";
import DeleteBtn from "./DeleteEventButton";
//
export default {
    computed: {
        ...mapState(["API_ADDRESS"])
    },
    components: { DeleteBtn },
    props: ["item", "auth"],
    mixins: [helpers]
};
</script>
