<template>
    <section id="login">
        <div id="login-form">
            <div class="logo"></div>
            <!--  -->
            <div class="field">
                <label for="email">Email:</label>
                <b-form-input :state="setInputState('email')" placeholder="Podaj adres email..." v-model="credentials.email" id="email"></b-form-input>
            </div>
            <!--  -->
            <div class="field pass">
                <label for="password">Hasło:</label>
                <b-form-input :type="hidePassword ? 'password' : 'text'" :state="setInputState('password')" placeholder="Podaj hasło..." v-model="credentials.password" id="password"></b-form-input>
                <!--  -->
                <button class="show-password" @click="togglePasswordDisplaying" :class="hidePasswordButtonClasses()">
                    <b-icon :icon="hidePassword ? 'eye' : 'eye-slash'"></b-icon>
                </button>
            </div>
            <!--  -->
            <button @click="handleLogin" class="login">Zaloguj</button>
            <!--  -->
            <div class="errors-wrap">
                <span v-text="generateErrorMessgae('email')"></span>
                <span v-text="generateErrorMessgae('password')"></span>
                <span v-text="errors.credentials"></span>
            </div>
        </div>
    </section>
</template>
<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            errors: {
                password: null,
                email: null,
                credentials: ""
            },
            credentials: {
                email: "kamil.kuzia@onet.pl",
                password: "TrenujProsto123"
            },
            hidePassword: true
        };
    },
    methods: {
        ...mapActions("admin_auth", ["login"]),
        async handleLogin() {
            const { login, credentials, errors } = this;
            // reset errors
            Object.keys(errors).forEach(key => (errors[key] = null));
            //
            const feedback = await login(credentials);
            if (feedback.result === "negative") {
                if (feedback.errors === "credentials_do_not_match") {
                    return (this.errors.credentials = "Błędne hasło lub adres email");
                } else
                    feedback.errors.forEach(singleError => {
                        const { element, ...desc } = singleError;
                        errors[element] = desc;
                    });
            } else location.reload();
        },
        setInputState(which) {
            const { [which]: element } = this.errors;
            if (element === null) return null;
            else return false;
        },
        togglePasswordDisplaying() {
            this.hidePassword = !this.hidePassword;
        },
        hidePasswordButtonClasses() {
            return this.hidePassword ? "hidden" : "unhidden";
        },
        generateErrorMessgae(field) {
            try {
                return this.errors[field].message;
            } catch (e) {
                return "";
            }
        }
    }
};
</script>
