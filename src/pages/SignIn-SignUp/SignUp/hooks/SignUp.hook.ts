import axios from "axios";
import { toast } from "../../../../components/CustomToast/event/toast.event";
import { SignUp } from "../../../../interfaces";
import { setItem } from "../../../../utils";
import Constants from 'expo-constants';

const API_URL = Constants.manifest?.extra?.API_URL || "http://localhost:3000";

export const SignUpHook = async (signUp: SignUp) => {
    if (signUp.name === "") { toast.error({message: "Please fill the name field", duration: 3000}); return }
    if (signUp.lastname === "") { toast.error({message: "Please fill the lastname field", duration: 3000}); return }
    if (signUp.email === "") { toast.error({message: "Please fill the email field", duration: 3000}); return }
    if (signUp.password === "") { toast.error({message: "Please fill the password field", duration: 3000}); return }
    try {
        let response = await axios.post(API_URL + "/user", signUp)
        .then((response) => {
            if (response.data.token) {
                setItem("token", {token: response.data.token});
                return true
            }
        })
        return response
    } catch (error: any) {
        if (error.response.data.error) { toast.error({message: error.response.data.error, duration: 3000}); return }
    }
}