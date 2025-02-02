const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1, required: true },
    },
  ],
  TotalAmount:{ type:Number , required:true }

});
 
const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
