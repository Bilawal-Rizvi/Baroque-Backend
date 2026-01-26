import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./DB/connection.js";

// Routes
import { UserRoutes } from "./Routes/UserRoutes.js";
import router from "./Routes/uploadimage.js";
import orderRoute from "./Routes/Order.Routes.js";
import AdminRoute from "./Routes/AdminRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://baroque-frontend-iota.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // curl / mobile
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error("CORS not allowed"), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// Preflight for all routes
app.options(/.*/, cors({
  origin: allowedOrigins,
  credentials: true
}));
// Routes
app.get("/v2", (req, res) => res.send("API is working v2"));

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
app.use("/admin", AdminRoute);

export default app; // <-- export instead of listen
