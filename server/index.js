const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors');
const dbconnection = require('./config/dbconnection')
const Route = require('./Router/Routes')
const Connectcloudinary = require('./config/CloudinaryConfig')
const app= express();

//middlewares
app.use(express.json());
app.use('/v2/api',Route);
app.use(cors());

//dbconnection
dbconnection();
Connectcloudinary();

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server running at port ${process.env.PORT}`);
})
