const express = require('express')
const mongoose = require('mongoose')
const Product = require('../model/Product')

async function Addproduct(req, res) {
    try {
        const { name, brand, category, description, price, stock, images, sizeChart, discounts } = req.body;

        if (!name || !brand || !category || !price || !stock || !images || images.length === 0) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newProduct = new Product({
            name,
            brand,
            category,
            description,
            price,
            stock,
            images,
            sizeChart,
            discounts
        });

        // Save to database
        const savedProduct = await newProduct.save();

        return res.status(201).json({ success: true, message: "Product added successfully", product: savedProduct });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}

async function getAllproduct(req,res){
    try {
        const products = await Product.find();
        return res.status(200).json({message:products})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}
module.exports = { Addproduct,deleteProduct,updateProduct,getAllproduct };