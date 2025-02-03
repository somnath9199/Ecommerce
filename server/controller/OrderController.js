const mongoose = require('mongoose')
const Order = require('../model/Order')
const Product = require('../model/Product')
const User = require('../model/User')
const Cart = require('../model/Cart')
const dotenv = require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY )
async function createOrder(req, res) {
    try {
        const { userId, PaymentMethod } = req.body;

        // Check if user has products in the cart
        const isValidUser = await Cart.findOne({ user: userId });
        if (!isValidUser) {
            return res.status(400).json({ message: "Please add a product to place an order" });
        }

        // Create new order
        const newOrder = new Order({
            user: userId,
            products: isValidUser.products,
            totalAmount: isValidUser.TotalAmount, 
            paymentMethod: PaymentMethod
        });

        // Save order
        await newOrder.save();

        return res.status(201).json({ message: "Order placed successfully" }); 
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


async function getAllOrders(req, res) {
    try {
        const orders = await Order.find().populate('user').populate('products.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function getOrderById(req, res) {
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


async function updateOrderStatus(req, res) {
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

async function deleteOrder(req, res) {
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

async function Addtocart(req, res) {
    try {
        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ user: userId });
        let productdata = await Product.findById(productId);

        if (!productdata) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (productdata.stock > 0) {
            if (!cart) {
                cart = new Cart({ user: userId, products: [], TotalAmount: 0 });
            }

            const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);

            if (productIndex > -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }

            cart.TotalAmount += productdata.price;
            await Product.updateOne({ _id: productId }, { stock: productdata.stock - 1 });

            await cart.save();

            return res.status(201).json({ message: "Product added to cart", cart });
        } else {
            return res.status(400).json({ message: "Product out of stock" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function getUsercart(req, res) {
    try {
        const { userId } = req.body;
        
        const UserCartData = await Cart.findOne({ user: userId });
        if (!UserCartData) {
            return res.status(401).json({ message: "Cart is Empty" });
        }
        return res.status(200).json({ message: UserCartData })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function Checkout(req, res) {
    try {
        const { userId } = req.body;
        const isValidcart = await Cart.findOne({ user: userId });
        if (!isValidcart) {
            return res.status(400).json({ message: " Please Add product for Checkout" });
        }
        await Cart.deleteOne({ user: userId });
        return res.status(200).json({ message: "Checkout successful!" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { deleteOrder, updateOrderStatus, getOrderById, getAllOrders, createOrder, Addtocart, getUsercart, Checkout };