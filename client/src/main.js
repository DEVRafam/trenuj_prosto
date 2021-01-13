import Vue from "vue";
// Styles && Filters
import "./sass/wrapper.sass";
import "./filters/index";
// Components
import Main from "./components/Main.vue";
import ActivitiesHeader from "./components/ActivitiesHeader";
Vue.component("ActivitiesHeader", ActivitiesHeader);
//
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
// Plugins
import axios from "axios";
import vueAxios from "vue-axios";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
//
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(vueAxios, axios);
//
Vue.config.productionTip = false;
//
new Vue({
    router,
    store,
    render: h => h(Main)
}).$mount("#app");
