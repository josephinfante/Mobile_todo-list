import { createSlice } from "@reduxjs/toolkit";

export const LoaderInitialState = {
    loading: false,
};

export const LoaderSlice = createSlice({
    name: "loader",
    initialState: LoaderInitialState,
    reducers: {
        setLoading: (state, action) => action.payload,
        resetLoading: () => LoaderInitialState,
    }
});

export const { setLoading, resetLoading } = LoaderSlice.actions;

export default LoaderSlice.reducer;