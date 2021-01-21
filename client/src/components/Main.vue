<template>
    <div id="app">
        <!--  -->
        <Navigation></Navigation>
        <!--  -->
        <main>
            <transition name="fade" mode="out-in" @beforeLeave="beforeLeave">
                <router-view :key="$route.fullPath" />
            </transition>
        </main>
        <!--  -->
        <ScrollBtn></ScrollBtn>
        <AdminInterface></AdminInterface>
        <!--  -->
        <Footer></Footer>
    </div>
</template>
<script>
//---
import Navigation from "./navigation/Navigation_MAIN";
import ScrollBtn from "./ScrollBtn";
import AdminInterface from "./admin/interface/AdminInterface_MAIN";
import Footer from "./Footer";
export default {
    components: { Navigation, ScrollBtn, AdminInterface, Footer },
    methods: {
        beforeLeave() {
            scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        }
    }
};
</script>
