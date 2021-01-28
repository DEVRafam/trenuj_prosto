import { API_ADDRESS } from "../index";
import axios from "axios";
import { refreshToken, localStorageAuthentication } from "../../router/_guards";
//

export default {
    namespaced: true,
    actions: {
        async login(_, credentials) {
            const { email, password } = credentials;
            const { data: feedback } = await axios.post(`${API_ADDRESS}/api/auth/login`, {
                email,
                password
            });
            if (feedback.result === "negative") return feedback;
            if (feedback.result === "positive") {
                delete feedback.result;
                localStorage.setItem("user", JSON.stringify(feedback));
                return { result: "positive" };
            }
        },
        async logout() {
            const reset = () => {
                localStorage.setItem("user", JSON.stringify({}));
                location.reload();
            };
            //
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const url = `${API_ADDRESS}/api/auth/logout`;
                const data = { refreshToken: user.refreshToken };
                const options = {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                };
                //
                await axios.post(url, data, options);
                reset();
            } catch (e) {
                reset();
            }
        },
        async refreshToken() {
            return await refreshToken();
        },
        async localStorageAuthentication() {
            return localStorageAuthentication();
        },
        async deepAuthentication() {
            return localStorageAuthentication() && (await refreshToken()) === "AUTHORIZED";
        }
    }
};
