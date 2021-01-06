<template>
    <div>
        <h1>Status:</h1>
        <h3 v-text="message" :style="getFontColor()"></h3>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["API_ADDRESS"])
    },
    data() {
        return {
            message: "Trwa laczenie z baza...",
            result: "none"
        };
    },
    methods: {
        getFontColor() {
            let color = "black";
            const { result } = this;
            //
            if (result === "positive") color = "green";
            else if (result === "negative") color = "red";
            //
            return { color };
        }
    },
    async mounted() {
        const { axios, API_ADDRESS } = this;
        //
        try {
            this.message = JSON.stringify(await axios.get(`${API_ADDRESS}/api/users/all`));
            this.result = "positive";
        } catch (e) {
            this.message = "Nie polaczono z baza";
            this.result = "negative";
        }
    }
};
</script>
