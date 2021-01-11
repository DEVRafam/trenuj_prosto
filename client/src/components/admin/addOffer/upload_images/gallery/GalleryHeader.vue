<template>
    <header>
        <h2>Galeria zdjęć:</h2>
        <div class="wrap">
            <span class="amount wrap">Ilość zdjęć: <strong v-text="gallerySummary('amount')"></strong></span>
            <!--  -->
            <span class="size wrap">
                <span>Lączna waga:</span>
                <strong>{{ gallerySummary("size") | fileSizeUnits }}</strong>
            </span>
            <!--  -->
            <span class="average wrap">
                <span>Średnia waga: </span>
                <strong>{{ gallerySummary("average") | fileSizeUnits }}</strong>
            </span>
        </div>
    </header>
</template>

<script>
export default {
    props: ["offerData"],
    methods: {
        gallerySummary(operation) {
            const { gallery } = this.offerData;
            if (operation === "amount") return gallery.length;
            //
            else if (operation === "size") {
                let size = 0;
                gallery.forEach(element => (size += element.size));
                return size;
            }
            //
            else if (operation === "average") {
                return this.gallerySummary("size") / this.gallerySummary("amount");
            }
        }
    }
};
</script>
