const { productModel } = require("../../model/product.model");

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const single_product = await productModel.findById(id);
  return res.status(200).json(single_product);
};

module.exports = { getSingleProduct };
