<template>
    <div class="field destination">
        <label for="destination">Kierunek wycieczki:</label>
        <b-form-input type="text" id="destination" placeholder="Wpisz nazwe miejscowosci..." v-model="offerData.destination"></b-form-input>
        <TextLengthTracker :min="DESTINATION_LENGTH.min" :max="DESTINATION_LENGTH.max" :val="offerData.destination"></TextLengthTracker>
    </div>
</template>
<script>
import TextLengthTracker from "../../TextLengthTracker";
import { mapState } from "vuex";
export default {
    props: ["offerData"],
    components: { TextLengthTracker },
    computed: {
        ...mapState("admin_add_offer", ["DESTINATION_LENGTH"])
    }
};
</script>
