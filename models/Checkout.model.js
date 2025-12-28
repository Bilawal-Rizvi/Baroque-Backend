import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {       // User ka full name
    type: String,
    required: true
  },
  email: {      // User ka email
    type: String,
    required: true
  },
  address: {    // Delivery address
    type: String,
    required: true
  },
  products: [   // Cart items array
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productimages",
        required: true
      },
      quantity: Number
    }
  ],
  totalPrice: {  // Optional: total cart price
    type: Number,
    required: true
  },
  PhoneNo:{
type: Number,
  },
  status: {      // Order status
    type: String,
    default: "Pending"
  },

},{
    timestamps:true
});

export const OrderModel=  mongoose.model("Order", orderSchema);
