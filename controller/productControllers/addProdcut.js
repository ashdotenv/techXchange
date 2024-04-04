const { z } = require("zod");
const { productModel } = require("../../model/product.model");
const { uploadToCloudinary } = require("../../middleware/fileUpload");
const { productSchema } = require("../../utils/Zod");
//Zod for Validation

const addProduct = async (req, res) => {
  try {
    const body = {};
    Object.keys(req.body).forEach((k) => {
      body[k] = req.body[k];
    });
    req.body = body;

    req.body.quantity = parseInt(req.body.quantity);
    req.body.price = parseInt(req.body.price);

    req.body.seller = req.user.id;
    let inputData = productSchema.parse(req.body);

    const data = await uploadToCloudinary(req);
    inputData = { ...inputData, picture: data };
    const newProduct = new productModel(inputData);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    if (error instanceof ValidationError) {
      res.status(400).json({ message: "Invalid data" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = { addProduct };
