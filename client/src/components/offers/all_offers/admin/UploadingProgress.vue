<template>
    <section class="uploading">
        <!--  -->
        <div class="pending status" :class="{ active: uploadingStatus === 'pending' }">
            <b-icon icon="arrow-counterclockwise" animation="spin-reverse"></b-icon>
            <h2>Zmiany są dodawane, proszę czekać...</h2>
        </div>
        <!--  -->
        <div class="status error" :class="{ active: uploadingStatus === 'negative' }">
            <h2 class="status">Coś poszło nie tak !</h2>
            <h2>Sprawdź dokładnie, czy wypełniłeś wszystkie pola, jeżeli tak to spróbuj się wylogować i zalogować ponownie</h2>
            <div class="btn-wrap">
                <button @click="logout">Wyloguj</button>
                <button @click="goBack">Powrót</button>
            </div>
        </div>
        <!--  -->
        <div class="status positive" :class="{ active: uploadingStatus === 'positive' }">
            <b-icon icon="check-circle"></b-icon>
            <h2>
                <span class="green">Oferta</span>
                <span> została zaktualizowana pomyślnie!</span>
            </h2>
            <router-link :to="pathToOffer()">Przejdź do oferty</router-link>
        </div>
    </section>
</template>

<script>
import { mapActions } from "vuex";
//
export default {
    props: ["uploadingStatus", "offer"],
    methods: {
        ...mapActions("admin_auth", ["logout"]),
        pathToOffer() {
            return `/oferty/${this.offer.slug}`;
        },
        goBack() {
            this.$emit("change-status", false);
        }
    }
};
</script>
