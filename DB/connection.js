import mongoose from "mongoose";
mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
   
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
