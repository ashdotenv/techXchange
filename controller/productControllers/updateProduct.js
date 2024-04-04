const { z } = require("zod");
const { productModel } = require("../../model/product.model");
const { productSchema } = require("../../utils/Zod");
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { id: userId } = req.user;

    let existingProduct = await productModel.findOne({
      _id: productId,
      seller: userId,
    });
    if (!existingProduct) {
      return res
        .status(404)
        .json({ message: "Product not found or you are not the seller." });
    }

    const updateFields = {};
    Object.keys(req.body).forEach((key) => {
      if (productSchema.shape[key]) {
        if (key === "picture" && Array.isArray(req.body[key])) {
          updateFields[key] = [...existingProduct[key], ...req.body[key]];
        } else {
          updateFields[key] = req.body[key];
        }
      }
    });

    const inputData = productSchema.partial().parse(updateFields);
    inputData.seller = userId;

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { $set: inputData },
      { new: true }
    );

    res.status(200).json({ updatedProduct });
  } catch (error) {
    res.status(400).json({ message: error.errors });
  }
};

module.exports = { updateProduct };
