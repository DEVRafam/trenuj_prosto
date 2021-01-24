<template>
    <section id="logo">
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
                <h2>Gimnastyka Korekcyjna</h2>
                <router-link to="/gimnastyka-korektycyjna">Dowiedz się więcej</router-link>
            </div>
        </div>
        <div class="right">
            <div class="route">
                <h2>Obozy Sportowe i Tematyczne</h2>
                <router-link to="/oferty">Dowiedz się więcej</router-link>
            </div>
        </div>
        <!--  -->
        <div class="navigation">
            <div class="nav-logo"></div>
            <!--  -->
            <router-link to="/" class="route active">strona główna</router-link>
            <router-link to="/oferty" class="route">nasza oferta</router-link>
            <router-link to="/aktualnosci" class="route">aktualnosci</router-link>
            <router-link to="/instruktorzy" class="route">instruktorzy</router-link>
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
            this.navigationIsHidden = scrollY < window.innerHeight - 250;
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
