import { getAllTasks } from "../../../services"

export const GetTasksHook = async () => {
    try {
        let response = getAllTasks();
        return response;
    } catch (error: any) {
        return {
            error: true,
            message: error.response.data.message,
        }
    }
}