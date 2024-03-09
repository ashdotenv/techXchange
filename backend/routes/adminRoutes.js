const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/auth");
const router = express.Router();
router.post("/", verifyToken, isAdmin, (req, res) => {
  res.send("welcome to admin routes");
});
//ban user routes it deletes user ans all the products listed by the user
router.post("/deleteUser", verifyToken, isAdmin, (req, res) => {
  res.send("welcome to admin routes");
});


module.exports = { adminRouter: router };
