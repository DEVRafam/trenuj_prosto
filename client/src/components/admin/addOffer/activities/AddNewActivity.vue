<template>
    <div class="add-new">
        <b-form-input type="text" placeholder="Nowa atrakcja..." v-model="newActivity" :state="status"></b-form-input>
        <button @click="addNewActivity">Dodaj</button>
        <TextLengthTracker :min="ACTIVITY_LENGTH.min" :max="ACTIVITY_LENGTH.max" :val="newActivity"></TextLengthTracker>
    </div>
</template>

<script>
import TextLengthTracker from "../../TextLengthTracker";
import { mapState } from "vuex";

export default {
    props: ["offerData"],
    data() {
        return {
            newActivity: "",
            status: null
            //
        };
    },
    components: { TextLengthTracker },
    computed: {
        ...mapState("admin_add_offer", ["ACTIVITY_LENGTH"])
    },
    methods: {
        addNewActivity() {
            const { newActivity, offerData, ACTIVITY_LENGTH } = this;
            const { min, max } = ACTIVITY_LENGTH;
            const { length } = newActivity;
            //
            if (length < min || length > max) {
                return (this.status = false);
            } else {
                offerData.activities.push(newActivity);
                this.newActivity = "";
                this.status = null;
            }
        }
    },
    watch: {
        newActivity(val) {
            const { status, ACTIVITY_LENGTH } = this;
            const { min, max } = ACTIVITY_LENGTH;
            if (status === false && val.length >= min && val.length <= max) this.status = true;
        }
    }
};
</script>
