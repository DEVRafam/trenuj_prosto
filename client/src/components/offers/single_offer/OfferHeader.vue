<template>
    <header>
        <h1 v-text="offer.destination"></h1>
        <span class="date">
            <span>Wyciaczka w dniach:</span>
            <strong v-text="offerTerm()"></strong>
        </span>
    </header>
</template>

<script>
export default {
    props: ["offer"],
    methods: {
        offerTerm() {
            if (!this.offer) return;
            const { start, end } = this.offer;
            //
            const a = val => val.slice(0, 10);
            return `${a(start)} do ${a(end)}`;
        }
    }
};
</script>
