<template>
    <section class="activities-editor">
        <header>
            <h3>Aktywności:</h3>
            <span class="amount">
                <span>łącznie </span>
                <strong v-text="activities.length"></strong>
            </span>
        </header>
        <!--  -->
        <div class="table-wrap">
            <table>
                <thead>
                    <th>Lp</th>
                    <th>Treść</th>
                    <th>Skasuj</th>
                </thead>
                <tbody>
                    <template v-for="(item, index) in activities">
                        <tr :key="index">
                            <td>{{ index + 1 }}</td>
                            <td class="text">{{ item }}</td>
                            <td>
                                <button class="delete" @click="removeSingleActivity(index)">
                                    <b-icon icon="trash"></b-icon>
                                </button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <!--  -->
        <div class="add-new-activity">
            <div class="wrap">
                <b-form-input type="text" placeholder="Nowa aktywność..." v-model="newActivity" :maxLength="ACTIVITY_LENGTH.max"></b-form-input>
                <TextLengthTracker :min="ACTIVITY_LENGTH.min" :max="ACTIVITY_LENGTH.max" :val="newActivity"></TextLengthTracker>
            </div>
            <button class="confirm" @click="addNewActivity">Dodaj</button>
        </div>
    </section>
</template>

<script>
import { mapState } from "vuex";
import TextLengthTracker from "../../../admin/TextLengthTracker";
//
export default {
    props: ["activities"],
    computed: {
        ...mapState("admin_add_offer", ["ACTIVITY_LENGTH"])
    },
    components: { TextLengthTracker },
    data() {
        return {
            newActivity: ""
        };
    },
    methods: {
        addNewActivity() {
            const { newActivity, activities, ACTIVITY_LENGTH } = this;
            const { min, max } = ACTIVITY_LENGTH;
            const { length } = newActivity;
            //
            if (length < min || length > max) {
                return;
            } else {
                activities.push(newActivity);
                this.newActivity = "";
            }
        },
        removeSingleActivity(index) {
            this.activities.splice(index, 1);
        }
    }
};
</script>
