const mongoose = require('mongoose')
const Order = require('../model/Order')
const Product = require('../model/Product')

// Create a new order
 async function createOrder(req, res){
    try {
        const { user, products, paymentMethod } = req.body;
        let totalAmount = 0;

        for (let item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            totalAmount += product.price * item.quantity;
        }

        const order = new Order({
            user,
            products,
            totalAmount,
            paymentMethod
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function getAllOrders (req, res){
    try {
        const orders = await Order.find().populate('user').populate('products.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function getOrderById (req, res){
    try {
        const order = await Order.findById(req.params.id).populate('user').populate('products.product');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


async function updateOrderStatus(req, res){
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = status;
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function deleteOrder (req, res){
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {deleteOrder,updateOrderStatus,getOrderById,getAllOrders,createOrder};