<template>
    <section id="main-navigation" ref="main">
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
    components: { Desktop, Mobile },
    computed: {
        path() {
            return this.$route.fullPath;
        }
    },
    watch: {
        path(val) {
            if (val === "/") return;
            else {
                const { main } = this.$refs;
                main.style.display = "block";
                // remove classes
                ["unhide", "hide"].forEach(c => {
                    main.classList.remove(c);
                });
            }
        }
    }
};
</script>
