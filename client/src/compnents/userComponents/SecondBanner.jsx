import { Button } from "@mui/material";
import React from "react";
import driverbanner from "../../public/images/driver.jpg";
import "../../styles/UserStyles/SecondBanner.css";
export default function SecondBanner() {
    return (
        <div class="drivercontainer">
            <div class="image-container">
                <img src={driverbanner} alt="Driver Banner" />
                <div class="content">
                    <h3>Recycle Today For A Better Tomorrow</h3>
                    <Button variant="contained" size="large">
                        Discover
                    </Button>
                </div>
            </div>
        </div>
    );
}
