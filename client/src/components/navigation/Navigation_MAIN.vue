<template>
    <section id="main-navigation">
        <router-link to="/" class="logo"></router-link>
        <!--  -->
        <Desktop></Desktop>
        <Mobile></Mobile>
        <!--  -->
    </section>
</template>
<script>
import Desktop from "./Desktop";
import Mobile from "./Mobile";
//
export default {
    components: { Desktop, Mobile }
};
</script>
