import { Product } from "../models/Product.js";

export class ProductController {
    static async getAllProducts(req, res) {
        try {
            const products = await Product.getAll();
            res.json(products);
        } catch (err) {
            console.error("getAllProducts error:", err);
            res.status(500).json({ error: "Error obteniendo productos" });
        }
    }

    static async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.getById(id);
            if (!product) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            res.json(product);
        } catch (err) {
            console.error("getProductById error:", err);
            res.status(500).json({ error: "Error obteniendo producto" });
        }
    }

    static async createProduct(req, res) {
        try {
            const { nombre, descripcion, precio, calificacion, categoria, img } = req.body;

            if (!nombre || !descripcion || precio == null || calificacion == null || !categoria || !img) {
                return res.status(400).json({
                    error: "nombre, descripcion, precio, calificacion, categoria e img son requeridos"
                });
            }

            const created = await Product.create({ nombre, descripcion, precio, calificacion, categoria, img });
            res.status(201).json(created);
        } catch (err) {
            console.error("createProduct error:", err);
            res.status(500).json({ error: "Error creando producto" });
        }
    }

    static async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { nombre, descripcion, precio, calificacion, categoria, img } = req.body;

            if (!nombre || !descripcion || precio == null || calificacion == null || !categoria || !img) {
                return res.status(400).json({
                    error: "nombre, descripcion, precio, calificacion, categoria e img son requeridos"
                });
            }

            const updated = await Product.update(id, { nombre, descripcion, precio, calificacion, categoria, img });
            if (!updated) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            res.json(updated);
        } catch (err) {
            console.error("updateProduct error:", err);
            res.status(500).json({ error: "Error actualizando producto" });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Product.delete(id);
            if (!deleted) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            res.json({ success: true, message: "Producto eliminado" });
        } catch (err) {
            console.error("deleteProduct error:", err);
            res.status(500).json({ error: "Error eliminando producto" });
        }
    }
}
