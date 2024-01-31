const { z } = require("zod");
const { orderDetailsModel } = require("../../model/orders.model");
const { default: mongoose } = require("mongoose");
const productSchema = z.object({
  product: z
    .string()
    .refine((value) => value.length > 0, { message: "Product ID is required" }),
  quantity: z.number().int().positive(),
  seller: z
    .string()
    .refine((value) => value.length > 0, { message: "Seller ID is required" }),
});

const orderSchema = z.object({
  products: z.array(productSchema),
  totalAmount: z.number().positive(),
  buyer: z
    .string()
    .refine((value) => value.length > 0, { message: "Buyer ID is required" }),
  paymentMethod: z.enum(["Credit Card", "PayPal", "Cash on Delivery"]),
  shippingAddress: z.string().min(1),
});

const placeOrder = async (req, res) => {
  try {
    const requestData = req.body;
    const validatedData = orderSchema.parse(requestData);

    const isSameSellerAndBuyer = validatedData.products.some(
      (product) => product.seller === validatedData.buyer
    );

    if (isSameSellerAndBuyer) {
      return res
        .status(400)
        .json({ message: "You cannot buy your own products" });
    }

    const newOrder = new orderDetailsModel({
      validatedData,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: "Invalid request data", errors: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = { placeOrder };
