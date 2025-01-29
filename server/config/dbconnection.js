const mongoose = require('mongoose')
const dotenv = require('dotenv').config();


const dbconnection = ()=>{
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log(`Mongoose connected Succesfully!!`);
    }).catch((err)=>{
        console.log("Some error occured in connecting mongoose"+err);
    })
}

module.exports = dbconnection;