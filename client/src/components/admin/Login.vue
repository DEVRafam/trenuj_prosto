<template>
    <section id="login" :key="`gen-${refresh}`">
        <div id="login-form">
            <!--  -->
            <div class="field">
                <label for="email">Email:</label>
                <b-form-input :state="setInputState('email')" placeholder="No validation" v-model="credentials.email"></b-form-input>
            </div>
            <!--  -->
            <div class="field">
                <label for="password">Hasło:</label>
                <b-form-input type="password" :state="setInputState('password')" placeholder="No validation" v-model="credentials.password"></b-form-input>
            </div>
            <!--  -->
            <button @click="handleLogin">Zaloguj</button>
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
                email: null
            },
            credentials: {
                email: "kacperksiazek@gmail.com",
                password: "zaq12345"
            },
            refresh: 0
        };
    },
    methods: {
        ...mapActions("admin_auth", ["login"]),
        async handleLogin() {
            const { login, credentials, errors } = this;
            // reset errors
            errors.email = null;
            errors.password = null;
            //
            const feedback = await login(credentials);
            if (feedback.result === "negative") {
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
        }
    }
};
</script>
