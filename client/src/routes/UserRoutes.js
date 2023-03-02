import React from "react";
import { Route, Routes } from "react-router-dom";
import UserHome from "../pages/userPages/UserHome";

export default function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<UserHome />} />
        </Routes>
    );
}
