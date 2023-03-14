const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: Number
    },
    photo:{
        type: String
    },
    fb_id: {
        type: String
    },
    is_blocked:{
        type: Boolean
    }
});

module.exports = mongoose.model("User", userSchema);
