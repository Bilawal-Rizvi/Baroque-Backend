import express from "express";
import { AllProducts, DelProdcuts, GetTotalData, Orders, SingleOrder, UpdateProduct, UpdateStatus } from "../controller/GetAdminData.js";
import { jwtVerify } from "../middlware/jwtVerify.js";
import upload from "../middlware/multer.middle.js"
import { isAdmin } from "../middlware/isAdmin.js";
const AdminRoute = express.Router()

AdminRoute.get("/totaldata",jwtVerify,isAdmin,GetTotalData)
AdminRoute.get("/Orders",jwtVerify,isAdmin,Orders)
AdminRoute.get("/single/:id",jwtVerify,isAdmin,SingleOrder)
AdminRoute.put("/update/:id",jwtVerify,isAdmin,UpdateStatus)
AdminRoute.get("/getProducts",jwtVerify,isAdmin,AllProducts)
AdminRoute.delete("/delProduct/:id",jwtVerify,isAdmin,DelProdcuts)
AdminRoute.put("/UpdateProduct/:id",jwtVerify,isAdmin,upload.array("images",5),UpdateProduct)



export default AdminRoute