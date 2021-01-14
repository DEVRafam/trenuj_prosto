export default {
    mounted() {
        const offerFromLocalStorage = localStorage.getItem(this.PROPERTY_NAME_IN_LOCAL_STORAGE);
        if (offerFromLocalStorage != null) {
            this.offerData = JSON.parse(offerFromLocalStorage);
            this.offerData.logo = "";
            this.offerData.gallery = [];
        }
    },
    watch: {
        offerData: {
            deep: true,
            handler(val) {
                localStorage.setItem(this.PROPERTY_NAME_IN_LOCAL_STORAGE, JSON.stringify(val));
            }
        }
    }
};
