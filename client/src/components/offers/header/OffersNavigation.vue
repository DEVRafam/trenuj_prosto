<template>
    <section id="offer-navigation">
        <router-link to="/oferty">Wszystkie oferty</router-link>
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
    }
};
</script>
