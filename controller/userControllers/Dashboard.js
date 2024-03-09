const { orders } = require("../../model/orders.model");
const { productModel } = require("../../model/product.model");
const { userModel } = require("../../model/user.model");

const Dashboard=async(req,res)=>{
    let id=req.user.id
    let userOrders= await orders.find({buyer:id})
    let userProducts= await productModel.find({seller:id}) 
    return res.json({username:req.user.username,userOrders,userProducts})
}
module.exports={Dashboard}