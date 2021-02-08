export default {
    mounted() {
        let offerFromLocalStorage = localStorage.getItem(this.PROPERTY_NAME_IN_LOCAL_STORAGE);
        if (offerFromLocalStorage != null) {
            offerFromLocalStorage = JSON.parse(offerFromLocalStorage);
            ["destination", "description", "dates", "price", "activities", "turistBonPayment"].forEach(prop => {
                let val = offerFromLocalStorage[prop];
                if (val) this.offerData[prop] = val;
            });
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
