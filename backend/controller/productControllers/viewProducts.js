const { productModel } = require("../../model/product.model");
const { z } = require("zod");

const priceSchema = z.string().refine(
  (value) => {
    const priceFormat = /^\d+(\.\d+)?(-\d+(\.\d+)?)?$/;
    return priceFormat.test(value);
  },
  { message: "Invalid price format" }
);

const quantitySchema = z.string().refine(
  (value) => {
    const quantityFormat = /^\d+(-\d+)?$/;
    return quantityFormat.test(value);
  },
  { message: "Invalid quantity format" }
);

const viewProducts = async (req, res) => {
  try {
    let filters = {};
    let {
      price,
      quantity,
      condition,
      category,
      brand,
      name,
      location,
      seller,
      rating,
    } = req.query;

    if (price) {
      try {
        priceSchema.parse(price);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      const priceRange = price.split("-");
      filters.price = {
        $gte: parseFloat(priceRange[0]),
      };

      if (priceRange.length > 1) {
        filters.price.$lte = parseFloat(priceRange[1]);
      }
    }

    if (quantity) {
      try {
        quantitySchema.parse(quantity);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      const quantityRange = quantity.split("-");
      filters.quantity = {
        $gte: parseInt(quantityRange[0]),
      };

      if (quantityRange.length > 1) {
        filters.quantity.$lte = parseInt(quantityRange[1]);
      }
    }

    if (rating) {
      const ratingRange = rating.split("-");
      filters.rating = {
        $gte: parseFloat(ratingRange[0]),
        $lte: parseFloat(ratingRange[1]),
      };
    }

    if (condition) {
      filters.condition = new RegExp(condition, "i");
    }

    if (category) {
      filters.category = new RegExp(category, "i");
    }

    if (brand) {
      filters.brand = new RegExp(`^${brand}`, "i");
    }

    if (name) {
      filters.name = new RegExp(`^${name}`, "i");
    }

    if (location) {
      filters.location = new RegExp(`^${location}`, "i");
    }

    if (seller) {
      filters.seller = new RegExp(`^${seller}`, "i");
    }

    Object.keys(req.query).forEach((key) => {
      if (
        ![
          "price",
          "quantity",
          "condition",
          "category",
          "brand",
          "name",
          "description",
          "location",
          "seller",
          "rating",
        ].includes(key)
      ) {
        filters[key] = new RegExp(req.query[key], "i");
      }
    });

    const products = await productModel.find(filters);

    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { viewProducts };
