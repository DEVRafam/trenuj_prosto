<template>
    <div class="admin-main-wrap">
        <div class="control-buttons-wrap">
            <!--  -->
            <button class="toggle" @click="$refs.modal.show()">
                <b-icon icon="gear-fill"></b-icon>
            </button>
        </div>
        <!--  -->
        <!--  -->
        <!--  -->
        <b-modal ref="modal" hide-footer hide-header>
            <section class="admin-interface">
                <!--  -->
                <header>
                    <h1>
                        <span>Zmiany w ofercie- </span>
                        <span class="color" v-text="offer.destination"></span>
                    </h1>
                    <!--  -->
                    <div class="btn-wrap">
                        <button class="update" v-if="accessToUpdate" @click="uploadChanges">Zapisz zmiany</button>
                        <DeleteBTN :offer="offer"></DeleteBTN>
                        <button @click="$refs.modal.hide()" class="closing">Zamknij</button>
                    </div>
                </header>
                <!--  -->
                <div class="content">
                    <DatesEditor :offer="offer" :dates="dates"></DatesEditor>
                    <ActivitiesEditor :offer="offer" :activities="activities"></ActivitiesEditor>
                </div>
                <!--  -->
                <UploadingProgress :uploadingStatus="uploadingStatus" :offer="offer" @change-status="val => (uploadingStatus = val)" v-if="uploadingStatus"></UploadingProgress>
            </section>
        </b-modal>
    </div>
</template>

<script>
import DeleteBTN from "./DeleteSingleOffer";
import DatesEditor from "./DatesEditor";
import ActivitiesEditor from "./ActivitiesEditor";
import UploadingProgress from "./UploadingProgress";
//
export default {
    components: { DeleteBTN, DatesEditor, ActivitiesEditor, UploadingProgress },
    props: ["offer"],
    computed: {
        accessToUpdate() {
            const { dates, offer, activities } = this;
            return JSON.stringify(dates) !== offer.dates || JSON.stringify(activities) !== offer.activities;
        }
    },
    data() {
        return {
            dates: JSON.parse(this.offer.dates),
            activities: JSON.parse(this.offer.activities),
            uploadingStatus: false
        };
    },
    methods: {
        async uploadChanges() {
            this.uploadingStatus = "pending";
        }
    }
};
</script>
