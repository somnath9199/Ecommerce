const dotenv = require('dotenv').config();
const { v2: cloudinary } = require('cloudinary');
async function connectcloudinry() {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUDNAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        })
        console.log("Cloudinary connected Succesfully!!");
    } catch (error) {
        console.log("Cloduinary disconeected")
    }

}

module.exports = connectcloudinry;