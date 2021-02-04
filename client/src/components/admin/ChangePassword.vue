<template>
    <section id="change-password">
        <div class="form">
            <b-icon icon="tools" class="icon"></b-icon>
            <!--  -->
            <!-- INPUTS -->
            <!--  -->
            <template v-for="input in inputsList">
                <!--  -->
                <div class="field" :key="input.slug">
                    <label :for="input.slug" v-text="input.label"></label>
                    <div class="wrap">
                        <b-form-input :type="hidePassword[input.slug] ? 'password' : 'text'" :placeholder="input.placeholder" v-model="credentials[input.slug]" :id="input.slug"></b-form-input>
                        <!--  -->
                        <button class="show-password" @click="togglePasswordDisplaying(input.slug)" :class="generateButtonClasses(input.slug)">
                            <b-icon :icon="hidePassword[input.slug] ? 'eye' : 'eye-slash'"></b-icon>
                        </button>
                        <!--  -->
                    </div>
                </div>
                <!--  -->
            </template>
            <!--  -->
            <span v-text="newPasswordIssue" class="error">ERROR</span>
            <button class="change" @click="changePassword" v-if="changePasswordAccess">Zmień</button>
            <div class="button-blank-space" v-else></div>
        </div>
    </section>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["API_ADDRESS"]),
        changePasswordAccess() {
            const { newPassword, main, repeat } = this.credentials;
            let result = true;
            //
            [newPassword, main, repeat].forEach(item => {
                if (item.length < 3) result = false;
            });
            if (newPassword === main) result = false;
            //
            return result;
        }
    },
    data() {
        return {
            hidePassword: {
                main: true,
                repeat: true,
                newPassword: true
            },
            credentials: {
                main: "",
                repeat: "",
                newPassword: ""
            },
            inputsList: [
                { label: "Aktualne hasło: ", slug: "main", placeholder: "Wpisz aktualne hasło..." },
                { label: "Powtórz hasło: ", slug: "repeat", placeholder: "Potwierdź aktualne hasło..." },
                { label: "Nowe hasło: ", slug: "newPassword", placeholder: "Wpisz nowe hasło..." }
            ],
            newPasswordIssue: ""
        };
    },
    methods: {
        togglePasswordDisplaying(field) {
            this.hidePassword[field] = !this.hidePassword[field];
        },
        generateButtonClasses(field) {
            return this.hidePassword[field] ? "hidden" : "unhidden";
        },
        prepareDataForRequest() {
            const url = `${this.API_ADDRESS}/api/auth/change-password`;
            const options = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
                }
            };
            const body = {
                newPassword: this.credentials.newPassword,
                oldPassword: this.credentials.main,
                refreshToken: JSON.parse(localStorage.getItem("user")).refreshToken
            };
            return { url, options, body };
        },
        async changePassword() {
            const { url, options, body } = this.prepareDataForRequest();
            const { data } = await this.axios.post(url, body, options);
            //
            if (data.result === "negative") {
                this.newPasswordIssue = data.message;
            } else if (data.result === "positive") {
                localStorage.removeItem("user");
                this.$router.push("/admin/login");
            }
        }
    }
};
</script>
