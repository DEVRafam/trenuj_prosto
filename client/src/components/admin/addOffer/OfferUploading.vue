<template>
    <section id="wrap-uploading" class="stage">
        <div class="content">
            <!--  -->
            <div class="pending status" :class="{ active: uploadingStatus === 'pending' }">
                <b-icon icon="arrow-counterclockwise" animation="spin-reverse"></b-icon>
                <h2>Oferta jest dodawana, proszę czekać...</h2>
            </div>
            <!--  -->
            <div class="status error" :class="{ active: uploadingStatus === 'error' }">
                <h2 class="status">Coś poszło nie tak !</h2>
                <h2>Spróbuj się wylogować i zalogować ponownie</h2>
                <button @click="logout">Wyloguj</button>
            </div>
            <!--  -->
            <div class="status positive" :class="{ active: uploadingStatus === 'positive' }">
                <b-icon icon="check-circle"></b-icon>
                <h2>Oferta została dodana pomyślnie!</h2>
                <a>Przejdź do oferty</a>
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    computed: {
        ...mapState("admin_add_offer", ["uploadingStatus"])
    },
    methods: {
        ...mapActions("admin_auth", ["logout"])
    }
};
</script>
