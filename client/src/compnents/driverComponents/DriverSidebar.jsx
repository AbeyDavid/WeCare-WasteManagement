import React from "react";
import SideNav, { Toggle, NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "../../styles/DriverStyles/DriverSidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function DriverSidebar() {
    const navigate = useNavigate();
    function handleLogout() {
        console.log("logout");
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
                    <NavItem onClick={handleLogout}>
                        <NavIcon>
                            <LogoutIcon />
                        </NavIcon>
                        <NavText>Logout</NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </div>
    );
}
