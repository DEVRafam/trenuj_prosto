import axios from "axios";
import { API_ADDRESS } from "../store/index";
//
export const refreshToken = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const { accessToken, refreshToken } = user;
        const { data: feedback } = await axios.post(`${API_ADDRESS}/api/auth/refresh_token`, { accessToken, refreshToken });
        // update access token
        user.accessToken = feedback.accessToken;
        localStorage.setItem("user", JSON.stringify(user));
        //
        return "AUTHORIZED";
    } catch (e) {
        localStorage.setItem("user", JSON.stringify({}));
        return "UNAUTHORIZED";
    }
};
export const deepUserAuthorization = async (to, from, next) => {
    const response = await refreshToken();
    if (response === "AUTHORIZED") next();
    else next("/");
};
//
export const unauthorized = (to, from, next) => {
    const user = localStorage.getItem("user");
    if (["{}", null].includes(user)) next();
    else next("/");
};
