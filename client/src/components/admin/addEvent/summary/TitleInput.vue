<template>
    <div class="title-input">
        <label for="destination">Tytuł aktualności:</label>
        <div class="wrap">
            <b-form-input type="text" id="destination" placeholder="Podaj tytuł..." v-model="eventData.title"></b-form-input>
            <TextLengthTracker :max="EVENT_TITLE_LENGTH.max" :min="EVENT_TITLE_LENGTH.min" :val="eventData.title"></TextLengthTracker>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import TextLengthTracker from "../../TextLengthTracker";

export default {
    props: ["eventData"],
    components: { TextLengthTracker },
    computed: {
        ...mapState("admin_add_event", ["EVENT_TITLE_LENGTH"])
    }
};
</script>
