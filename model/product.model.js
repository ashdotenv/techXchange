const mongoose = require("mongoose");
const { userModel } = require("./user.model");

const productDetails = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceType: {
      type: String,
      required: true,
      enum: ["Negotiable", "Fixed"],
    },
    condition: {
      type: String,
      enum: ["Brand New", "Used", "Like New"],
      required: true,
    },
    category: {
      type: String,
      enum: [
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
      ],
      required: true,
    },
    brand: {
      type: String,
      enum: [
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
      ],
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    picture: {
      default:[],
      type: Array,
    },
    location: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    sellerRating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: String,
        rating: Number,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productDetails);
 
module.exports = { productModel };
