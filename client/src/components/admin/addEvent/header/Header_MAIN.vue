<template>
    <header id="main">
        <h1>Dodaj aktualność</h1>
        <Reset @reset="$emit('reset')"></Reset>
        <UploadButton :eventData="eventData"></UploadButton>
    </header>
</template>

<script>
import Reset from "./ResetEvent";
import UploadButton from "./UploadButton";
export default {
    components: { Reset, UploadButton },
    props: ["eventData"]
};
</script>
