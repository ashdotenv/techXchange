const express = require("express");
const { signup, login } = require("../controller/userControllers/Auth");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  viewProducts,
} = require("../controller/productControllers/viewProducts");
router.get("/",(req,res)=>{
  res.send("CI/CD Test")
})

router.post("/signup", signup);
router.post("/login", login);
router.get("/products", viewProducts);
module.exports = { indexRouter: router };
