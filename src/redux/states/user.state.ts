import { User } from "../../interfaces";
import { createSlice } from "@reduxjs/toolkit";

export const UserEmptyState: User = {
    id: "",
    name: "",
    lastname: "",
    email: "",
};

export const UserSlice = createSlice({
    name: "user",
    initialState: UserEmptyState,
    reducers: {
        createUser: (state, action) => action.payload,
        updateUser: (state, action) => ({ ...state, ...action.payload}),
        resetUser: () => UserEmptyState,
    }
});

export const { createUser, updateUser, resetUser } = UserSlice.actions;

export default UserSlice.reducer;