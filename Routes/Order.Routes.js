import express from "express";
import { OrderCreate } from "../controller/ChechOutController.js";
const orderRoute = express.Router()

orderRoute.post("/checkout",OrderCreate)
export default orderRoute