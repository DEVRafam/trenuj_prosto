<template>
    <section id="summary">
        <TitleInput :eventData="eventData"></TitleInput>
        <LogoInput :eventData="eventData"></LogoInput>
        <FileSizes :eventData="eventData"></FileSizes>
    </section>
</template>

<script>
import TitleInput from "./TitleInput";
import LogoInput from "./LogoInput";
import FileSizes from "./FIleSizes";
//
export default {
    props: ["eventData"],
    components: { TitleInput, LogoInput, FileSizes }
};
</script>
