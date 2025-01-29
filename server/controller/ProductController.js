const express = require('express')
const mongoose = require('mongoose')
const Product = require('../model/Product')// Ensure the correct path

async function Addproduct(req, res) {
    try {
        const { name, brand, category, description, price, stock, images, sizeChart, discounts } = req.body;

        if (!name || !brand || !category || !price || !stock || !images || images.length === 0) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Create new product
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

module.exports = { Addproduct };