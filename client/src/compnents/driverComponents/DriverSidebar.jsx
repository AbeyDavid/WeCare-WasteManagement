import React from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "../../styles/DriverStyles/DriverSidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDriverLogout } from "../../store/driverSlice";

export default function DriverSidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function driverLogout() {
        console.log("logout");
        dispatch(setDriverLogout())
        navigate("/driver/driverLogin")
    }
    return (
        <div className="sidebarBody">
            <SideNav
                className="driverSidebar"
                onSelect={(selected) => {
                    console.log(selected);
                    navigate("/driver/driver" + selected);
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="Home">
                        <NavIcon>
                            <HomeIcon />
                        </NavIcon>
                        <NavText>Home</NavText>
                    </NavItem>
                    <NavItem eventKey="Clients">
                        <NavIcon>
                            <PeopleAltIcon />
                        </NavIcon>
                        <NavText>Customers</NavText>
                    </NavItem>
                    <NavItem eventKey="Requests">
                        <NavIcon>
                            <NotificationAddIcon />
                        </NavIcon>
                        <NavText>Requests</NavText>
                    </NavItem>
                    <NavItem eventKey="Routes">
                        <NavIcon>
                            <AltRouteIcon />
                        </NavIcon>
                        <NavText>Routes</NavText>
                    </NavItem>
                    <button onClick={driverLogout} className="btn text-light">
                        <LogoutIcon />
                    </button>
                </SideNav.Nav>
            </SideNav>
        </div>
    );
}
