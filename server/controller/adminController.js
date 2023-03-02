const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email: email });
        if (!admin) {
            return res.status(400).json({ msg: "Please check the email" });
        }
        if (admin && bcrypt.compare(password, admin.password)) {
            const token = jwt.sign(
                {
                    _id: admin._id,
                },
                process.env.JWT_SECRET_KEY
            );
            res.status(200).json({ token: token });
        } else {
            return res.status(400).json({ msg: "Please check the password" });
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
