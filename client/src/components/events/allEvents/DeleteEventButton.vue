<template>
    <div>
        <button class="delete" @click="showModal">Usuń</button>
        <!--  -->
        <!--  -->
        <!--  -->
        <b-modal id="confirmation-modal" class="modal" title="Potwierdzenie" hide-footer ref="confirmation_modal" size="sm">
            <p class="info">Czy na pewno chcesz skasować aktualność?</p>
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
    props: ["id"],
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
                const { API_ADDRESS, axios, id } = this;
                const token = JSON.parse(localStorage.getItem("user")).accessToken;
                const options = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const url = `${API_ADDRESS}/api/events/${id}`;
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
