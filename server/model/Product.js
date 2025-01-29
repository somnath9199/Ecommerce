const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: [{ type: String, required: true }],
    sizeChart: { type: String },
    discounts: { type: Number, default: 0 },
}, { timestamps: true });


const Product = mongoose.model('Product',ProductSchema);

module.exports = Product;