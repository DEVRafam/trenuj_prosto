<template>
    <div class="mobile">
        <!-- OPEN BUTTON -->
        <span class="open-mobile-menu" :class="{ active: isDeveloped }" @click="isDeveloped = !isDeveloped">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
        </span>
        <!--  -->
        <div class="content" :class="{ developed: isDeveloped }">
            <router-link to="/" class="route">strona główna</router-link>
            <router-link to="/oferty" class="route">nasza oferta</router-link>
            <router-link to="/aktualnosci" class="route">aktualnosci</router-link>
            <router-link to="/instruktorzy" class="route">instruktorzy</router-link>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        path() {
            return this.$route.fullPath;
        }
    },
    data() {
        return {
            isDeveloped: false,
            scrollTo: false
        };
    },
    watch: {
        isDeveloped: {
            immediate: true,
            handler(val) {
                if (val) {
                    document.body.style.top = `-${scrollY}px`;
                    this.scrollTo = scrollY;
                    document.body.style.position = "fixed";
                } else {
                    document.body.style.position = "static";
                    scrollTo(0, this.scrollTo);
                }
            }
        },
        path: {
            immediate: true,
            handler() {
                this.isDeveloped = false;
            }
        }
    }
};
</script>
