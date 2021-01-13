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
//
export const localStorageAuthentication = () => {
    //
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        let result = true;
        // [propertyName,propertyLength]
        [
            ["name", 2],
            ["surname", 3],
            ["accessToken", 67],
            ["refreshToken", 67]
        ].forEach(property => {
            if (user[property[0]].length < property[1]) {
                result = false;
            }
        });
        //
        if (!result) return false;
        else return true;
        //
    } catch (e) {
        return false;
    }
};
//
export const deepUserAuthorization = async (to, from, next) => {
    if (localStorageAuthentication()) {
        const response = await refreshToken();
        if (response === "AUTHORIZED") next();
        else next("/admin/login");
    } else {
        next("/admin/login");
    }
};
//
export const unauthorized = (to, from, next) => {
    const user = localStorage.getItem("user");
    if (["{}", null].includes(user)) next();
    else next("/");
};
