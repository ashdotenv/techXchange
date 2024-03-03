// export environment variable to be showup globally ony IDE
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const CLOUDINARY_API_SECRET=process.env.CLOUDINARY_API_SECRET ;
const CLOUDINARY_API_KEY=process.env.CLOUDINARY_API_KEY;
const CLOUD_NAME=process.env.CLOUD_NAME;
module.exports = { JWT_SECRET, COOKIE_SECRET, PORT, DB_URI,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUD_NAME };

