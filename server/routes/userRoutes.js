const express = require("express");
const { userLogin, userRegister } = require("../controller/userController");

const router = express();

router.post("/userLogin", userLogin); 
router.post("/userRegister", userRegister); 

module.exports = router;
