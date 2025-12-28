import express from "express";
import {
  userCreate,
  login,
  TokenVerified,
  AddToCart,
  GetCart,
  RemoveFromCart,
  Removeitem,
  RefreshToken,
} from "../controller/UserController.js";
import { jwtVerify } from "../middlware/jwtVerify.js";
const UserRoutes = express.Router();
UserRoutes.post("/mainlogin", login);
UserRoutes.post("/r", userCreate);
UserRoutes.post("/verify-Token", jwtVerify, TokenVerified);
UserRoutes.put("/addproduct/:id", AddToCart);
UserRoutes.get("/getCart/:id",GetCart)
UserRoutes.get("/refreshtoken",RefreshToken)
UserRoutes.delete("/RemoveCart/:id",RemoveFromCart)
UserRoutes.delete("/Removeitem/:id",Removeitem)
export { UserRoutes };
