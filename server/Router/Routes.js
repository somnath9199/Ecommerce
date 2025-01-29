const express = require('express')
const userController = require('../controller/Usercontroller')
const ProductController = require('../controller/ProductController')
const Route = express.Router();

Route.get('/',userController.getHomepage);
Route.post('/Signin',userController.Signupfeature);
Route.post('/Addproduct',ProductController.Addproduct);

module.exports = Route;