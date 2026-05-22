import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "../public")));

// Health check
app.get("/", (req, res) => res.send("Bienvenido a mi API de productos!"));

// Auth routes
app.use("/auth", authRoutes);

// Product routes
app.use("/productos", productRoutes);

// Order routes (protected)
app.use("/pedidos", orderRoutes);

export default app;
