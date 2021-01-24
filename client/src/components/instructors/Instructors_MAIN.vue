<template>
    <section id="instructors">
        <Logo></Logo>
        <Navigation :instructor="instructor" @change-instructor="val => (instructor = val)"></Navigation>
        <DisplayQualifications :instructor="instructor"></DisplayQualifications>
    </section>
</template>
<script>
import Logo from "./InstructorsLogo";
import DisplayQualifications from "./DIsplayQualifications";
import Navigation from "./InstructorsNavigation";
export default {
    components: { Logo, DisplayQualifications, Navigation },
    //
    data() {
        return {
            instructor: "kamil"
        };
    },
    //
    mounted() {
        const { name } = this.$route.query;
        //
        if (["arek", "kamil"].includes(name)) {
            this.instructor = name;
        } else {
            this.instructor = "kamil";
        }
    }
    //
};
</script>
