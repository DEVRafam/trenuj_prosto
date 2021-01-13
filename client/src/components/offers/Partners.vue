<template>
    <section id="partners">
        <ActivitiesHeader></ActivitiesHeader>
        <OffersNavigation></OffersNavigation>
        <div class="content">
            <template v-for="partner in partnersList">
                <div class="single-partner" :key="partner.name">
                    <div class="img" :style="getImg(partner.img)"></div>
                    <h3 v-text="partner.name"></h3>
                </div>
            </template>
        </div>
    </section>
</template>

<script>
import OffersNavigation from "./OffersNavigation";
export default {
    components: { OffersNavigation },
    data() {
        return {
            galleryPath: "",
            partnersList: [
                { name: "Beskid Tokarnia", img: "Beskid_Tokarnia.png" },
                { name: "Błękitni Korytów", img: "Błękitni_Korytów.png" },
                { name: "Demuto SPORT Zbigniew Wiśnioch", img: "Demuto_SPORT_Zbigniew_Wiśnioch.jpg" },
                { name: "Forteca Świerklany", img: "Forteca_Świerklany.jpg" },
                { name: "Master Dance Academy Szkoła Tańca", img: "Master_Dance_Academy_Szkoła_Tańca.jpg" },
                { name: "MKS Piast Piastów", img: "MKS_Piast_Piastów.jpg" },
                { name: "MKS Polonia Świdnica Akrobatyka Sportowa", img: "MKS_Polonia_Świdnica_Akrobatyka_Sportowa.jpg" },
                { name: "ROW Rybnik Piłka nożna kobiet", img: "ROW Rybnik_Piłka_nożna_kobiet.jpg" },
                { name: "Szkoła Akrobatyki Sportowej 9 Wałbrzych", img: "Szkoła_Akrobatyki_Sportowej_9_Wałbrzych.png" },
                { name: "Szkoła Piłki Nożnej 9 Wałbrzych", img: "Szkoła_Piłki_Nożnej_9_Wałbrzych.png" },
                { name: "TKS Skawinka Skawina", img: "TKS_Skawinka_Skawina.png" },
                { name: "TS Falenica", img: "TS_Falenica.png" },
                { name: "Young Champions Płock", img: "Young_Champions_Płock.jpg" }
            ]
        };
    },
    methods: {
        getImg(img) {
            return `background-image: url('/img/partners/${img}')`;
        }
    }
};
</script>
