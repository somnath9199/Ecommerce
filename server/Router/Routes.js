const express = require('express')
const userController = require('../controller/Usercontroller')
const ProductController = require('../controller/ProductController');
const OrderController = require('../controller/OrderController')
const authMiddleware = require('../middleware/authMiddleware');
const Route = express.Router();

Route.get('/',userController.getHomepage);
Route.post('/Signin',userController.LoginFeature);
Route.post('/Addproduct',ProductController.Addproduct);
Route.get('/protected',authMiddleware,(req,res)=>{
    res.json({ message:"You have access a protected route", user:req.user})
})
Route.post('/Addtocart', OrderController.Addtocart);
Route.get('/Cart',OrderController.getUsercart);
Route.delete('/Checkout',OrderController.Checkout);
Route.post('/PlaceOrder',OrderController.createOrder);

module.exports = Route;