import { API_URL } from "@env";
import axios from "axios";
import { SignUp } from "../../../../interfaces";
import { getUser } from "../../../../services";
import { setItem } from "../../../../utils";

export const SignUpHook = async (signUp: SignUp) => {
    if (signUp.email === "" || signUp.password === "" || signUp.name === "" || signUp.lastname === "") {
        return {
            error: true,
            message: "Please fill all the fields",
        };
    }
    try {
        let response = await axios.post(API_URL + "/user", signUp)
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