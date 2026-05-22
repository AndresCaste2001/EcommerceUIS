import { Order } from "../models/Order.js";
import { OrderItem } from "../models/OrderItem.js";
import { Product } from "../models/Product.js";

export class OrderController {
    static async createOrder(req, res) {
        try {
            const usuarioId = req.user.id; // From JWT middleware
            const { items } = req.body; // items: [{ productoId, cantidad }, ...]

            if (!items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ error: "Items son requeridos" });
            }

            // Calculate total
            let total = 0;
            const itemsWithPrice = [];

            for (const item of items) {
                const product = await Product.getById(item.productoId);
                if (!product) {
                    return res.status(404).json({ error: `Producto ${item.productoId} no encontrado` });
                }
                const subtotal = product.precio * item.cantidad;
                total += subtotal;
                itemsWithPrice.push({ ...item, subtotal, precio: product.precio });
            }

            // Create order
            const order = await Order.create(usuarioId, total);

            // Add items to order
            const createdItems = [];
            for (const item of itemsWithPrice) {
                const orderItem = await OrderItem.create(
                    order.id,
                    item.productoId,
                    item.cantidad,
                    item.subtotal
                );
                createdItems.push(orderItem);
            }

            res.status(201).json({
                ...order,
                items: createdItems
            });
        } catch (err) {
            console.error("createOrder error:", err);
            res.status(500).json({ error: err.message });
        }
    }

    // Get order by ID (user can see own orders, admin can see any)
    static async getOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await Order.getById(id);

            if (!order) {
                return res.status(404).json({ error: "Pedido no encontrado" });
            }

            // Check if user is owner or admin (add admin check if needed)
            if (order.usuario_id !== req.user.id) {
                return res.status(403).json({ error: "No tienes permiso para ver este pedido" });
            }

            res.json(order);
        } catch (err) {
            console.error("getOrder error:", err);
            res.status(500).json({ error: err.message });
        }
    }

    // Get all orders for logged-in user
    static async getUserOrders(req, res) {
        try {
            const usuarioId = req.user.id;
            const orders = await Order.getByUserId(usuarioId);
            res.json(orders);
        } catch (err) {
            console.error("getUserOrders error:", err);
            res.status(500).json({ error: err.message });
        }
    }

    // Get all orders (admin only)
    static async getAllOrders(req, res) {
        try {
            // Add admin check if needed: if (!req.user.isAdmin)...
            const orders = await Order.getAll();
            res.json(orders);
        } catch (err) {
            console.error("getAllOrders error:", err);
            res.status(500).json({ error: err.message });
        }
    }

    // Update order (can only update total or status)
    static async updateOrder(req, res) {
        try {
            const { id } = req.params;
            const { total } = req.body;

            if (total == null || total <= 0) {
                return res.status(400).json({ error: "Total debe ser mayor a 0" });
            }

            const order = await Order.getById(id);
            if (!order) {
                return res.status(404).json({ error: "Pedido no encontrado" });
            }

            // Check permissions
            if (order.usuario_id !== req.user.id) {
                return res.status(403).json({ error: "No tienes permiso para actualizar este pedido" });
            }

            const updated = await Order.update(id, { total });
            res.json(updated);
        } catch (err) {
            console.error("updateOrder error:", err);
            res.status(500).json({ error: err.message });
        }
    }

    // Delete order
    static async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await Order.getById(id);

            if (!order) {
                return res.status(404).json({ error: "Pedido no encontrado" });
            }

            // Check permissions
            if (order.usuario_id !== req.user.id) {
                return res.status(403).json({ error: "No tienes permiso para eliminar este pedido" });
            }

            await Order.delete(id);
            res.json({ success: true, message: "Pedido eliminado" });
        } catch (err) {
            console.error("deleteOrder error:", err);
            res.status(500).json({ error: err.message });
        }
    }

    // Add item to order
    static async addOrderItem(req, res) {
        try {
            const { orderId } = req.params;
            const { productoId, cantidad } = req.body;

            if (!productoId || !cantidad || cantidad <= 0) {
                return res.status(400).json({ error: "productoId y cantidad (> 0) son requeridos" });
            }

            // Verify order exists and belongs to user
            const order = await Order.getById(orderId);
            if (!order) {
                return res.status(404).json({ error: "Pedido no encontrado" });
            }

            if (order.usuario_id !== req.user.id) {
                return res.status(403).json({ error: "No tienes permiso" });
            }

            // Verify product exists
            const product = await Product.getById(productoId);
            if (!product) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }

            const subtotal = product.precio * cantidad;
            const item = await OrderItem.create(orderId, productoId, cantidad, subtotal);

            // Update order total
            const newTotal = order.total + subtotal;
            await Order.update(orderId, { total: newTotal });

            res.status(201).json(item);
        } catch (err) {
            console.error("addOrderItem error:", err);
            res.status(500).json({ error: err.message });
        }
    }

    // Update order item quantity
    static async updateOrderItem(req, res) {
        try {
            const { orderId, itemId } = req.params;
            const { cantidad } = req.body;

            if (!cantidad || cantidad <= 0) {
                return res.status(400).json({ error: "cantidad debe ser > 0" });
            }

            // Verify order exists and belongs to user
            const order = await Order.getById(orderId);
            if (!order) {
                return res.status(404).json({ error: "Pedido no encontrado" });
            }

            if (order.usuario_id !== req.user.id) {
                return res.status(403).json({ error: "No tienes permiso" });
            }

            // Get current item
            const item = await OrderItem.getById(itemId);
            if (!item) {
                return res.status(404).json({ error: "Item no encontrado" });
            }

            // Calculate new subtotal
            const product = await Product.getById(item.producto_id);
            const newSubtotal = product.precio * cantidad;
            const difference = newSubtotal - item.subtotal;

            // Update item
            const updated = await OrderItem.update(itemId, cantidad, newSubtotal);

            // Update order total
            const newTotal = order.total + difference;
            await Order.update(orderId, { total: newTotal });

            res.json(updated);
        } catch (err) {
            console.error("updateOrderItem error:", err);
            res.status(500).json({ error: err.message });
        }
    }

    // Remove item from order
    static async removeOrderItem(req, res) {
        try {
            const { orderId, itemId } = req.params;

            // Verify order exists and belongs to user
            const order = await Order.getById(orderId);
            if (!order) {
                return res.status(404).json({ error: "Pedido no encontrado" });
            }

            if (order.usuario_id !== req.user.id) {
                return res.status(403).json({ error: "No tienes permiso" });
            }

            // Get item
            const item = await OrderItem.getById(itemId);
            if (!item) {
                return res.status(404).json({ error: "Item no encontrado" });
            }

            // Delete item
            await OrderItem.delete(itemId);

            // Update order total
            const newTotal = order.total - item.subtotal;
            await Order.update(orderId, { total: newTotal });

            res.json({ success: true, message: "Item removido del pedido" });
        } catch (err) {
            console.error("removeOrderItem error:", err);
            res.status(500).json({ error: err.message });
        }
    }
}