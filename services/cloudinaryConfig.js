// IMPORT REQUIRE MODULE HERE
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY,
});
module.exports = { cloudinary };
