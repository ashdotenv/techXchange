const { productModel } = require("../../model/product.model");
const { userModel } = require("../../model/user.model");

const deleteUsers = async (req, res) => {
    const { id } = req.params;
    
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }
        
        const products = await productModel.find({ seller: id });
        await productModel.deleteMany({ seller: id });
        await userModel.findByIdAndDelete(id);
        
        return res.status(200).json({ message: "User and associated products deleted successfully" });
    } catch (error) {
        console.error("message:", error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
};

module.exports = { deleteUsers };
