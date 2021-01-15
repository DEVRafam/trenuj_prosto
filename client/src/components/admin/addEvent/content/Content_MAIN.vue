<template>
    <section id="content">
        <ControlHeader :eventData="eventData"></ControlHeader>
        <!--  -->
        <template v-if="totalElements">
            <div class="all-fields" :key="totalElements">
                <template v-for="(item, index) in eventData.content">
                    <SingleField :item="item" :key="index + item.type" :number="index + 1" :totalElements="totalElements" :images="eventData.images" :eventData="eventData"> </SingleField>
                </template>
            </div>
        </template>
        <!--  -->
        <div class="blank-notification" v-else>
            <b-icon icon="exclamation-triangle"></b-icon>
            <h3>Aktualność jest pusta, dodaj pierwszy element!</h3>
            <ControlHeader :eventData="eventData"></ControlHeader>
        </div>
    </section>
</template>

<script>
import ControlHeader from "./ControlHeader";
import SingleField from "./single_field/SingleField_MAIN";
export default {
    components: { ControlHeader, SingleField },
    props: ["eventData"],
    computed: {
        totalElements() {
            return this.eventData.content.length;
        }
    }
    //
};
</script>
