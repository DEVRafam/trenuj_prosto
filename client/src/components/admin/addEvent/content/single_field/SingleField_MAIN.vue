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
            <span class="length" v-text="generateLength()" v-if="item.type !== 'img'"></span>
        </footer>
    </div>
</template>

<script>
import SingleFieldBody from "./SingleFieldBody";
import DeleteField from "./DeleteField";
import Reorder from "./Reorder";
//
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState("admin_add_event", ["MAX_HEADER_LENGTH", "MAX_TEXT_LENGTH"])
    },
    components: { SingleFieldBody, DeleteField, Reorder },
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
        generateLength() {
            const { type, text } = this.item;
            if (type === "header") return `${text.length}/${this.MAX_HEADER_LENGTH}`;
            else if (type === "text") return `${text.length}/${this.MAX_TEXT_LENGTH}`;
            else return "";
        },
        generateOrder() {
            const { number, totalElements } = this;
            return `Element ${number} z ${totalElements}`;
        }
    }
};
</script>
