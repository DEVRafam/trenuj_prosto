<template>
    <div>
        <button class="upload" v-if="uploadAcess" @click="uploadButtonClick">Dodaj</button>
        <!--  -->
        <b-modal id="offer-uploading-modal" title="Dodawanie oferty" ref="modal" hide-footer @ok="preventModalFromClosing">
            <h3>Trwa dodawanie nowej oferty</h3>
        </b-modal>
    </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
    props: ["offerData"],
    methods: {
        ...mapActions("admin_add_offer", ["validateOfferDataObject", "uploadNewOffer"]),
        ...mapActions("admin_auth", ["refreshToken"]),
        ...mapMutations("admin_add_offer", ["setCurrentStage", "changeUploadingStatus"]),
        //
        async uploadButtonClick() {
            const { setCurrentStage, changeUploadingStatus } = this;
            //
            // if (this.uploadAcess === false) return;
            // if ((await this.refreshToken()) === "UNAUTHORIZED") this.$router.push("/admin/login");
            //
            setCurrentStage("upload");
            try {
                await this.uploadNewOffer(this.offerData);
                setTimeout(changeUploadingStatus("positive"), 300);
            } catch (e) {
                setTimeout(changeUploadingStatus("negative"), 300);
            }
        },
        preventModalFromClosing(e) {
            console.log("dasd");
            e.preventDefault();
        }
    },
    data() {
        return {
            uploadAcess: false
        };
    },
    watch: {
        offerData: {
            deep: true,
            immediate: true,
            // async handler(val) {
            //     // this.uploadAcess = await this.validateOfferDataObject(val);
            // }
            handler() {
                this.uploadAcess = true;
            }
        }
    }
};
</script>
