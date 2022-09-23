import { API_URL } from "@env"
import axios from "axios"
import { getItem } from "../../utils"

axios.defaults.baseURL = API_URL || "http://localhost:3000/api"
const API = axios.create()

API.interceptors.request.use(
    async config => {
        const token = await getItem('token')
        if (token) {
            config.headers = {
                "Content-Type": "application/json",
                "Authorization": token.token
            }
            return config
        }
        return
    }, error => {
        return Promise.reject(error)
    }
)
export default API