<template>
    <div class="single-field">
        <header>
            <h5 class="type" v-text="generateHeader()"></h5>
            <div class="wrap">
                <Reorder :index="number - 1" :totalElements="totalElements" :eventData="eventData"></Reorder>
                <DeleteField :item="item" :eventData="eventData" :index="number - 1" :images="images"></DeleteField>
            </div>
        </header>
        <!--  -->
        <SingleFieldBody :item="item" :images="images"></SingleFieldBody>
        <!--  -->
        <footer>
            <span class="order" v-text="generateOrder()"></span>
            <TextLengthInfo :item="item" v-if="item.type !== 'img'"></TextLengthInfo>
        </footer>
    </div>
</template>

<script>
import SingleFieldBody from "./SingleFieldBody";
import DeleteField from "./DeleteField";
import Reorder from "./Reorder";
import TextLengthInfo from "./TextLengthInfo";
//
export default {
    components: { SingleFieldBody, DeleteField, Reorder, TextLengthInfo },
    props: ["item", "number", "totalElements", "images", "eventData"],
    methods: {
        generateHeader() {
            const translated = {
                img: "Zdjęcie",
                header: "Nagłówek",
                text: "Pole tekstowe"
            };
            return translated[this.item.type];
        },
        generateOrder() {
            const { number, totalElements } = this;
            return `Element ${number} z ${totalElements}`;
        }
    }
};
</script>
