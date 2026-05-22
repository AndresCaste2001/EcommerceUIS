import express from "express";
import { OrderController } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Order endpoints
router.post("/", OrderController.createOrder);                    // POST /pedidos - Create order
router.get("/", OrderController.getUserOrders);                  // GET /pedidos - Get user's orders
router.get("/all", OrderController.getAllOrders);                // GET /pedidos/all - Get all orders (admin)
router.get("/:id", OrderController.getOrder);                    // GET /pedidos/:id - Get specific order
router.put("/:id", OrderController.updateOrder);                 // PUT /pedidos/:id - Update order
router.delete("/:id", OrderController.deleteOrder);              // DELETE /pedidos/:id - Delete order

// Order items endpoints
router.post("/:orderId/items", OrderController.addOrderItem);           // POST /pedidos/:orderId/items - Add item
router.put("/:orderId/items/:itemId", OrderController.updateOrderItem); // PUT /pedidos/:orderId/items/:itemId - Update item
router.delete("/:orderId/items/:itemId", OrderController.removeOrderItem); // DELETE /pedidos/:orderId/items/:itemId - Remove item

export default router;