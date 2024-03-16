const { orders } = require("../../model/orders.model");
const { productModel } = require("../../model/product.model");
const { userModel } = require("../../model/user.model");

const Dashboard = async (req, res) => {
  let { id } = req.user;
  let userOrders = await orders.find().populate({path:"buyer",select:"username"}).populate({path:"product"});//{ seller: id }
  let totalOrderRevenue = userOrders.reduce((a, o) => (a += o.totalAmount), 0);
  let userProducts = await productModel.find({ seller: id });
  let shippedOrders = orderStatusFilter("Shipped");
  let pendingOrders = orderStatusFilter("Pending");
  let deliveredOrders = orderStatusFilter("Delivered");
  let canceledOrders = orderStatusFilter("Cancelled");
  function orderStatusFilter(status) {
    return userOrders.filter((e) => (e.status === status)) 
  }
  return res.json({
    username: req.user.username,
    userOrders: userOrders,
    // userProducts:userProducts,
    totalOrderRevenue: totalOrderRevenue,
    deliveredOrders: deliveredOrders,
    pendingOrders: pendingOrders,
    canceledOrders: canceledOrders,
    shippedOrders: shippedOrders,
  });
};
module.exports = { Dashboard };
