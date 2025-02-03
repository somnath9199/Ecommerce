const express = require('express')
const userController = require('../controller/Usercontroller')
const ProductController = require('../controller/ProductController');
const OrderController = require('../controller/OrderController')
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multer')
const Route = express.Router();

Route.get('/', userController.getHomepage);
Route.post('/uploadimage', upload.fields([
    { name: 'image', maxCount: 1 }
]), userController.UploadImage);
Route.post('/Signin', userController.LoginFeature);
Route.post('/Addproduct', ProductController.Addproduct);
Route.get('/getproducts',ProductController.getAllproduct);
Route.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: "You have access a protected route", user: req.user })
})
Route.post('/Addtocart', OrderController.Addtocart);
Route.post('/userCart', OrderController.getUsercart);
Route.delete('/Checkout', OrderController.Checkout);
Route.post('/PlaceOrder', OrderController.createOrder);

module.exports = Route;