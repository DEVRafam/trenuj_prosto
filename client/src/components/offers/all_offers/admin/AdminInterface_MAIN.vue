<template>
    <div class="admin-main-wrap">
        <button class="toggle" @click="$refs.modal.show()">
            <b-icon icon="gear-fill"></b-icon>
        </button>
        <!--  -->
        <!--  -->
        <!--  -->
        <b-modal ref="modal" hide-footer hide-header>
            <section class="admin-interface">
                <div class="bg" :style="logo"></div>
                <!--  -->
                <header class="main-header">
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
import { mapState } from "vuex";
//
export default {
    components: { DeleteBTN, DatesEditor, ActivitiesEditor, UploadingProgress },
    props: ["offer", "logo"],
    computed: {
        ...mapState(["API_ADDRESS"]),
        //
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
        prepareDataForUploading() {
            const { API_ADDRESS, offer, dates, activities } = this;
            const token = JSON.parse(localStorage.getItem("user")).accessToken;
            //
            return {
                url: `${API_ADDRESS}/api/offer/${offer.id}`,
                data: { dates, activities },
                options: {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            };
        },
        async uploadChanges() {
            const { url, data, options } = this.prepareDataForUploading();
            //
            this.uploadingStatus = "pending";
            try {
                await this.axios.patch(url, data, options);
                setTimeout(() => {
                    this.uploadingStatus = "positive";
                }, 300);
            } catch (e) {
                setTimeout(() => {
                    this.uploadingStatus = "negative";
                }, 300);
            }
        }
    }
};
</script>
