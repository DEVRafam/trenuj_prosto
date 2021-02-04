<template>
    <section id="admin-interface" v-if="access">
        <!--  -->
        <div class="control" @click="handleDevelop" :class="{ develop: !exit && develop }">
            <b-icon icon="person-fill"></b-icon>
        </div>
        <!--  -->
        <div class="routes-wrap" v-if="develop" :class="{ exit, develop }">
            <!--  -->
            <router-link to="/admin/dodaj-oferte">
                <b-icon icon="calendar-date"></b-icon>
                <span class="text">Dodaj oferte</span>
            </router-link>
            <!--  -->
            <router-link to="/admin/dodaj-aktualnosc">
                <b-icon icon="chat-square-text"></b-icon>
                <span class="text">Dodaj aktualność</span>
            </router-link>
            <!--  -->
            <router-link to="/admin/zmien-haslo">
                <b-icon icon="tools"></b-icon>
                <span class="text">Zmień hasło</span>
            </router-link>
            <!--  -->
            <a @click="logout">
                <b-icon icon="power"></b-icon>
                <span class="text">Wyloguj</span>
            </a>
        </div>
    </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
    methods: {
        ...mapActions("admin_auth", ["logout", "deepAuthentication"]),
        handleDevelop() {
            if (this.exit) return;
            //
            if (this.develop) {
                this.exit = true;
                setTimeout(() => {
                    this.develop = false;
                    this.exit = false;
                }, 500);
            } else this.develop = true;
        }
    },
    data() {
        return {
            develop: false,
            exit: false,
            access: true
        };
    },
    mounted() {},
    // reset develop when page is changed
    computed: {
        fullPath() {
            return this.$route.fullPath;
        }
    },
    watch: {
        fullPath: {
            immediate: true,
            async handler() {
                if (this.develop) this.handleDevelop();
                this.access = await this.deepAuthentication();
            }
        }
    }
};
</script>
