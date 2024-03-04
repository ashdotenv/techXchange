const { z } = require("zod");
const { productModel } = require("../../model/product.model");


//Zod for Validation
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
  seller: z.string(),
  picture: z.array(z.string()).optional(),
  location: z.string(),
  quantity: z.number().default(1),
});

const addProduct = async (req, res) => {
  //When sending from postman's formData it sent as String 
  req.body.quantity=parseInt(req.body.quantity) 
  req.body.price=parseInt(req.body.price) 
  try {
    //setting the user to seller
    req.body.seller = req.user.id;
    const inputData = productSchema.parse(req.body);
    const newProduct = new productModel(inputData);
    const savedProduct = await newProduct.save(); //saving to DB

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error.errors);
    res.status(400).json({ message: "Invalid data" });
  }
};

module.exports = { addProduct };
