const mongoose = require("mongoose");

const buyOrderSchema = new mongoose.Schema({
    email: String,
    phoneNumber: Number,
    clientName: String,
    weight: String,
    date: String,
    transporter: String,
    vehicleNumber: String,
    sandPrice: String,
    transportationPrice: String,
    orderedSandPrice: String,
    orderedTransportationPrice: String,
    status: String,
});

module.exports = mongoose.model('BuyOrder', buyOrderSchema);

