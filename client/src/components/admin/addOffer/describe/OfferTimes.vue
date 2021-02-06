<template>
    <div class="field dates" :class="{ active: developed }">
        <div class="wrap">
            <!--  -->
            <!--  -->
            <!--  -->
            <!--  -->
            <div class="level summary">
                <div class="control">
                    <label>Terminy</label>
                    <span>Łącznie: <strong v-text="dates.length"></strong></span>
                    <button @click="developed = true">Dodaj nowy</button>
                </div>
                <!--  -->
                <div class="dates-list">
                    <template v-for="(termin, index) in dates">
                        <div class="termin-wrap" :key="index">
                            <span class="index" v-text="index + 1"></span>
                            <span class="dates">
                                <strong v-text="termin.start"></strong>
                                <span> do </span>
                                <strong v-text="termin.end"></strong>
                            </span>
                            <button @click="deleteSingleTermin(index)">X</button>
                        </div>
                    </template>
                </div>
            </div>
            <!--  -->
            <!--  -->
            <!--  -->
            <div class="level form">
                <div class="btn-wrap">
                    <label>Nowy termin</label>
                    <button @click="handleAdding">Dodaj</button>
                    <button @click="developed = false">Anuluj</button>
                </div>
                <!--  -->
                <div class="single-date-wrap">
                    <label for="start">Data rozpoczecia: </label>
                    <b-form-datepicker id="start" v-model="start" class="mb-2 datepicker" :min="minStartDate"></b-form-datepicker>
                </div>
                <div class="single-date-wrap">
                    <label for="end">Data zakonczenia: </label>
                    <b-form-datepicker id="end" v-model="end" class="mb-2 datepicker" :min="start || minStartDate"></b-form-datepicker>
                </div>
            </div>
            <!--  -->
        </div>
    </div>
</template>

<script>
export default {
    props: ["offerData"],
    computed: {
        minStartDate() {
            return new Date().toJSON().slice(0, 10);
        },
        dates() {
            return this.offerData.dates;
        }
    },
    methods: {
        handleAdding() {
            const { dates, start, end } = this;
            if (!start || !end) return;
            else {
                dates.push({
                    start,
                    end,
                    soldOut: false
                });
                this.developed = false;
                //
                this.start = "";
                this.end = "";
            }
        },
        deleteSingleTermin(index) {
            this.dates.splice(index, 1);
        }
    },
    data() {
        return {
            developed: false,
            start: "",
            end: ""
        };
    }
};
</script>
