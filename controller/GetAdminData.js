import mongoose from "mongoose";
import { OrderModel } from "../models/Checkout.model.js";
import { ProductModel } from "../models/Product.model.js";
import cloudinary from "../Config/cloudinary.js";
import fs from "fs"
 
export const GetTotalData = async (req, res) => {
  try {
    const TotalOrders = await OrderModel.countDocuments();
    const PendingOrder = await OrderModel.countDocuments({ status: "Pending" });
    const CompletedOrder = await OrderModel.countDocuments({
      status: "Completed",
    });
    const TotalProducts = await ProductModel.countDocuments();
    // console.log(TotalProducts)
    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: {
        PendingOrder,
        CompletedOrder,
        TotalOrders,
        TotalProducts,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
export const Orders = async (req, res) => {
  try {
    const Orders = await OrderModel.find()
      .sort({ createdAt: -1 })
      .populate("products.productId");
    res.status(200).json({
      success: true,
      message: " All Orders",
      Orders,
    });
  } catch (err) {
    res.status(501).json({
      success: false,
      message: err.message,
    });
  }
};
export const SingleOrder = async(req,res)=>{
    try{
        const {id} = req.params;
        const singleorder = await OrderModel.findById(id).populate("products.productId")
        res.status(200).json({
            success:true,
            singleorder
        })
    }catch(err){
        res.status(501).json({
            success:false,
            message:err.message
        })
    }
}
export const UpdateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findByIdAndUpdate(
      id,
      {
        status: "Completed",
      },
      { new: true }
    );


    return res.status(200).json({
      success: true,
      update: order,
      message: "User Updated ",
    });
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: err.message,
    });
  }
};
export const  AllProducts=async(req,res)=>{
  try{
  const Data = await ProductModel.find();
  res.status(200).json({
    success:true,
    message:"Data Sent",
    Data
  })
}catch(err){
  res.status(500).json({
    success:false,
    message:err.message
  })
}
}
export const DelProdcuts = async (req,res) => {
      try{
        const {id} = req.params;
        const Product = await ProductModel.findByIdAndDelete(id);
        res.status(200).json({
          success:true,
          message:"Product Deleted",
          DeletedProduct:Product
        })
      }catch(err){
        res.status(500).json({
          success:false,
          message:err.message
        })
      }
}

  export const UpdateProduct= async (req,res) => {
    try{
      const {id} = req.params;
      const {
        Title,
        Price
      } = req.body

      const UpdateData = {
        Title,
        Price
      }
      
          // agar koi file hi nahi mila
          if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Please upload at least 1 image" });
          }
      
          let imagesArray = [];
      
          // multiple images upload loop
          for (let i = 0; i < req.files.length; i++) {
            const result = await cloudinary.uploader.upload(req.files[i].path, {
              folder: "baroque_products",
            });
      
            imagesArray.push({
              ImgUrl: result.secure_url,
              public_id: result.public_id,
            });
      
            // local file delete
            fs.unlinkSync(req.files[i].path);
          }

          UpdateData.images = imagesArray
      const UpdatedProduct = await ProductModel.findByIdAndUpdate(id,
        UpdateData
        ,
      { new: true, runValidators: true }
      )
          if (!UpdatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
        res.status(200).json({
          success:true,
          message:"Product updated ",
          Product:UpdatedProduct
        })
    }catch(err){
      res.status(500).json({
        success:false,
        message:err.message
      })
    }
  }