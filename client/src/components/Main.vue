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
        <!--  -->
        <footer id="main-footer">
            <h1>Footer</h1>
        </footer>
    </div>
</template>
<script>
//---
import Navigation from "./navigation/Navigation_MAIN";
import ScrollBtn from "./ScrollBtn";
export default {
    components: { Navigation, ScrollBtn },
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
