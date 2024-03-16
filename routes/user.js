const express = require("express");
const { isUser, verifyToken } = require("../middleware/auth");
const { addProduct } = require("../controller/productControllers/addProdcut");
const {
  deleteProduct,
} = require("../controller/productControllers/deleteProduct");
const {
  updateProduct,
} = require("../controller/productControllers/updateProduct");
const router = express.Router();
const { placeOrder } = require("../controller/productControllers/placeOrder");
const { Dashboard } = require("../controller/userControllers/Dashboard");
const {
  updateOrders,
} = require("../controller/productControllers/updateOrders");

router.get("/", verifyToken, isUser, (req, res) => {
  res.send("welcome to user routes");
});

router.get("/dashboard", verifyToken, isUser, Dashboard);
router.post("/", verifyToken, isUser, (req, res) => {
  res.send("welcome to user routes");
});

router.delete("/deleteProduct/:id", verifyToken, isUser, deleteProduct);
router.patch("/updateProduct/:productId", verifyToken, isUser, updateProduct);
router.post("/placeOrder", verifyToken, isUser, placeOrder);
router.post("/addProduct", verifyToken, isUser, addProduct);
router.post("/updateOrders", verifyToken, isUser, updateOrders);
module.exports = { userRouter: router };
