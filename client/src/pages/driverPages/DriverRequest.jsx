import React from "react";
import { useSelector } from "react-redux";
import DriverSidebar from "../../compnents/driverComponents/DriverSidebar";
export default function DriverRequest() {
    const driver = useSelector((state)=>state.driver.driverData)
    return (
        <div class="container d-flex justify-content-center">
            <div class="row">
                <DriverSidebar />
                <h3>Notifications</h3>
                {driver.status==="pending" &&
                <div class="alert alert-success mt-5">
                    <strong class="default">
                        <i class="fa fa-road"></i> Hi {driver.name},
                    </strong>{" "}
                    Your Request Has been Recived.Please Wait for The Response
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                        
                    </button>
                </div
                >
                }
                {driver.status==="active" &&
                <div class="alert alert-success mt-5">
                    <strong class="default">
                        <i class="fa fa-road"></i> Hi {driver.name},
                    </strong>{" "}
                    Congratulations. You Are Selected As Our Employee
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                        
                    </button>
                </div
                >
                }
            </div>
        </div>
    );
}
