const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String
    },
    serviceDetails: {
        type: String
    },
    image:{
        type: String
    }
});

module.exports = mongoose.model("Service", serviceSchema);
