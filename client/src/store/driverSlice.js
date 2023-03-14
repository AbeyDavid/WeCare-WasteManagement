import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    driverData:null
};

export const driverSlice = createSlice({
    name: "driver",
    initialState,
    reducers:{
        setDriverLogin: (state,action) =>{
            state.token = action.payload.token;
            state.driverData = action.payload.driverData;
        },
        setDriverLogout: (state,action) =>{
            state.token = null;
            state.driverData = null;
        }
    }
})

export const {setDriverLogin,setDriverLogout} = driverSlice.actions;
export default driverSlice.reducer;