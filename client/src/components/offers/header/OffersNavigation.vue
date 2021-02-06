<template>
    <section id="offer-navigation">
        <router-link to="/film-promocyjny">Film promocyjny</router-link>
        <router-link to="/oferty" :class="allOffersRouteClass()">Wszystkie oferty</router-link>
        <router-link to="/wyjezdzali-z-nami">Wyjeżdżali z nami</router-link>
        <router-link to="/pliki-do-pobrania">Pliki do pobrania</router-link>
    </section>
</template>

<script>
export default {
    data() {
        const url = this.$route.name;
        return {
            url
        };
    },
    methods: {
        allOffersRouteClass() {
            if (this.$route.name === "AllOffers") {
                return ["router-link-exact-active"];
            }
        }
    }
};
</script>
