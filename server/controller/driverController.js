const Driver = require("../models/driverModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../config/cloudinaryConfig");

module.exports.driverSignup = async (req, res) => {
    const { name, age, password, email, phone, experience, address, pincode, image } = req.body;
    try {
        var driver = await Driver.findOne({ email: email });
        if (!driver) {
            const passwordHash = await bcrypt.hash(password, 10);
            const result = await cloudinary.uploader.upload(image);
            const driver = new Driver({
                name: name,
                email: email,
                licence: result.secure_url,
                age: age,
                password: passwordHash,
                phone: phone,
                experience: experience,
                address: address,
                pincode: pincode,
                status: "pending",
            });
            const driverData = await driver.save();
            delete driverData.password
            const token = jwt.sign(
                {
                    id: driverData._id,
                },
                process.env.JWT_SECRET_KEY
            );
            res.status(200).json({ driverData: driverData, token: token });
        } else {
            res.status(200).json({ errRes: "Driver With Email Already Exist" });
        }
    } catch (error) {
        console.log(error.message);
    }
};

module.exports.driverLogin = async(req,res)=>{
    const {email,password} = req.body
    try {
        const driver = await Driver.findOne({ email: email });
        if (!driver) {
            return res.status(200).json({ msg: "Please check the email" });
        }
        if (driver && await bcrypt.compare(password, driver.password)) {
            const token = jwt.sign(
                {
                    _id: driver._id,
                },
                process.env.JWT_SECRET_KEY
            );
            delete driver.password
            res.status(200).json({ token: token,driverData:driver });
        } else {
            return res.status(200).json({ msg: "Please check the password" });
        }
    } catch (error) {
        // return res.status(500).json({ msg: error.message });
        console.log(error.message);
    }
}