import { Login, User } from "../../interfaces"
import API from "../provider/API"

export const createUser = async (user: User) => {
    try {
        const response = await API.post("/user", user)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getUser = async () => {
    try {
        const response = await API.get('/user')
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateUser = async (id: string, user: User) => {
    try {
        const response = await API.put(`/user/${id}`, user)
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteUser = async (id: string) => {
    try {
        const response = await API.delete(`/user/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}
