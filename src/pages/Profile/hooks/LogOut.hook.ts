import { deleteItem } from "../../../utils";

export const LogOutHook = async () => {
    try {
        await deleteItem("token");
        return true;
    } catch (error: any) {
        return {
            error: true,
            message: error.response.data.message,
        };
    }
}