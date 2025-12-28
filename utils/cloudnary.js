import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "ddlmhge3o",
  api_key: process.env.CLOUD_API_KEY || "265558467241125",
  api_secret: process.env.CLOUD_API_SECRET || "<your_api_secret>", // Click 'View API Keys' above to copy your API secret
});


export const uploadToCloudinary = async (filePath) => {
    if(!filePath) return null;
    // uplodaing file to cloudinary
    try{
      const response = await  cloudinary.uploader.upload(filePath,{
            resource_type: "auto",
        })
        //file uploaded successfully
        console.log("File uploaded successfully");

    }catch(error){
        fs.unlinkSync(filePath); // delete the file from local storage
        console.error("Error uploading file to Cloudinary:", error);
        throw error;    
    }
}

