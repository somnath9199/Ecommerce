const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    paymentId: { type: String, required: true }, 
    amount: { type: Number, required: true },
    currency: { type: String, default: "inr" }, 
    status: { type: String, enum: ["Pending", "Paid", "Failed", "Refunded"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
