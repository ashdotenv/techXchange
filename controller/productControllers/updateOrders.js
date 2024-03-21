const { z } = require("zod");
const { orders } = require("../../model/orders.model");
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
const updateOrders = async(req, res) => {
    const updatedOrders = new updateOrdersSchema(req.body)
    await updateOrdersSchema.save(updatedOrders)
  
};
module.exports = { updateOrders };
