import { toast } from "../../../components/CustomToast/event/toast.event";
import { deleteTask } from "../../../services";

export const DeleteTaskHook = async (id: string) => {
    try {
        let response = await deleteTask(id);
        return response;
    } catch (error: any) {
        if (error.response.data.error) { toast.error({message: error.response.data.error, duration: 3000}); return }
    }
}