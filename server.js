import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
import dotenv from "dotenv";

import bodyParser from "body-parser";

import cors from "cors";
import cookieParser from "cookie-parser";
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true })); // needed for form-data text fields

// parse application/json
app.use(bodyParser.json());
dotenv.config();
// CORS enable
app.use(
  cors({
    origin: "http://localhost:5173", // React ka URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // agar cookies bhejni hain
  })
);
app.use(express.json());
import "./DB/connection.js";
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/v2", (req, res) => {
  res.send("API is working v2");
});

import { UserRoutes } from "./Routes/UserRoutes.js";
import router from "./Routes/uploadimage.js";
import orderRoute from "./Routes/Order.Routes.js";
import AdminRoute from "./Routes/AdminRoutes.js";
app.use("/register", UserRoutes);
app.use("/login", UserRoutes);
app.use("/updateproduct", UserRoutes);
app.use("/Get", UserRoutes);
app.use("/Remove", UserRoutes);
app.use("/upload", router);
app.use("/getproduct", router);
app.use("/api", router);
app.use("/token", UserRoutes);
app.use("/api", orderRoute);
app.use("/admin",AdminRoute)