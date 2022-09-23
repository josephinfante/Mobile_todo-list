import axios from "axios";
import { Login } from "../../../../interfaces";
import { API_URL } from "@env"
import { setItem } from "../../../../utils";
import { getUser } from "../../../../services";

export const SignInHook = async (login: Login) => {
    if (login.email === "" || login.password === "") {
        return {
            error: true,
            message: "Please fill all the fields",
        };
    }
    try {
        let response = await axios.post(API_URL + "/user/login", login)
        .then((response) => {
            if (response.data.token) {
                setItem("token", {token: response.data.token});
                return true
            }
        })
        return response === true ? await getUser() : null;
    } catch (error: any) {
        return {
            error: true,
            message: error.response.data.message,
        };
    }
}