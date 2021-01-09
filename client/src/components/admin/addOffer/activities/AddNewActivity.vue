<template>
    <div class="add-new">
        <b-form-input type="text" placeholder="Nowa atrakcja..." v-model="newActivity" :state="status"></b-form-input>
        <button @click="addNewActivity">Dodaj</button>
    </div>
</template>

<script>
export default {
    props: ["offerData"],
    data() {
        return {
            newActivity: "",
            status: null,
            //
            MIN_ACTIVITY_LENGTH: 10
        };
    },
    methods: {
        addNewActivity() {
            const { newActivity, offerData, MIN_ACTIVITY_LENGTH: min } = this;
            if (newActivity.length < min) {
                this.status = false;
            } else {
                offerData.activities.push(newActivity);
                this.newActivity = "";
                this.status = null;
            }
        }
    },
    watch: {
        newActivity(val) {
            const { status, MIN_ACTIVITY_LENGTH: min } = this;
            if (status === false && val.length >= min) this.status = true;
        }
    }
};
</script>
