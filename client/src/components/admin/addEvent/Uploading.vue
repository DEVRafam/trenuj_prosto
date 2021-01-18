<template>
    <section id="uploading" class="stage">
        <!--  -->
        <div class="pending status" v-if="uloadStatus === 'pending'">
            <b-icon icon="arrow-counterclockwise" animation="spin-reverse"></b-icon>
            <h2>Aktualność jest dodawana, proszę czekać...</h2>
        </div>
        <!--  -->
        <div class="status error" v-if="uloadStatus === 'negative'">
            <h2 class="status">Coś poszło nie tak !</h2>
            <h2>Sprawdź dokładnie, czy wypełniłeś wszystkie pola, jeżeli tak to spróbuj się wylogować i zalogować ponownie</h2>
            <div class="btn-wrap">
                <button @click="logout">Wyloguj</button>
                <button @click="setUploadStatus(false)">Powrót</button>
            </div>
        </div>
        <!--  -->
        <div class="status positive" v-if="uloadStatus === 'positive'">
            <b-icon icon="check-circle"></b-icon>
            <h2>
                <span class="green">Aktualność</span>
                <span> została dodana pomyślnie!</span>
            </h2>
            <router-link :to="newEventPath()">Przejdź do oferty</router-link>
        </div>
    </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
    props: ["eventData"],
    computed: {
        ...mapState("admin_add_event", ["uloadStatus"])
    },
    methods: {
        ...mapActions("admin_auth", ["logout"]),
        ...mapMutations("admin_add_event", ["setUploadStatus"]),
        newEventPath() {
            return `/aktualnosci/${this.eventData.title}`;
        }
    }
};
</script>
