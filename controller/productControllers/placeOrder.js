const { z } = require('zod');
const { productModel } = require('../../model/product.model');
const { orders } = require('../../model/orders.model');

const placeOrderSchema = z.object({
  product: z.string(),
  quantity: z.number().min(1),
  paymentMethod: z.enum(['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery']),
  shippingAddress: z.string(),
});

const placeOrder = async (req, res) => {
  try {
    const validatedData = placeOrderSchema.parse(req.body);
    const { product, quantity, paymentMethod, shippingAddress } = validatedData;
    const prod = await productModel.findById(product);

    if (!prod) {
      return res.status(400).json({ message: "Sorry, the product doesn't exist" });
    }

    if (prod.quantity < quantity) {
      return res.status(400).json({ message: "Sorry, the requested quantity is not available" });
    }

    if (req.user.id === prod.seller.toString()) {
      return res.status(400).json({ message: "Sorry, you can't purchase your own products" });
    }

    const totalAmount = prod.price * quantity;

    const newOrder = {
      buyer: req.user.id,
      seller: prod.seller,
      product: prod._id,
      quantity,
      totalAmount,
      paymentMethod,
      shippingAddress,
    };

    const savedOrder = await orders.create(newOrder);

    await productModel.findByIdAndUpdate(
      product,
      { $inc: { quantity: -quantity } }
    ).catch(error => {
      console.error('Error updating product quantity:', error);
      throw error;
    });

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(400).json({ message: 'Invalid data' });
  }
};

module.exports = { placeOrder };
