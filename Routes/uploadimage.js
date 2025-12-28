import { uploadProduct , getProductData,getProductbyid } from "../controller/Product.controller.js";
import express from "express";

import upload from "../middlware/multer.middle.js"

const router = express.Router();

// multiple image upload
router.post("/upload-product", upload.array("images", 6), uploadProduct);
router.get('/images',getProductData)
router.get("/images/:id",getProductbyid)
export default router;
