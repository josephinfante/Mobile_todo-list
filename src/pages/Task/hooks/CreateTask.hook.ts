import { toast } from "../../../components/CustomToast/event/toast.event";
import { Task } from "../../../interfaces";
import { createTask } from "../../../services";

export const CreateTaskHook = async (task: Task) => {
    if (task.name === "") { toast.error({message: "The task should have at least a title", duration: 3000}); return }
    try {
        let response = await createTask(task);
        return response;
    } catch (error: any) {
        if (error.response.data.error) { toast.error({message: error.response.data.error, duration: 3000}); return }
    }
}