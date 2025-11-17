import pool from "../db/db.js";

export class OrderItem {
    // Add item to order
    static async create(pedidoId, productoId, cantidad, subtotal) {
        try {
            const [result] = await pool.query(
                "INSERT INTO pedido_items (pedido_id, producto_id, cantidad, subtotal) VALUES (?, ?, ?, ?)",
                [pedidoId, productoId, cantidad, subtotal]
            );
            return {
                id: result.insertId,
                pedido_id: pedidoId,
                producto_id: productoId,
                cantidad,
                subtotal
            };
        } catch (err) {
            console.error("Error creating order item:", err);
            throw new Error("Error agregando item al pedido");
        }
    }

    // Get item by ID
    static async getById(id) {
        try {
            const [items] = await pool.query(
                "SELECT * FROM pedido_items WHERE id = ?",
                [id]
            );
            return items[0] || null;
        } catch (err) {
            console.error("Error fetching order item:", err);
            throw new Error("Error obteniendo item del pedido");
        }
    }

    // Get all items for an order
    static async getByOrderId(pedidoId) {
        try {
            const [items] = await pool.query(
                `SELECT pi.*, p.nombre, p.precio, p.descripcion FROM pedido_items pi
                 JOIN productos p ON pi.producto_id = p.id
                 WHERE pi.pedido_id = ?`,
                [pedidoId]
            );
            return items;
        } catch (err) {
            console.error("Error fetching order items:", err);
            throw new Error("Error obteniendo items del pedido");
        }
    }

    // Update item
    static async update(id, cantidad, subtotal) {
        try {
            await pool.query(
                "UPDATE pedido_items SET cantidad = ?, subtotal = ? WHERE id = ?",
                [cantidad, subtotal, id]
            );
            return await this.getById(id);
        } catch (err) {
            console.error("Error updating order item:", err);
            throw new Error("Error actualizando item del pedido");
        }
    }

    // Delete item
    static async delete(id) {
        try {
            const [result] = await pool.query(
                "DELETE FROM pedido_items WHERE id = ?",
                [id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error("Error deleting order item:", err);
            throw new Error("Error eliminando item del pedido");
        }
    }
}