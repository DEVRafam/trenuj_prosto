<template>
    <section class="logo">
        <!--  -->
        <div class="description">
            <div class="img"></div>
            <div class="text">
                <h3>trenuj prosto</h3>
                <p>trenuj prosto, trenuj stale, baw się z nami doskonale</p>
            </div>
        </div>
        <!--  -->
        <div class="left">
            <div class="route">
                <h3></h3>
                <router-link to="/gimnastyka-korektycyjna">Gimnastyka Korekcyjna</router-link>
            </div>
        </div>
        <div class="right">
            <h3></h3>
            <router-link to="/oferty">Obozy Sportowe i Tematyczne</router-link>
        </div>
    </section>
</template>

<script>
export default {
    //
    data() {
        return {
            navigationIsHidden: true
        };
    },
    //
    mounted() {
        const navigationElement = this.getAppElement();
        navigationElement.classList.add("displayNone");
        //
        window.addEventListener("scroll", () => {
            this.navigationIsHidden = scrollY < 300;
        });
    },
    methods: {
        getAppElement() {
            return document.getElementById("main-navigation");
        },
        hideNavigation(navigationElement) {
            navigationElement.classList.add("hide");
            navigationElement.classList.remove("unhide");
        },
        unhideNavigation(navigationElement) {
            navigationElement.classList.add("unhide");
            ["hide", "displayNone"].forEach(c => {
                navigationElement.classList.remove(c);
            });
        }
    },
    //
    beforeDestroy() {
        this.navigationIsHidden = false;
        // remove classess
        const navigationElement = this.getAppElement();
        ["unhide", "hide", "displayNone"].forEach(c => {
            navigationElement.classList.remove(c);
        });
    },
    //
    watch: {
        navigationIsHidden: {
            handler(val) {
                const navigationElement = this.getAppElement();
                if (val) this.hideNavigation(navigationElement);
                else this.unhideNavigation(navigationElement);
            }
        }
    }
};
</script>
