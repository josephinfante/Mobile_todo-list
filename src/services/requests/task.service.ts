import { Task } from "../../interfaces"
import API from "../provider/API"

export const createTask = async (task: Task) => {
    try {
        const response = await API.post("/task", task)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getTask = async (id: string) => {
    try {
        const response = await API.get(`/task/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateTask = async (id: string, task: Task) => {
    try {
        const response = await API.put(`/task/${id}`, task)
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteTask = async (id: string) => {
    try {
        const response = await API.delete(`/task/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getAllTasks = async () => {
    try {
        const response = await API.get("/task")
        return response.data
    } catch (error) {
        throw error
    }
}