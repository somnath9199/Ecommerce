const express = require('express')
const mongoose = require('mongoose')
const bcryt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../model/User')
const dotenv = require('dotenv').config();


async function getHomepage(req, res) {
    res.status(200).json({ "message": "Home page" });
}

async function LoginFeature(req, res){
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = await bcryt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email },
            process.env.JWT_SECRET, 
            { expiresIn: "1h" } 
        );

        res.status(200).json({ message: "Login successful", token, user: existingUser });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = {LoginFeature ,getHomepage};
