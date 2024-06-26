const { z } = require("zod");
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
    location: z.string(),
    seller: z.string(),
    quantity: z.number().default(1),
  });
  const placeOrderSchema = z.object({
    product: z.string(),
    quantity: z.number().min(1),
    paymentMethod: z.enum(['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery']),
    shippingAddress: z.string(),
  });
  const updateOrdersSchema = z.object({
    status: z.enum([
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ]).optional(),
    shippingAddress: z.string().min(5).optional(),
  });
  
module.exports={productSchema,placeOrderSchema,updateOrdersSchema}  