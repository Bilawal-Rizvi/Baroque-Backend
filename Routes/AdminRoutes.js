import express from "express";
import { AllProducts, DelProdcuts, GetTotalData, Orders, SingleOrder, UpdateProduct, UpdateStatus } from "../controller/GetAdminData.js";
import { jwtVerify } from "../middlware/jwtVerify.js";
import upload from "../middlware/multer.middle.js"
const AdminRoute = express.Router()

AdminRoute.get("/totaldata",jwtVerify,GetTotalData)
AdminRoute.get("/Orders",jwtVerify,Orders)
AdminRoute.get("/single/:id",jwtVerify,SingleOrder)
AdminRoute.put("/update/:id",jwtVerify,UpdateStatus)
AdminRoute.get("/getProducts",jwtVerify,AllProducts)
AdminRoute.delete("/delProduct/:id",jwtVerify,DelProdcuts)
AdminRoute.put("/UpdateProduct/:id",jwtVerify,upload.array("images",5),UpdateProduct)



export default AdminRoute