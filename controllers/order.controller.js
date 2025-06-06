import Order from "../models/order.model.js";

const createOrder = async (req, res) => {
  try {
    const {
      items,
      subTotal,
      charges,
      total,
      addressId,
      paymentMethod,
    } = req.body;

    const order = new Order({
      userId: req.user.id,
      items,
      subTotal,
      charges,
      total,
      addressId,
      paymentMethod,
    });

    await order.save();

    res.status(201).json({ message: "Order placed", data: order });
  } catch (error) {
    res.status(500).json({ message: "Order creation failed", error: error.message });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ message: "Orders fetched", data: orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ data: order });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order updated", data: order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error: error.message });
  }
};

export default {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
};
