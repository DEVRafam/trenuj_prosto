<template>
    <div class="body" :class="item.type">
        <!--  -->
        <HeaderField v-if="item.type === 'header'" :item="item"></HeaderField>
        <TextField v-else-if="item.type === 'text'" :item="item"></TextField>
        <ImgFiled v-else-if="item.type === 'img'" :item="item" :images="images"></ImgFiled>
        <!--  -->
    </div>
</template>

<script>
//
import HeaderField from "./body_types/HeaderField";
import TextField from "./body_types/TextField";
import ImgFiled from "./body_types/ImageField";
//
export default {
    components: { HeaderField, TextField, ImgFiled },
    props: ["item", "images"]
};
</script>
