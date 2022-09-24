import axios from "axios";
import { Login } from "../../../../interfaces";
import { setItem } from "../../../../utils";
import { getUser } from "../../../../services";
import { toast } from "../../../../components/CustomToast/event/toast.event";
import Constants from 'expo-constants';

const API_URL = Constants.manifest?.extra?.API_URL || "http://localhost:3000";

export const SignInHook = async (login: Login) => {
    if (login.email === "") { toast.error({message: "Please fill the email field", duration: 3000}); return }
    if (login.password === "") { toast.error({message: "Please fill the password field", duration: 3000}); return }
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
        if (error.response.data.error) { toast.error({message: error.response.data.error, duration: 3000}); return }
    }
}