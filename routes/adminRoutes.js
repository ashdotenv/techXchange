const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/auth");
const router = express.Router();
router.post("/", verifyToken, isAdmin, (req, res) => {
  res.send("welcome to admin routes");
});
router.post("/banUser", verifyToken, isAdmin, (req, res) => {
  res.send("welcome to admin routes");
});
router.get("/", verifyToken, isAdmin, (req, res) => {
  res.send("welcome to admin routes");
});

module.exports = { adminRouter: router };
