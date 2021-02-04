<template>
    <section id="gymnastics">
        <OffersHeader></OffersHeader>
        <!--  -->
        <YTVideo></YTVideo>
        <Description></Description>
        <Kindergartens></Kindergartens>
        <!--  -->
    </section>
</template>
<script>
import Kindergartens from "./Kindergartens";
import YTVideo from "./YTVideo";
import Description from "./Description";
export default {
    components: { Kindergartens, YTVideo, Description }
};
</script>
