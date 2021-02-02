<template>
    <section id="offer-header">
        <Logo></Logo>
        <Navigation v-if="displayNavigation"></Navigation>
    </section>
</template>

<script>
import Logo from "./Logo";
import Navigation from "./OffersNavigation";
export default {
    components: { Logo, Navigation },
    computed: {
        displayNavigation() {
            return !(this.$route.name === "Gymnastics");
        }
    }
};
</script>
