<template>
    <section id="content">
        <ControlHeader :eventData="eventData"></ControlHeader>
        <!--  -->
        <p v-text="eventData.content"></p>
    </section>
</template>

<script>
import ControlHeader from "./ControlHeader";
export default {
    components: { ControlHeader },
    props: ["eventData"]
    //
};
</script>
