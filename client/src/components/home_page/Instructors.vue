<template>
    <section id="instructors">
        <!--  -->
        <section class="route">
            <div class="cutted-img">
                <span class="text">Instruktorzy</span>
            </div>
        </section>
        <!--  -->
        <section class="text">
            <!--  -->
            <h2>Zajęcia odbywają się pod stałym kierunkiem <strong>wyspecjalizowanych instruktorów</strong> – absolwentów Akademii Wychowania Fizycznego ze specjalizacją Gimnastyka korekcyjna.</h2>
            <!--  -->
            <p>Nasi Ambasadorzy mają doskonałe podejście do dzieci i młodzieży, dbają o bezpieczeństwo oraz uczą zasad <strong>fair play</strong> i zachęcają do aktywnego uczestnictwa w spotkaniach.</p>
            <!--  -->
            <div class="routes-wrap">
                <router-link :to="routeToObj('kamil')" class="route">Kamil Kuzia</router-link>
                <router-link :to="routeToObj('arek')" class="route">Arkadiusz Owczarczyk</router-link>
            </div>
            <!--  -->
        </section>
    </section>
</template>
<script>
export default {
    methods: {
        routeToObj(name) {
            return {
                path: "/instruktorzy",
                query: { name }
            };
        }
    }
};
</script>
