import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdminLogin from "../compnents/adminComponents/AdminLogin";
import AdminClientView from "../pages/adminPages/AdminClientView";
import AdminDriverManagement from "../pages/adminPages/AdminDriverManagement";
import AdminHome from "../pages/adminPages/AdminHome";
import AdminServiceManagement from "../pages/adminPages/AdminServiceManagement";

function AdminValid() {
    const adminToken = useSelector((state) => state.admin.token);
    return adminToken ? <AdminHome /> : <AdminLogin />;
}

function AdminProtected() {
    const isAuth = useSelector((state) => state.admin.token);
    return isAuth ? <Outlet /> : <Navigate to="/admin" />;
}

export default function AdminRoute() {
    return (
        <div>
            <Routes>
                <Route path="/admin" exact element={<AdminValid />} />
                <Route element={<AdminProtected />}>
                    <Route path="/adminClient" exact element={<AdminClientView />} />
                    <Route path="/adminServices" exact element={<AdminServiceManagement />} />
                    <Route path="/adminDrivers" exact element={<AdminDriverManagement/>} />
                </Route>
            </Routes>
        </div>
    );
}
