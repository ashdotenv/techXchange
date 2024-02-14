const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers.cookie.split("=")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    try {
      const decode = jwt.verify(token, JWT_SECRET);
      req.user = decode;
      return next();
    } catch (e) {
      return res.status(401).json({
        status: 401,
        message: "Token is invalid",
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({
      status: 401,
      message: "Something went wrong while verifying the token",
    });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin you cannot access it",
      });
    }
    return next();
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: 500,
      message: "Role is not Matching",
    });
  }
};

const isUser = (req, res, next) => {
  try {
    if (req.user.role !== "User" && req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Users; you cannot access it",
      });
    }
    return next();
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: 500,
      message: "Role is not Matching",
    });
  }
};

module.exports = { verifyToken, isAdmin, isUser };
