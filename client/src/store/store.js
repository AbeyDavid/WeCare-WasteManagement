import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminReducer from './adminSlice'

const persistConfig = {
    key: "persist-key",
    storage,
};

const reducers = combineReducers({
    admin: adminReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
});

export default store;
