import { configureStore } from "@reduxjs/toolkit";
import { User } from "../interfaces";
import { LoaderSlice, UserSlice } from "./states";

export interface AppStore {
    // Add your state here
    user: User;
    loader: {loading: boolean};
}

export const store = configureStore<AppStore>({
    reducer: {
        // Add your reducers here
        user: UserSlice,
        loader: LoaderSlice
    },
});