import { configureStore } from "@reduxjs/toolkit";
import { User } from "../interfaces";
import { UserSlice } from "./states";

export interface AppStore {
    // Add your state here
    user: User;
}

export const store = configureStore<AppStore>({
    reducer: {
        // Add your reducers here
        user: UserSlice
    },
});