<template>
    <section id="wrap-uploading" class="stage">
        <div class="content">
            <!--  -->
            <div class="pending status" :class="{ active: uploadingStatus === 'pending' }">
                <b-icon icon="arrow-counterclockwise" animation="spin-reverse"></b-icon>
                <h2>Oferta jest dodawana, proszę czekać...</h2>
            </div>
            <!--  -->
            <div class="status error" :class="{ active: uploadingStatus === 'negative' }">
                <h2 class="status">Coś poszło nie tak !</h2>
                <h2>Sprawdź dokładnie, czy wypełniłeś wszystkie pola, jeżeli tak to spróbuj się wylogować i zalogować ponownie</h2>
                <div class="btn-wrap">
                    <button @click="logout">Wyloguj</button>
                    <button @click="setCurrentStage('content')">Powrót</button>
                </div>
            </div>
            <!--  -->
            <div class="status positive" :class="{ active: uploadingStatus === 'positive' }">
                <b-icon icon="check-circle"></b-icon>
                <h2>Oferta została dodana pomyślnie!</h2>
                <router-link :to="newOfferPath()">Przejdź do oferty</router-link>
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
    props: ["offerData"],
    computed: {
        ...mapState("admin_add_offer", ["uploadingStatus"])
    },
    methods: {
        ...mapActions("admin_auth", ["logout"]),
        ...mapMutations("admin_add_offer", ["setCurrentStage"]),
        newOfferPath() {
            return `/oferty/${this.offerData.destination}`;
        }
    }
};
</script>
