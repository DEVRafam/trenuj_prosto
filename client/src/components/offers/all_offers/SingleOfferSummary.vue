<template>
    <div class="single-offer">
        <h1>oferta</h1>
        <p v-text="offer.destination"></p>
        <router-link :to="`/oferty/${offer.destination}`">Zobacz więcej</router-link>
    </div>
</template>

<script>
export default {
    props: ["offer"]
};
</script>
