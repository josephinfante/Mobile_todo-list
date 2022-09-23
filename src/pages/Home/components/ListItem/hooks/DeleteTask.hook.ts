import { deleteTask } from "../../../../../services";

export const DeleteTaskHook = async (id: string) => {
    try {
        let response = await deleteTask(id);
        return response;
    } catch (error: any) {
        return {
            error: true,
            message: error.response.data.message,
        }
    }
}