const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['processing', 'shipped', 'delivered', 'returned'], default: 'processing' },
    paymentMethod: { type: String, required: true },
    trackingId: { type: String },
}, { timestamps: true });


const Order = mongoose.model('Order',OrderSchema);


module.exports = Order;