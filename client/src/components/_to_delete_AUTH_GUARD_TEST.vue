<template>
    <div>
        <h1>DOSTEP PRZYZNANY</h1>
        <button @click="logout">Wyloguj</button>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
    methods: {
        ...mapActions("admin_auth", ["logout"])
    }
};
</script>
