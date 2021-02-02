<template>
    <section id="gymnastics">
        <OffersHeader></OffersHeader>
        <!--  -->
        <h1>Zaufały nam następujące przedszkola:</h1>
        <Kindergartens></Kindergartens>
        <YTVideo></YTVideo>
        <!--  -->
    </section>
</template>
<script>
import Kindergartens from "./Kindergartens";
import YTVideo from "./YTVideo";
export default {
    components: { Kindergartens, YTVideo }
};
</script>
