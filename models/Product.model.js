
import mongoose, { Schema } from "mongoose";
import { type } from "os";

const ProductSchema = new Schema(
  {
    Title: {
        type:String,
        required:true,
        trim:true
    },
    images: [
      {
        ImgUrl: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    Price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const ProductModel =  mongoose.model("productimages",ProductSchema); 