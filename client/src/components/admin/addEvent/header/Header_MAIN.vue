<template>
    <header id="main">
        <h1>Dodaj aktualność</h1>
        <Reset @reset="$emit('reset')"></Reset>
    </header>
</template>

<script>
import Reset from "./ResetEvent";
export default {
    components: { Reset },
    props: ["eventData"]
};
</script>
