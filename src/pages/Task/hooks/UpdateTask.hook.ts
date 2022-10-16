import { toast } from "../../../components/CustomToast/event/toast.event";
import { Task } from "../../../interfaces";
import { updateTask } from "../../../services";

export const UpdateTaskHook = async (id: string, task: Task) => {
    if (task.name === "") { toast.error({message: "The task should have at least a title", duration: 3000}); return }
    try {
        let response = await updateTask(id, task);
        return response;
    } catch (error: any) {
        if (error.response.data.error) { toast.error({message: error.response.data.error, duration: 3000}); return }
    }
}