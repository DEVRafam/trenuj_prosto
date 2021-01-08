import Login from "../components/admin/Login";
import AuthTest from "../components/_to_delete_AUTH_GUARD_TEST";
import { deepUserAuthorization, unauthorized } from "./_guards";
//
export default [
    {
        path: "/admin/login",
        name: "Login",
        component: Login,
        meta: {
            title: "Logowanie"
        },
        beforeEnter: unauthorized
    },
    {
        path: "/admin/auth_test",
        name: "AuthTest",
        component: AuthTest,
        meta: {
            title: "AuthTest"
        },
        beforeEnter: deepUserAuthorization
    }
];
