<template>
    <section id="main-page">
        <Logo></Logo>
        <!--  -->
        <PlayWithUs ref="play"></PlayWithUs>
        <OurOffer ref="offer"></OurOffer>
        <Camps ref="camps"></Camps>
        <Instructors ref="instructors"></Instructors>
        <Contact ref="contact"></Contact>
        <!--  -->
    </section>
</template>

<script>
import Logo from "./Logo";
import PlayWithUs from "./PlayWithUs";
import OurOffer from "./OurOffer";
import Camps from "./Camps";
import Instructors from "./Instructors";
import Contact from "./Contact";
//
export default {
    components: { Logo, PlayWithUs, OurOffer, Camps, Instructors, Contact },
    mounted() {
        Object.keys(this.$refs).forEach(item => {
            const { $el: main } = this.$refs[item];
            const { offsetHeight } = main.previousElementSibling;
            let diff;
            if (["play", "instructors", "contact"].includes(item)) {
                diff = main.offsetTop + offsetHeight / 2 - window.innerHeight;
            } else {
                diff = main.offsetTop + offsetHeight / 0.75 - window.innerHeight;
            }
            //
            window.addEventListener("scroll", () => {
                if (scrollY >= diff) main.classList.add("scroll-animation");
            });
        });
    }
};
</script>
