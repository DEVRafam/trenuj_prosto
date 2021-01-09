<template>
    <div class="field price">
        <div class="price">
            <label for="price">Cena [PLN]:</label>
            <b-form-input type="number" placeholder="Wpisz tutaj cene" v-model="offerData.price" :min="0" id="price"></b-form-input>
        </div>
        <div class="bon-payment">
            <label class="checkbox-switch">
                <input type="checkbox" v-model="offerData.turistBonPayment" />
                <span class="slider"></span>
            </label>
            <label for="bon" class="desc">Możliwość płacenia bonem turystycznym</label>
        </div>
    </div>
</template>

<script>
export default {
    props: ["offerData"]
};
</script>
