import axios from "axios";
import { API_ADDRESS } from "../index";
//
export default {
    namespaced: true,
    state: {
        galleryVisualization: [],
        logoVisualization: "",
        currentStage: "content",
        uploadingStatus: "pending"
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
        validateOfferDataObject(module, offerData) {
            let result = true;
            // required properites
            ["logo", "start", "end", "price"].forEach(property => {
                if (!offerData[property]) result = false;
            });
            if (result === false) return false;
            // validate length of certin properties
            [
                { prop: "destination", min: 3 },
                { prop: "description", min: 20 },
                { prop: "activities", min: 1 }
            ].forEach(propObject => {
                const { prop, min } = propObject;
                if (offerData[prop].length < min) result = false;
            });
            //
            return result;
        },
        async uploadNewOffer(module, offerData) {
            //
            const data = new FormData();
            for (let key in offerData) {
                if (key !== "gallery") data.append(key, offerData[key]);
            }
            //
            offerData.gallery.forEach((item, index) => {
                data.append(`gallery-item-${index}`, item);
            });
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
        }
    }
};
