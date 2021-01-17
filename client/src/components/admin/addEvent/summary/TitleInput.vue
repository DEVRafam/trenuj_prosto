<template>
    <div class="title-input">
        <label for="destination">Tytuł aktualności:</label>
        <b-form-input type="text" id="destination" placeholder="Podaj tytuł..." v-model="eventData.title"></b-form-input>
    </div>
</template>
<script>
export default {
    props: ["eventData"]
};
</script>
