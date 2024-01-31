const { z } = require("zod");
const { productModel } = require("../../model/product.model");

const productSchema = z.object({
  name: z.string().max(100).min(1),
  description: z.string().min(1),
  price: z.number(),
  priceType: z.enum(["Negotiable", "Fixed"]),
  condition: z.enum(["Brand New", "Used", "Like New"]),
  category: z.enum([
    "Laptops",
    "Smartphones",
    "Cameras",
    "Tablets",
    "Audio Devices",
    "Gaming Consoles",
    "Wearables",
    "Accessories",
    "Home Appliances",
    "Other",
  ]),
  brand: z.enum([
    "Apple",
    "Samsung",
    "Sony",
    "Dell",
    "HP",
    "Lenovo",
    "LG",
    "Canon",
    "Nikon",
    "Bose",
    "Microsoft",
    "Asus",
    "Logitech",
    "Google",
    "Fitbit",
    "Xiaomi",
    "Sony",
    "Panasonic",
    "JBL",
    "Philips",
  ]),
  seller: z.string(), // This will be overwritten with the value from req.body
  picture: z.string().optional(),
  location: z.string(),
  quantity: z.number().default(1),
});

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
        .json({ error: "Product not found or you are not the seller." });
    }
    const inputData = productSchema.parse({
      ...req.body,
      seller: userId,
    });

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { $set: inputData },
      { new: true }
    );

    res.status(200).json({ updatedProduct });
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

module.exports = { updateProduct };
