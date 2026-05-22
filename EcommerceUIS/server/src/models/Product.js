import pool from "../db/db.js";

export class Product {
    static async getAll() {
        const [rows] = await pool.query("SELECT * FROM productos");
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [id]);
        return rows[0] || null;
    }

    static async create({ nombre, descripcion, precio, calificacion, categoria, img }) {
        const [result] = await pool.query(
            "INSERT INTO productos (nombre, descripcion, precio, calificacion, categoria, img) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre, descripcion, precio, calificacion, categoria, img]
        );
        return {
            id: result.insertId,
            nombre,
            descripcion,
            precio,
            calificacion,
            categoria,
            img
        };
    }

    static async update(id, { nombre, descripcion, precio, calificacion, categoria, img }) {
        const [result] = await pool.query(
            "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, calificacion = ?, categoria = ?, img = ? WHERE id = ?",
            [nombre, descripcion, precio, calificacion, categoria, img, id]
        );
        if (result.affectedRows === 0) {
            return null;
        }
        return await this.getById(id);
    }

    static async delete(id) {
        const [result] = await pool.query("DELETE FROM productos WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}
