export default {
    mounted() {
        const eventFromLocalStorage = localStorage.getItem(this.PROPERTY_NAME_IN_LOCAL_STORAGE);
        if (eventFromLocalStorage != null) {
            this.eventData = JSON.parse(eventFromLocalStorage);
            this.eventData.logo = "";
            this.eventData.images = [];
        }
    },
    watch: {
        eventData: {
            deep: true,
            handler(val) {
                localStorage.setItem(this.PROPERTY_NAME_IN_LOCAL_STORAGE, JSON.stringify(val));
            }
        }
    }
};
