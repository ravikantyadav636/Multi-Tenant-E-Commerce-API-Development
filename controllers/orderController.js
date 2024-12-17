const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// Get all orders for vendor's products
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "product",
        match: { vendor: req.vendor._id },
      })
      .exec();

    const vendorOrders = orders.filter((order) => order.product !== null);

    res.status(200).json(vendorOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark an order as shipped
exports.markOrderShipped = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOneAndUpdate(
      { _id: id },
      { status: "shipped" },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
