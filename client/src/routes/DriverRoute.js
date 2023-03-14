import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import DriverClients from "../pages/driverPages/DriverClients";
import DriverHome from "../pages/driverPages/DriverHome";
import DriverLogin from "../pages/driverPages/DriverLogin";
import DriverRequest from "../pages/driverPages/DriverRequest";
import DriverRoutes from "../pages/driverPages/DriverRoutes";
import DriverSignup from "../pages/driverPages/DriverSignup";
import "../styles/DriverStyles/DriverBody.css";

function DriverProtected() {
    const driverToken = useSelector((state) => state.driver.token);
    return driverToken ? <Outlet /> : <Navigate to="/driver/driverLogin" />;
}

function DriverValid() {
    const driverToken = useSelector((state) => state.driver.token);
    return driverToken ? <DriverHome /> : <DriverLogin />;
}

function DriverSignupValid(){
    const driverToken = useSelector((state) => state.driver.token);
    return driverToken ? <DriverHome /> : <DriverSignup />;
}

export default function DriverRoute() {
    return (
        <div className="driverBody container">
            <Routes>
                <Route path="/driver/driverLogin" element={<DriverValid />} />
                <Route path="/driver/driverSignup" element={<DriverSignupValid />} />
                <Route path="/driver/driverHome" element={<DriverValid />} />
                <Route element={<DriverProtected />}>
                    <Route path="/driver/driverClients" element={<DriverClients />} />
                    <Route path="/driver/driverRequests" element={<DriverRequest />} />
                    <Route path="/driver/driverRoutes" element={<DriverRoutes />} />
                </Route>
            </Routes>
        </div>
    );
}
