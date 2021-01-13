<template>
    <div class="activities-list">
        <h3 class="price">
            <span>Cena </span>
            <strong class="price" v-text="`${price} zł`"></strong>
            <span> od osoby obejmuje: </span>
        </h3>
        <!--  -->
        <div class="activities">
            <template v-for="(activity, index) in list">
                <div class="single-activity" :key="index">
                    <b-icon icon="check"></b-icon>
                    <span class="text" v-text="activity"></span>
                </div>
            </template>
        </div>
        <!--  -->
        <h4 class="bon-payment" v-if="bon">+ Możliwość płacenia bonem turystycznym</h4>
    </div>
</template>

<script>
export default {
    props: ["offer"],
    data() {
        const { offer } = this;
        //
        const list = JSON.parse(offer.activities);
        const bon = offer.turistBonPayment == "true";
        const price = offer.price;
        //
        return {
            list,
            bon,
            price
        };
    }
};
</script>
