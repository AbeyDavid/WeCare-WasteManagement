const User = require("../models/userModels");
const jwt = require("jsonwebtoken");

module.exports.googleAuth = async (req, res) => {
    var { userName, email, photo } = req.body;
    try {
        var user = await User.findOne({ email: email });     
        if (!user) {
            const user = new User({
                name: userName,    
                email: email,   
                photo: photo,
                is_blocked: false,
            });    
            const userData = await user.save();            
            const token = jwt.sign(
                {
                    id: userData._id,
                },
                process.env.JWT_SECRET_KEY
            );
            res.status(200).json({ userData: userData,token: token });
        } else {
            if (user.is_blocked) {
                res.status(200).json({ message: "Your Account Was Blocked" });
            } else {
                const token = jwt.sign(
                    {
                        id: user._id,
                    },
                    process.env.JWT_SECRET_KEY
                );
                res.status(200).json({ userData: user, token: token});
            }
        }
    } catch (error) {
        console.log(error.message);
    }
};


