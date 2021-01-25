<template>
    <div class="field text">
        <header>
            <label for="description">Opis wycieczki:</label>
            <TextLengthTracker :max="DESCRIPTION_LENGTH.max" :min="DESCRIPTION_LENGTH.min" :val="offerData.description"></TextLengthTracker>
        </header>
        <b-form-textarea id="description" placeholder="Opis wycieczki..." v-model="offerData.description" :maxlength="DESCRIPTION_LENGTH.max"></b-form-textarea>
    </div>
</template>
<script>
import TextLengthTracker from "../../TextLengthTracker";
import { mapState } from "vuex";
export default {
    props: ["offerData"],
    components: { TextLengthTracker },
    computed: {
        ...mapState("admin_add_offer", ["DESCRIPTION_LENGTH"])
    }
};
</script>
