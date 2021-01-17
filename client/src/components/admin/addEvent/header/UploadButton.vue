<template>
    <button class="upload" v-if="access" @click="handleUpload">Dodaj</button>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
    props: ["eventData"],
    methods: {
        ...mapMutations("admin_add_event", ["setUploadStatus"]),
        ...mapActions("admin_add_event", ["validateData", "uploadNewEvent"]),
        ...mapActions("admin_auth", ["refreshToken"]),
        //
        async handleUpload() {
            const { access, eventData, setUploadStatus, refreshToken } = this;
            if (!access) return;
            if ((await refreshToken()) === "UNAUTHORIZED") {
                return this.$router.push("/admin/login");
            }
            //
            try {
                await this.uploadNewEvent(eventData);
                setTimeout(() => setUploadStatus("positive"), 300);
            } catch (e) {
                setTimeout(() => setUploadStatus("negative"), 300);
            }
        }
    },
    data() {
        return {
            access: false
        };
    },
    watch: {
        eventData: {
            deep: true,
            immediate: true,
            async handler(val) {
                this.access = await this.validateData(val);
            }
        }
    }
};
</script>
