<template>
    <section id="main-page">
        <Logo></Logo>
        <!--  -->
        <PlayWithUs ref="play"></PlayWithUs>
        <YTVideo ref="video"></YTVideo>
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
import YTVideo from "./YtVideo";
//
export default {
    components: { Logo, PlayWithUs, OurOffer, Camps, Instructors, Contact, YTVideo },
    mounted() {
        Object.keys(this.$refs).forEach(item => {
            const { $el: main } = this.$refs[item];
            const { offsetHeight } = main.previousElementSibling;
            let diff;
            if (["play", "instructors", "contact", "video", "offer"].includes(item)) {
                diff = main.offsetTop + offsetHeight / 2.5 - window.innerHeight;
            } else {
                diff = main.offsetTop + offsetHeight / 1 - window.innerHeight;
            }
            //
            const handle = () => {
                if (scrollY >= diff) main.classList.add("scroll-animation");
            };
            handle();
            window.addEventListener("scroll", handle);
        });
    }
};
</script>
