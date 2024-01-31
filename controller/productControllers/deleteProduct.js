const { default: mongoose } = require("mongoose");
const { productModel } = require("../../model/product.model");
const { userModel } = require("../../model/user.model");
const jwt = require("jsonwebtoken");

const deleteProduct = async (req, res) => {
  try {
    let { id } = req.params;
    const product = await productModel.findOne({ _id: id });
    if (product) {
      if (req.user.id !== product.seller._id.toString()) {
        return res.status(403).json({
          message:
            "Forbidden: You do not have permission to delete this product",
        });
      }
      await product.deleteOne();
      return res.status(200).json({ message: "Product Deleted Successfully" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { deleteProduct };
