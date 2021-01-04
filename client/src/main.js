import Vue from "vue";
// Styles
import "./sass/wrapper.sass";
// Components
import Main from "./components/Main.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
// Plugins
import axios from "axios";
import vueAxios from "vue-axios";
Vue.use(vueAxios, axios);
Vue.config.productionTip = false;
//
new Vue({
    router,
    store,
    render: h => h(Main)
}).$mount("#app");
