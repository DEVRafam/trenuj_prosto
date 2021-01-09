<template>
    <div class="field destination">
        <label for="destination">Kierunek wycieczki:</label>
        <b-form-input type="text" id="destination" placeholder="Wpisz nazwe miejscowosci..." v-model="offerData.destination"></b-form-input>
    </div>
</template>

<script>
export default {
    props: ["offerData"]
};
</script>
