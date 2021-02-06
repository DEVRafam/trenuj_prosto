<template>
    <section class="dates-editor">
        <h3>Terminy:</h3>
        <!--  -->
        <div class="table-wrap">
            <table>
                <thead>
                    <th>Start</th>
                    <th>Koniec</th>
                    <th>Wyprzedano</th>
                    <th>Skasuj</th>
                </thead>
                <tbody>
                    <template v-for="(item, index) in dates">
                        <tr :key="index">
                            <td>{{ item.start }}</td>
                            <td>{{ item.end }}</td>
                            <td>
                                <label class="checkbox-switch">
                                    <input type="checkbox" v-model="item.soldOut" />
                                    <span class="slider"></span>
                                </label>
                            </td>
                            <td>
                                <button class="delete" @click="removeSingleDate(index)"><b-icon icon="trash"></b-icon></button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <!--  -->
        <div class="add-new-date">
            <div class="single-date-wrap">
                <label for="start">Data rozpoczecia: </label>
                <b-form-datepicker v-model="start" class="mb-2 datepicker" :min="minStartDate"></b-form-datepicker>
            </div>
            <div class="single-date-wrap">
                <label for="end">Data zakonczenia: </label>
                <b-form-datepicker v-model="end" class="mb-2 datepicker" :min="start || minStartDate"></b-form-datepicker>
            </div>
            <button class="confirm" @click="addNewDate">Dodaj</button>
        </div>
    </section>
</template>

<script>
export default {
    props: ["offer", "dates"],
    computed: {
        minStartDate() {
            return new Date().toJSON().slice(0, 10);
        }
    },
    data() {
        return {
            start: "",
            end: ""
        };
    },
    methods: {
        addNewDate() {
            const { dates, end, start } = this;
            if (!start || !end) return;
            //
            dates.push({
                start,
                end,
                soldOut: false
            });
            //
            this.end = "";
            this.start = "";
        },
        removeSingleDate(index) {
            this.dates.splice(index, 1);
        }
    }
};
</script>
