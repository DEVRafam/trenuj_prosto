<template>
    <div class="desktop">
        <router-link to="/" class="route" :class="getClass('home')">strona główna</router-link>
        <router-link to="/oferty" class="route" :class="getClass('offer')">nasza oferta</router-link>
        <router-link to="/aktualnosci" class="route" :class="getClass('events')">aktualnosci</router-link>
        <router-link to="/instruktorzy" class="route" :class="getClass('instructors')">instruktorzy</router-link>
    </div>
</template>

<script>
export default {
    computed: {
        currentActiveRoute() {
            //
            const { name } = this.$route;
            const offersRoutesNames = ["SingleOffer", "AllOffers", "Partners", "Gymnastics"];
            const eventsRoutesNames = ["AllEvents", "SingleEvent"];
            // home
            if (name === "Home") return "home";
            // offers
            else if (offersRoutesNames.includes(name)) return "offer";
            // events
            else if (eventsRoutesNames.includes(name)) return "events";
            else if (name === "Instructors") return "instructors";
            else return "";
            // others, to do
        }
    },
    methods: {
        getClass(dest) {
            return { active: this.currentActiveRoute === dest };
        }
    }
};
</script>
