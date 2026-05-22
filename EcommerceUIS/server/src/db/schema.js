import pool from "./db.js";

export async function initSchema() {
    const createUsersTable = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      username VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;

    const createProductsTable = `
    CREATE TABLE IF NOT EXISTS productos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(150) NOT NULL,
      descripcion TEXT NOT NULL,
      precio INT NOT NULL,
      calificacion DECIMAL(2,1) NOT NULL,
      categoria VARCHAR(50) NOT NULL,
      img VARCHAR(500) NOT NULL
    );
  `;

    const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS pedidos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT NOT NULL,
      fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      total DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    );
  `;
    const createOrderItemsTable = `
        CREATE TABLE IF NOT EXISTS pedido_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        pedido_id INT NOT NULL,
        producto_id INT NOT NULL,
        cantidad INT NOT NULL,
        subtotal DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
        FOREIGN KEY (producto_id) REFERENCES productos(id)
    );
  `;

    const connection = await pool.getConnection();
    try {
        await connection.query(createUsersTable);
        await connection.query(createProductsTable);
        await connection.query(createOrdersTable);
        await connection.query(createOrderItemsTable);
        console.log("Esquema creado o verificado");
    } finally {
        connection.release();
    }
}
