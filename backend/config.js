require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

module.exports = { JWT_SECRET, COOKIE_SECRET, PORT, DB_URI };
