import React from "react";
import ListIcon from "@mui/icons-material/List";
import "../styles/AdminStyles/adminSidebar.css";
import { useDispatch } from "react-redux";
import { removeAdminId } from "../store/adminSlice";
export default function AdminSidebar() {
    const dispatch = useDispatch();
    const logOut = ()=>{
        dispatch(removeAdminId())
    }
    return (
        <div className="adminSidebar">
            <button
                class="btn btn-white"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasWithBothOptions"
                aria-controls="offcanvasWithBothOptions"
            >
                <ListIcon sx={{ color: "#ff3478" }} />
            </button>

            <div
                class="offcanvas offcanvas-start"
                data-bs-scroll="true"
                tabindex="-1"
                id="offcanvasWithBothOptions"
                aria-labelledby="offcanvasWithBothOptionsLabel"
            >
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
                        WeCare
                    </h5>
                    <button type="button" class="btn-close " data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body custom-bg-color">
                    <div className="driverOptions">
                        <button class="btn">
                            <h6 class="text-white">Admin Home</h6>
                        </button>
                    </div>
                    <div className="driverOptions">
                        <button class="btn">
                            <h6 class="text-white">Clients</h6>
                        </button>
                    </div>
                    <div className="driverOptions">
                        <button class="btn">
                            <h6 class="text-white">Drivers</h6>
                        </button>
                    </div>
                    <div className="driverOptions">
                        <button class="btn">
                            <h6 class="text-white">Services</h6>
                        </button>
                    </div>
                    <div className="driverOptions">
                        <button class="btn">
                            <h6 class="text-white">Requests</h6>
                        </button>
                    </div>
                </div>
            </div>
            <h5 class="text-danger">Admin Dashboard</h5>
            <div>
                <button class="btn btn-danger" onClick={logOut}>Logout</button>
            </div>
        </div>
    );
}
