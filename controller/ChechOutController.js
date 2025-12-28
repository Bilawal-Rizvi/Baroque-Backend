import mongoose from "mongoose";
import { OrderModel } from "../models/Checkout.model.js";
import { User } from "../models/User.model.js";
export const OrderCreate = async (req, res) => {
  try {
    const { user, name, email, address, products, totalPrice, PhoneNo } =
      req.body;

    // 🔒 Basic validation
    if (!name || !email || !address || !products?.length) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const order = await OrderModel.create({
      user,
      name,
      email,
      address,
      products,
      totalPrice,
      PhoneNo
    });
    const CartUpdated = await User.findByIdAndUpdate(user, {
      $set: {
        cart: [],
      },
    });
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    res.status(501).json({
      success: false,
      message: err.message,
    });
  }
};
