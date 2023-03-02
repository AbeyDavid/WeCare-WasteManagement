import React from "react";
import {  Route, Routes } from "react-router-dom";
import DriverClients from "../pages/driverPages/DriverClients";
import DriverHome from "../pages/driverPages/DriverHome";
import DriverLogin from "../pages/driverPages/DriverLogin";
import DriverRequest from "../pages/driverPages/DriverRequest";
import DriverRoutes from "../pages/driverPages/DriverRoutes";
import "../styles/DriverStyles/DriverBody.css"

export default function DriverRoute() {
    return (
        <div className="driverBody">
        <Routes>
            <Route path="/driver/driverLogin" element={<DriverLogin />} />
            <Route path="/driver/driverHome" element={<DriverHome />} />
            <Route path="/driver/driverClients" element={<DriverClients />} />
            <Route path="/driver/driverRequests" element={<DriverRequest />} />
            <Route path="/driver/driverRoutes" element={<DriverRoutes />} />
        </Routes>
        </div>
    );
}
