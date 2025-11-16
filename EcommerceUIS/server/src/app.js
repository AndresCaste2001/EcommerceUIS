import express from "express";
import cors from "cors";
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => res.send("Bienvenido a mi API de productos!"));

// Auth routes
app.use("/auth", authRoutes);

// Product routes
app.use("/productos", productRoutes);

export default app;
