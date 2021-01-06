import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ApiTestComponent from "../components/ApiTestComponent";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/api-test",
        name: "Api test",
        component: ApiTestComponent
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
