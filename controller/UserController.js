import { ProductModel } from "../models/Product.model.js";
import { User } from "../models/User.model.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const userCreate = async (req, res) => {
  //   console.log("POST body:", req.body);
  try {
    const { name, email, password ,role} = req.body;
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const create = await User.create({
      name,
      email,
      password,
      role
    });

    res.status(201).json({ message: "User created", user: create });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for email:", email);
if (!email || !password) {
  return res.status(400).json({ message: "Email and password are required" });
}
    const user = await User.findOne({ email });
    if (!user.password) {
  return res.status(500).json({
    message: "User password not found"
  });
}

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await user.isCorrectPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const accessToken = await user.generateAuthToken();
    const refreshToken = await user.generateRefreshToken();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
     sameSite: "None",  
      maxAge: 10 * 60 * 60 * 1000,
    });
     if(user.role ==="admin"){
   return  res.status(200).json({ message: "admin Login successful", user, accessToken });

     }
    res.status(200).json({ message: "Login successful", user, accessToken });
  } catch (error) {
    return res.status(500).json({ message:error.message,
    });
  }
};
export const TokenVerified = async (req, res) => {
  try {
    const user = await User.find({ _id: req.userId });
    if (!user) {
      return res.status(404).json({
        message: "User not Found",
        isValid: false,
      });
    }
    return res.status(200).json({
      message: "Token is Valid",
      isValid: true,
      user: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.log("Error in verifyUserToken :", err);
    return res.status(501).json({
      message: "Internal Server Error",
      isValid: false,
    });
  }
};

export const AddToCart = async (req, res) => {
  try {
    const id = req.params.id;
    const userid = req.body.userId;
    const quantity = req.body.count;
    //  console.log(quantity)
    //    console.log("productId:",id);
    // console.log("userId:", req.body.userId);
    if (
      !userid ||
      !id ||
      !mongoose.Types.ObjectId.isValid(userid) ||
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Ids are incorrect",
      });
    }

    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const existingProduct = user.cart.find(
      (item) => item.product.toString() === id
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      user.cart.push({
        product: id,
        quantity: quantity,
      });
    }
    await user.save();
    res.json({
      message: "product added",
      Success: true,
      cart: user.cart,
      resUser: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

export const GetCart = async (req, res) => {
  try {
    const userid = req.params.id;
    const user = await User.findById(userid).populate("cart.product");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Users Cart",
      cart: user.cart,
    });
  } catch (err) {
    res.status(501).json({
      success: false,
      message: err.message,
    });
  }
};

export const RemoveFromCart = async (req, res) => {
  try {
    const id = req.params.id;
    const userid = req.body.userId;
    //    console.log("productId:",id);
    // console.log("userId:", req.body.userId);
    // console.log(quantity)
    if (
      !userid ||
      !id ||
      !mongoose.Types.ObjectId.isValid(userid) ||
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Ids are incorrect",
      });
    }

    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const existingProduct = user.cart.find((item) => {
      if (item.product._id) {
        return item.product._id.toString() === id;
      }
      return item.product.toString() === id;
    });

    if (existingProduct) {
      existingProduct.quantity -= 1;
      user.markModified("cart");
    }

    await user.save();
    res.json({
      message: "product removed",
      Success: true,
      cart: user.cart,
      resUser: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
export const Removeitem = async (req, res) => {
  try {
    const id = req.params.id;
    const userid = req.body.userId;
    if (
      !userid ||
      !id ||
      !mongoose.Types.ObjectId.isValid(userid) ||
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Ids are incorrect",
      });
    }
    const user = await User.findById(userid);

    user.cart = user.cart.filter((item) => {
      if (item.product.id) {
        return item.product._id.toString() !== id;
      }
      return item.product._id.toString() !== id;
    });
    user.markModified("cart");
    await user.save();
    res.json({
      message: "product removed",
      Success: true,
      cart: user.cart,
      resUser: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
import jwt from "jsonwebtoken";

export const RefreshToken = async (req, res) => {
  const token = req.cookies.refreshToken; // lowercase recommended

  if (!token) {
    return res.status(401).json({ success: false, message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    if (!decoded) {
      return res.status(403).json({ success: false, message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { _id: decoded._id, email: decoded.email, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Access token refreshed",
      accessToken: newAccessToken
    });
  } catch (err) {
    res.status(403).json({ success: false, message: "Invalid refresh token" });
  }
};
