import pool from "../db/db.js";

export class User {
    static async findByUsername(username) {
        const [rows] = await pool.query(
            "SELECT id, username, password FROM usuarios WHERE username = ?",
            [username]
        );
        return rows[0] || null;
    }

    static async create({ username, email, password }) {
        const [result] = await pool.query(
            "INSERT INTO usuarios (nombre, username, email, password) VALUES (?, ?, ?, ?)",
            [username, username, email, password]
        );
        return {
            id: result.insertId,
            username,
            email
        };
    }

    static async getById(id) {
        const [rows] = await pool.query(
            "SELECT id, username, email FROM usuarios WHERE id = ?",
            [id]
        );
        return rows[0] || null;
    }
}