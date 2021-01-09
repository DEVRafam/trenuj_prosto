<template>
    <div class="field times">
        <div class="single-date-wrap">
            <label for="start">Data rozpoczecia: </label>
            <b-form-datepicker id="start" v-model="offerData.start" class="mb-2 datepicker" :min="minStartDate"></b-form-datepicker>
        </div>
        <div class="single-date-wrap">
            <label for="end">Data zakonczenia: </label>
            <b-form-datepicker id="end" v-model="offerData.end" class="mb-2 datepicker" :min="offerData.start"></b-form-datepicker>
        </div>
    </div>
</template>

<script>
export default {
    props: ["offerData"],
    computed: {
        minStartDate() {
            return new Date().toJSON().slice(0, 10);
        }
    }
};
</script>
