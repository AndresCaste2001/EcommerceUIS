import pool from "../db/db.js";

export class Order {
    // Create new order
    static async create(usuarioId, total) {
        try {
            const [result] = await pool.query(
                "INSERT INTO pedidos (usuario_id, total) VALUES (?, ?)",
                [usuarioId, total]
            );
            return {
                id: result.insertId,
                usuario_id: usuarioId,
                total,
                fecha: new Date().toISOString()
            };
        } catch (err) {
            console.error("Error creating order:", err);
            throw new Error("Error creando pedido");
        }
    }

    // Get order by ID with items
    static async getById(id) {
        try {
            const [orders] = await pool.query(
                "SELECT * FROM pedidos WHERE id = ?",
                [id]
            );
            
            if (!orders[0]) return null;

            const order = orders[0];

            // Get items for this order
            const [items] = await pool.query(
                `SELECT pi.*, p.nombre, p.precio FROM pedido_items pi
                 JOIN productos p ON pi.producto_id = p.id
                 WHERE pi.pedido_id = ?`,
                [id]
            );

            return {
                ...order,
                items
            };
        } catch (err) {
            console.error("Error fetching order:", err);
            throw new Error("Error obteniendo pedido");
        }
    }

    // Get all orders for a user
    static async getByUserId(usuarioId) {
        try {
            const [orders] = await pool.query(
                "SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY fecha DESC",
                [usuarioId]
            );

            // Get items for each order
            const ordersWithItems = await Promise.all(
                orders.map(async (order) => {
                    const [items] = await pool.query(
                        `SELECT pi.*, p.nombre, p.precio FROM pedido_items pi
                         JOIN productos p ON pi.producto_id = p.id
                         WHERE pi.pedido_id = ?`,
                        [order.id]
                    );
                    return { ...order, items };
                })
            );

            return ordersWithItems;
        } catch (err) {
            console.error("Error fetching user orders:", err);
            throw new Error("Error obteniendo pedidos del usuario");
        }
    }

    // Get all orders (admin)
    static async getAll() {
        try {
            const [orders] = await pool.query(
                "SELECT * FROM pedidos ORDER BY fecha DESC"
            );
            return orders;
        } catch (err) {
            console.error("Error fetching all orders:", err);
            throw new Error("Error obteniendo pedidos");
        }
    }

    // Update order
    static async update(id, updates) {
        try {
            const { total } = updates;
            await pool.query(
                "UPDATE pedidos SET total = ? WHERE id = ?",
                [total, id]
            );
            return await this.getById(id);
        } catch (err) {
            console.error("Error updating order:", err);
            throw new Error("Error actualizando pedido");
        }
    }

    // Delete order
    static async delete(id) {
        try {
            // First delete all items in the order
            await pool.query("DELETE FROM pedido_items WHERE pedido_id = ?", [id]);
            
            // Then delete the order
            const [result] = await pool.query("DELETE FROM pedidos WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (err) {
            console.error("Error deleting order:", err);
            throw new Error("Error eliminando pedido");
        }
    }
}