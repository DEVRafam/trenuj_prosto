<template>
    <section id="files-to-download">
        <OffersHeader></OffersHeader>
        <!--  -->
        <div class="content">
            <!--  -->
            <template v-for="item in filesList">
                <div class="file-wrap" :key="item">
                    <div class="icon" :style="generateIcon(item) | bgIMGStyle"></div>
                    <h5 v-text="item"></h5>
                    <span class="download" @click="downloadSingle(item)">
                        <b-icon icon="download"></b-icon>
                    </span>
                </div>
            </template>
            <!--  -->
        </div>
    </section>
</template>

<script>
import { mapState } from "vuex";
//
export default {
    computed: {
        ...mapState(["API_ADDRESS"])
    },
    data() {
        return {
            filesList: null
        };
    },
    async mounted() {
        const { API_ADDRESS, axios } = this;
        const { data } = await axios.get(`${API_ADDRESS}/api/offer/files-to-download-list`);
        this.filesList = data;
    },
    methods: {
        generateIcon(item) {
            const ext = item.split(".")[1];
            const icon = {
                jpg: "image",
                png: "image",
                docx: "word",
                pdf: "pdf"
            }[ext];
            const result = icon ? icon : "file";
            //
            return `/img/offers/files_to_download/${result}.png`;
        },
        async downloadSingle(item) {
            //
            window.open(`${this.API_ADDRESS}/api/offer/download/${item}`);
        }
    }
};
</script>
