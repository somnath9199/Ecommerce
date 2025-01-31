const express = require('express')
const userController = require('../controller/Usercontroller')
const ProductController = require('../controller/ProductController');
const authMiddleware = require('../middleware/authMiddleware');
const Route = express.Router();

Route.get('/',userController.getHomepage);
Route.post('/Signin',userController.LoginFeature);
Route.post('/Addproduct',ProductController.Addproduct);
Route.get('/protected',authMiddleware,(req,res)=>{
    res.json({ message:"You have access a protected route", user:req.user})
})

module.exports = Route;