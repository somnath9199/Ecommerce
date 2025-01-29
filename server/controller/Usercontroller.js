const express = require('express')
const mongoose = require('mongoose')
const User = require('../model/User')
const bcrypt = require('bcryptjs')

async function getHomepage(req,res){
res.status(200).json({"message":"Home page"});
}
//User signup functionality 

async function Signupfeature(req,res){
    try {
        const { name, email, password, phone, address} = req.body;
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ message: "Please fill all the data" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, phone, address });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}


module.exports = {getHomepage,Signupfeature}