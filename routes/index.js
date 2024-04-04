const express = require("express");
const { signup, login, logout } = require("../controller/userControllers/Auth");
const router = express.Router();
const {
  viewProducts,
} = require("../controller/productControllers/viewProducts");
const { userRouter } = require("./user");
const { adminRouter } = require("./adminRoutes");
const { viewSeller } = require("../controller/userControllers/viewSeller");
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/seller/:username", viewSeller);
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/products", viewProducts);

module.exports = {  router };
