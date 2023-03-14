const Admin = require("../models/adminModel");
const User = require("../models/userModels");
const Service = require("../models/serviceModel");
const Driver = require("../models/driverModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../config/cloudinaryConfig");

module.exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email: email });
        if (!admin) {
            return res.status(200).json({ msg: "Please check the email" });
        }
        if (admin && await bcrypt.compare(password, admin.password)) {
            const token = jwt.sign(
                {
                    _id: admin._id,
                },
                process.env.JWT_SECRET_KEY
            );
            res.status(200).json({ token: token });
        } else {
            return res.status(200).json({ msg: "Please check the password" });
        }
    } catch (error) {
        console.log(error.message);
    }
};

module.exports.userDetails = async (req, res) => {
    try {
        const userDetails = await User.find();
        res.status(200).json({ users: userDetails });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports.userStatusControl = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findByIdAndUpdate({ _id: id }, [
            { $set: { is_blocked: { $cond: { if: "$is_blocked", then: false, else: true } } } },
        ]);
        res.status(200).json({ updatedUser: user });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports.addService = async (req, res) => {
    try {
        const { serviceName, serviceDetails, encodedUrl } = req.body;
        const result = await cloudinary.uploader.upload(encodedUrl);
        const service = new Service({
            serviceName: serviceName,
            serviceDetails: serviceDetails,
            image: result.secure_url,
        });
        const serviceRes = await service.save();
        res.status(200).json({ res: serviceRes });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports.getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json({ serviceData: services });
    } catch (error) {
        console.log(error.message);
    } 
};

module.exports.deleteService = async (req, res) => {
    try {
        const { id }  = req.body;
        const service = await Service.findByIdAndDelete({_id:id})
        res.status(200).json({ serviceData: service });
    } catch (error) {
        console.log(error.message);
    }
}; 

module.exports.getDrivers = async (req,res) =>{
    try {
        const driverData = await Driver.find();
        res.status(200).json({ driverData: driverData });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.getPendingDrivers = async (req,res) =>{
    try {
        const driverData = await Driver.find({status:"pending"});
        res.status(200).json({ driverData: driverData });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.driverApproval = async (req,res) =>{
    try { 
        const {id} = req.body
        const driver = await Driver.findOneAndUpdate({_id:id},{$set:{status:"active"}})
        res.status(200).json({driverData:driver})
    } catch (error) {
        console.log(error.message);
    }            
}

module.exports.rejectDriver = async (req,res) =>{
    try { 
        const {id} = req.body
        const driver = await Driver.findOneAndUpdate({_id:id},{$set:{status:"Rejected"}})
        res.status(200).json({driverData:driver})
    } catch (error) {
        console.log(error.message);
    }            
}