const express = require("express");
const { driverSignup, driverLogin } = require("../controller/driverController");

const router = express();

router.post("/driverSignup",driverSignup)
router.post("/driverLogin",driverLogin)


module.exports = router;