import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "node:path";

process.env.CLOUDINARY_CLOUD_NAME;

const storageCloudinary = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "epicode",
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLAUDINARY_API_KEY,
    api_secret: process.env.CLAUDINARY_API_SECRET,
    allowed_formats: ["jpg", "png", "jpeg", "webp", "heic"],
  },
});

const uploadCloudinary = multer({ storage: storageCloudinary });

export default uploadCloudinary;
