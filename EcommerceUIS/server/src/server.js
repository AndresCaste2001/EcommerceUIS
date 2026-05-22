// src/server.js
import dotenv from "dotenv";
import app from "./app.js";
import { initSchema } from "./db/schema.js";
import { seedInitialData } from "./db/seed.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await initSchema();        // crea tablas si no existen
        await seedInitialData();   // inserta productos si la tabla está vacía

        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Error al iniciar la app:", err);
        process.exit(1);
    }
}

start();
