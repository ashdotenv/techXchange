const { orders } = require("../../model/orders.model"); 
const { updateOrdersSchema } = require("../../utils/Zod");
const updateOrders = async(req, res) => {
    const updatedOrders = new updateOrdersSchema(req.body)
    await updateOrdersSchema.save(updatedOrders)
  
};
module.exports = { updateOrders };
