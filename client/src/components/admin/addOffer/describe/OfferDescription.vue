<template>
    <div class="field text">
        <header>
            <label for="description">Opis wycieczki:</label>
            <span class="letters">{{ offerData.description.length }}/255</span>
        </header>
        <b-form-textarea id="description" placeholder="Opis wycieczki..." v-model="offerData.description" maxlength="255"></b-form-textarea>
    </div>
</template>
<script>
export default {
    props: ["offerData"]
};
</script>
