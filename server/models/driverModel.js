const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    experience: {
        type: String,
    },
    licence: {
        type: String,
    },
    address: {
        type: String,
    },
    picode: {
        type: String,
    },
    status: {
        type: String,
    },
});

module.exports = mongoose.model("Driver", driverSchema);
