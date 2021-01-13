import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//
export const API_ADDRESS = "http://localhost:3000";
// modules
import admin_auth from "./admin/auth";
import admin_add_offer from "./admin/add_offer";
export default new Vuex.Store({
    state: {
        API_ADDRESS,
        OFFERS_PER_PAGE: 2
    },
    modules: {
        admin_auth,
        admin_add_offer
    }
});
