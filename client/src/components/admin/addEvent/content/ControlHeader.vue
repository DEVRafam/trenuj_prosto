<template>
    <header id="control">
        <span>Dodaj</span>
        <!--  -->
        <button @click="addFieldToContent('header')">Nagłówek</button>
        <button @click="addFieldToContent('text')">Pole tekstowe</button>
        <button @click="addFieldToContent('img')">Zdjęcie</button>
        <!-- hidden button for image upload-->
        <input type="file" accept="image/*" @change="handleUploadImage" ref="img-input" />
        <!--  -->
    </header>
</template>

<script>
export default {
    props: ["eventData"],
    methods: {
        addFieldToContent(type) {
            const obj = {
                type,
                text: ""
            };
            if (type === "img") {
                delete obj.text;
                this.$refs["img-input"].click();
            }
            this.eventData.content.push(obj);
        },
        handleUploadImage(e) {
            console.log(e.target.files);
        }
    }
};
</script>
