<template>
    <section id="describe">
        <div class="content">
            <!-- FORM -->
            <Destination :offerData="offerData"></Destination>
            <Times :offerData="offerData"></Times>
            <Description :offerData="offerData"></Description>
            <Price :offerData="offerData"></Price>
            <!--  -->
        </div>
    </section>
</template>

<script>
import Times from "./OfferTimes";
import Description from "./OfferDescription";
import Destination from "./OfferDestination";
import Price from "./OfferPrice";
//
export default {
    components: { Times, Description, Destination, Price },
    props: ["offerData"]
};
</script>
