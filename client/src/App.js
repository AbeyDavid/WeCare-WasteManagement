import React from "react";
import { BrowserRouter } from "react-router-dom";
import AdminRoute from "./routes/AdminRoute";
import DriverRoute from "./routes/DriverRoute";
import UserRoutes from "./routes/UserRoutes";

function App() {
    return (
        <BrowserRouter>
            <UserRoutes />
            <DriverRoute />
            <AdminRoute />
        </BrowserRouter>
    );
}

export default App;
