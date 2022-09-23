import { Task } from "../../../interfaces";
import { createTask } from "../../../services";

export const CreateTaskHook = async (task: Task) => {
    try {
        let response = await createTask(task);
        return response;
    } catch (error: any) {
        return {
            error: true,
            message: error.response.data.message,
        };
    }
}