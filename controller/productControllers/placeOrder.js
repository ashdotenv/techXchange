const { z } = require('zod');
const { Order } = require('../../model/orders.model');

const placeOrderSchema = z.object({
  quantity: z.number().min(1),
  totalAmount: z.number(),
  paymentMethod: z.enum(['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery']),
  shippingAddress: z.string(),
});

const placeOrder = async (req, res) => {
  try {
    const validatedData = placeOrderSchema.parse(req.body);
    const {  quantity, totalAmount, paymentMethod, shippingAddress } = validatedData;
    const newOrder = new Order({
      buyer:req.user.id,
      seller:req.user,
      product,
      quantity,
      totalAmount,
      paymentMethod,
      shippingAddress,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error placing order:', error.errors);
    res.status(400).json({ error: 'Invalid data' });
  }
};

module.exports = { placeOrder };
