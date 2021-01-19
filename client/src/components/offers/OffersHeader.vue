<template>
    <section id="activities-header">
        <div class="left" :class="{ active: gymnasticIsActive }">
            <router-link to="/gimnastyka-korektycyjna">Gimnastyka Korekcyjna</router-link>
        </div>
        <div class="right" :class="{ active: !gymnasticIsActive }">
            <router-link to="/oferty">Obozy Sportowe i Tematyczne</router-link>
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        gymnasticIsActive() {
            return this.$route.name === "Gymnastics";
        }
    }
};
</script>
