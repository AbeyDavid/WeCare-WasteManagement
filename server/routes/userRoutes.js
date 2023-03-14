const express = require("express");
const { userLogin, userRegister, googleAuth } = require("../controller/userController");

const router = express();

router.post("/googleAuth", googleAuth);


module.exports = router;
