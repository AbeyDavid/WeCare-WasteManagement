const express = require("express");
const {
    adminLogin,
    userDetails,
    userStatusControl,
    addService,
    getServices,
    deleteService,
    driverApproval,
    getPendingDrivers,
    rejectDriver,
    getDrivers,
} = require("../controller/adminController");
const router = express();

router.post("/adminLogin", adminLogin);
router.get("/userDetails", userDetails);
router.patch("/userStatusControl", userStatusControl);
router.post("/addService", addService);
router.get("/getService", getServices);
router.post("/deleteService", deleteService);
router.get("/getDrivers", getDrivers);
router.get("/getPendingDrivers", getPendingDrivers);
router.post("/approveDriver", driverApproval);
router.post("/rejectDriver", rejectDriver);

module.exports = router;
