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
router.post("/test", (req,res)=>{
  res.send(req.body.picture)
});


module.exports = { indexRouter: router };
