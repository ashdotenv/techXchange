const { productModel } = require("../../model/product.model");
const { userModel } = require("../../model/user.model");

const viewSeller = async (req, res) => {
  try {
    let { username } = req.params;
    let user = userModel.findOne({ username: username });
    if (!user) {
      return res.json({ message: "No Seller With The username" });
    }
    let products = productModel.findById({ seller: user._id });

    // if (!seller) {
    //   return res.json({ message: "Seller Not Found " });
    // }
    return res.json({ sellerProducts: products });
    // return res.json({ seller: seller.username, products: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { viewSeller };
