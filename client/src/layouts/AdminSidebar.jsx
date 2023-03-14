import React from "react";
import ListIcon from "@mui/icons-material/List";
import "../styles/AdminStyles/adminSidebar.css";
import { useDispatch } from "react-redux";
import { removeAdminId } from "../store/adminSlice";
import { useNavigate } from "react-router-dom";
export default function AdminSidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOut = ()=>{
        dispatch(removeAdminId())
    }
    
    return (
        <div className="adminSidebar">
            <button
                className="btn btn-white"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasWithBothOptions"
                aria-controls="offcanvasWithBothOptions"
            >
                <ListIcon sx={{ color: "#ff3478" }} />
            </button>

            <div
                className="offcanvas offcanvas-start"
                data-bs-scroll="true"
                tabindex="-1"
                id="offcanvasWithBothOptions"
                aria-labelledby="offcanvasWithBothOptionsLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
                        WeCare
                    </h5>
                    <button type="button" className="btn-close " data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body custom-bg-color">
                    <div className="driverOptions">
                        <button className="btn" onClick={()=>{navigate("/admin")}}>
                            <h6 className="text-white">Admin Home</h6>
                        </button>
                    </div>
                    <div className="driverOptions">
                        <button className="btn" onClick={()=>{navigate("/adminClient")}}>
                            <h6 className="text-white">Clients</h6>
                        </button>
                    </div>
                    <div className="driverOptions">
                        <button className="btn" onClick={()=>{navigate("/adminDrivers")}}>
                            <h6 className="text-white">Drivers</h6>
                        </button>
                    </div>
                    <div className="driverOptions">
                        <button className="btn" onClick={()=>{navigate("/adminServices")}}>
                            <h6 className="text-white">Services</h6>
                        </button>
                    </div>
                    <div className="driverOptions">
                        <button className="btn">
                            <h6 className="text-white">Requests</h6>
                        </button>
                    </div>
                    <div className="driverOptions">
                        <button className="btn" onClick={()=>{navigate("/")}}>
                            <h6 className="text-white">Home Page</h6>
                        </button>
                    </div>
                </div>
            </div>
            <h5 className="text-danger">Admin Dashboard</h5>
            <div>
                <button className="btn btn-danger" onClick={logOut}>Logout</button>
            </div>
        </div>
    );
}
