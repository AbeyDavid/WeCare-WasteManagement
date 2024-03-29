import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from 'redux-persist/es/persistStore';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistStore(store)}>
                <App />
            </PersistGate>
        </Provider>
);
