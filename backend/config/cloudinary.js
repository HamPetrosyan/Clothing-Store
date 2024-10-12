import { v2 as cloudinery } from "cloudinary";

const connectCloudinery = async () => {
  cloudinery.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
};

export default connectCloudinery;
