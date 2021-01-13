import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ApiTestComponent from "../components/ApiTestComponent";
Vue.use(VueRouter);
// routes
import admin from "./admin";
import offers from "./offers";
//
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
    },
    ...admin,
    ...offers
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
// set page title
router.beforeEach((to, from, next) => {
    // console.clear();
    const DEFAULT_PAGE_NAME = "Trenuj prosto";
    //
    let title = (to.matched[0].meta && to.matched[0].meta.title) || DEFAULT_PAGE_NAME;
    document.title = title;
    next();
});
//
export default router;
