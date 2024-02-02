const express = require("express");
const { signup, login } = require("../controller/userControllers/Auth");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  viewProducts,
} = require("../controller/productControllers/viewProducts");

router.post("/signup", signup);
router.post("/login", login);
router.get("/products", viewProducts);
router.get("/test",(req,res)=>{
  res.send("Nice")
});
module.exports = { indexRouter: router };
