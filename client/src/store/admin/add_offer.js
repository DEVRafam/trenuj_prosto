import axios from "axios";
import { API_ADDRESS } from "../index";
//
export default {
    namespaced: true,
    state: {
        galleryVisualization: [],
        logoVisualization: "",
        currentStage: "content",
        uploadingStatus: "pending",
        //
        PROPERTY_NAME_IN_LOCAL_STORAGE: "new_offer",
        DESTINATION_LENGTH: {
            min: 3,
            max: 60
        },
        DESCRIPTION_LENGTH: {
            min: 20,
            max: 1000
        },
        ACTIVITY_LENGTH: {
            min: 10,
            max: 50
        }
    },
    mutations: {
        setLogoVisualization: (state, val) => (state.logoVisualization = val),
        //
        setCurrentStage: (state, val) => (state.currentStage = val),
        // gallery
        addToGallery: (state, item) => state.galleryVisualization.push(item),
        removeFromGallery: (state, index) => {
            state.galleryVisualization.splice(index, 1);
        },
        resetGalleryVisualization: state => (state.galleryVisualization = []),
        // uploading
        changeUploadingStatus: (state, val) => (state.uploadingStatus = val)
    },
    actions: {
        validateOfferDataObject({ state }, offerData) {
            let result = true;
            // required properites
            ["logo", "start", "end", "price"].forEach(property => {
                if (!offerData[property]) result = false;
            });
            if (result === false) return false;
            // validate length of certin properties
            [
                { prop: "destination", ...state.DESTINATION_LENGTH },
                { prop: "description", ...state.DESCRIPTION_LENGTH },
                { prop: "activities", min: 1, max: 99 }
            ].forEach(propObject => {
                const { prop, min, max } = propObject;
                const { length } = offerData[prop];
                if (length < min || length > max) result = false;
            });
            //
            return result;
        },
        async uploadNewOffer({ state, commit }, offerData) {
            commit("changeUploadingStatus", "pending");
            //
            const data = new FormData();
            for (let key in offerData) {
                if (!["gallery", "activities"].includes(key)) data.append(key, offerData[key]);
            }
            //
            offerData.gallery.forEach((item, index) => {
                data.append(`gallery-item-${index}`, item);
            });
            data.append("activities", JSON.stringify(offerData.activities));
            //
            const token = JSON.parse(localStorage.getItem("user")).accessToken;
            const options = {
                "content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const url = `${API_ADDRESS}/api/offer/create`;
            await axios.post(url, data, options);
            localStorage.removeItem(state.PROPERTY_NAME_IN_LOCAL_STORAGE);
        }
    }
};
