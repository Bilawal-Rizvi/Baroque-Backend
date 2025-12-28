import cloudinary from "../Config/cloudinary.js";
import { ProductModel } from "../models/Product.model.js";
import fs from "fs";

export const uploadProduct = async (req, res) => {
  try {
    const { Title, Price } = req.body;

    // agar koi file hi nahi mila
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload at least 1 image" });
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

    // Create product in database
    const createdProduct = await ProductModel.create({
      Title,
      Price,
      images: imagesArray,
    });

    res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      product: createdProduct,
    });
  } catch (error) {
    console.log("Upload Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// ✅ FIXED FUNCTION
export const getProductData = async (req, res) => {
  try {
    const images = await ProductModel.find();

    // Agar koi product nahi hai to empty array bhejo
    if (!images || images.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(images ); // ✅ Proper JSON response
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      // ✅ JSON format mein error
      message: "Failed to fetch products",
      error: err.message,
    });
  }
};

export const getProductbyid = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params);
    res.json(product);
  } catch (err) {
    res.send("Error:", err);
  }
};
