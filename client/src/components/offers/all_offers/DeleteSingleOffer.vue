<template>
    <div class="delete-offer-wrap">
        <button class="delete-offer" @click="showModal">Skasuj</button>
        <!--  -->
        <b-modal id="confirmation-modal" class="modal" title="Potwierdzenie" hide-footer ref="confirmation_modal" size="sm">
            <p class="info">Czy na pewno chcesz skasować ofertę?</p>
            <div class="buttons-wrap">
                <button class="deny" @click="hideModal">Nie</button>
                <button class="allow" @click="handleDelete">Tak</button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState(["API_ADDRESS"])
    },
    props: ["offer"],
    methods: {
        ...mapActions("admin_auth", ["deepAuthentication"]),
        //
        async handleDelete() {
            this.hideModal();
            if (!(await this.deepAuthentication())) {
                return this.$router.push("/admin/login");
            }
            //
            else {
                const { API_ADDRESS, axios, offer } = this;
                const token = JSON.parse(localStorage.getItem("user")).accessToken;
                const options = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const url = `${API_ADDRESS}/api/offer/${offer.id}`;
                //
                try {
                    await axios.delete(url, options);
                    this.$router.go();
                } catch (e) {
                    //
                }
            }
        },
        showModal() {
            this.$refs.confirmation_modal.show();
        },
        hideModal() {
            this.$refs.confirmation_modal.hide();
        }
    }
};
</script>
