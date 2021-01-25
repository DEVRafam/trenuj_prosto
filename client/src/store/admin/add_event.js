import axios from "axios";
import { API_ADDRESS } from "../index";
//
export default {
    namespaced: true,
    state: {
        uloadStatus: false,
        PROPERTY_NAME_IN_LOCAL_STORAGE: "newEvent",
        HEADER_LENGTH: {
            max: 250,
            min: 10
        },
        TEXT_LENGTH: {
            min: 10,
            max: 750
        },
        EVENT_TITLE_LENGTH: {
            min: 10,
            max: 60
        }
    },
    mutations: {
        setUploadStatus(state, val) {
            state.uloadStatus = val;
        }
    },
    actions: {
        async validateData({ state }, eventData) {
            const { content, logo, images, title } = eventData;
            // check whether content and logo exist
            if (content.length < 1 || !logo) return false;
            // check title length
            const { EVENT_TITLE_LENGTH: etl } = state;
            if (title.length < etl.min || title.length > etl.max) return false;
            // validate content
            let result = true;
            content.forEach(item => {
                const { type } = item;
                // validate text or header
                if (["header", "text"].includes(type)) {
                    const { text } = item;
                    const { HEADER_LENGTH, TEXT_LENGTH } = state;
                    const { min, max } = {
                        header: HEADER_LENGTH,
                        text: TEXT_LENGTH
                    }[type];
                    //
                    if (text.length < min || text.length > max) result = false;
                }
                // validate img
                else if (type === "img") {
                    const { imgIndex } = item;
                    if (!imgIndex || !images[imgIndex]) result = false;
                }
            });
            //
            return result;
        },
        async uploadNewEvent({ state, commit }, eventData) {
            commit("setUploadStatus", "pending");
            //
            const data = new FormData();
            // append title and logo
            for (let key in eventData) {
                if (!["images", "content"].includes(key)) data.append(key, eventData[key]);
            }
            const { content, images } = eventData;
            // append content
            data.append("content", JSON.stringify(content));
            // append images
            for (let imgIndex in images) {
                data.append(`image-${imgIndex}`, images[imgIndex]);
            }
            //
            const token = JSON.parse(localStorage.getItem("user")).accessToken;
            const options = {
                "content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const url = `${API_ADDRESS}/api/events/create`;
            await axios.post(url, data, options);
            localStorage.removeItem(state.PROPERTY_NAME_IN_LOCAL_STORAGE);
        }
    }
};
