import express from "express";
import orderController from "../controllers/order.controller.js";
import authMiddleware from "../config/jwt.middleware.js"

const router = express.Router();


router.post("/", authMiddleware, orderController.createOrder);

router.get("/", authMiddleware, orderController.getOrdersByUser);

router.get("/:id", authMiddleware, orderController.getOrderById);

router.patch("/:id", authMiddleware, orderController.updateOrderStatus);

export default router;
