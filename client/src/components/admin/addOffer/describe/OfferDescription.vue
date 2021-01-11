<template>
    <div class="field text">
        <header>
            <label for="description">Opis wycieczki:</label>
            <span class="letters">{{ offerData.description.length }}/{{ maxLength }}</span>
        </header>
        <b-form-textarea id="description" placeholder="Opis wycieczki..." v-model="offerData.description" :maxlength="maxLength"></b-form-textarea>
    </div>
</template>
<script>
export default {
    props: ["offerData"],
    data() {
        return {
            maxLength: 1000
        };
    }
};
</script>
