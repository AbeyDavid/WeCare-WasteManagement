import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminId: null,
    token: null,
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminLogin: (state, action) => {
            state.adminId = action.payload;
        },
        removeAdminId: (state, action) => {
            state.adminId = null;
            state.token = null;
        }
    },
});

export const {setAdminLogin,removeAdminId}= adminSlice.actions;

export default adminSlice.reducer;
