const express = require("express");
const { signup, login } = require("../controller/userControllers/Auth");
const router = express.Router();
const {
  viewProducts,
} = require("../controller/productControllers/viewProducts");
const { userRouter } = require("./user");
const { adminRouter } = require("./adminRoutes");
router.post("/signup", signup);
router.post("/login", login);
router.get("/products", viewProducts);
router.get("/", (req, res) => {
  res.redirect("/products");
});
router.use("/user", userRouter);
router.use("/admin", adminRouter);

module.exports = { indexRouter: router };
