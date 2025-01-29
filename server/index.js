const express = require('express')
const dotenv = require('dotenv').config()
const dbconnection = require('./config/dbconnection')
const Route = require('./Router/Routes')
const app= express();


//middlewares
app.use(express.json());
app.use('/v2/api',Route);

//dbconnection
dbconnection();

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server running at port ${process.env.PORT}`);
})
