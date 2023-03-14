import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminReducer from './adminSlice'
import userReducer from './userSlice'
import driverReducer from './driverSlice'

const persistConfig = {
    key: "persist-key",
    storage,
};

const reducers = combineReducers({
    admin: adminReducer,
    user: userReducer,
    driver: driverReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
});

export default store;
