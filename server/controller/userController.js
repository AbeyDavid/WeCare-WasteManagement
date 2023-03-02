const User = require("../models/userModels");
const bcrypt = require("bcrypt");

module.exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        
    } catch (error) {
        console.log(error.message);
    }
};

module.exports.userRegister = async (req, res) => {
    const { userName, email, mobile, password } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            userName: userName,
            email: email,
            mobile: mobile,
            password: passwordHash,
        });
        const userData = await user.save();
        console.log(userData);
    } catch (error) {
        console.log(error.message);
    }
};
