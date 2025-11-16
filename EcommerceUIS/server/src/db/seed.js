import pool from "./db.js";

const initialProducts = [
    {
        nombre: "Camiseta Universitaria Clásica",
        descripcion: "Camiseta de algodón 100% con el logo bordado de la universidad en el pecho. Disponible en colores institucionales.",
        precio: 45000,
        calificacion: 4.5,
        categoria: "Ropa",
        img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        nombre: "Hoodie con Capucha",
        descripcion: "Sudadera con capucha y bolsillo canguro. Logo universitario estampado en grande en el frente y nombre de la facultad en la espalda.",
        precio: 120000,
        calificacion: 4.8,
        categoria: "Ropa",
        img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"
    },
    {
        nombre: "Gorra Snapback",
        descripcion: "Gorra ajustable con visera plana y logo universitario bordado en 3D. Cierre snapback trasero.",
        precio: 35000,
        calificacion: 4.3,
        categoria: "Accesorios",
        img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500"
    },
    {
        nombre: "Mug Térmico",
        descripcion: "Vaso térmico de acero inoxidable con capacidad de 500ml. Mantiene bebidas calientes o frías por 6 horas. Incluye logo universitario.",
        precio: 55000,
        calificacion: 4.6,
        categoria: "Hogar",
        img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500"
    },
    {
        nombre: "Morral Deportivo",
        descripcion: "Mochila resistente con múltiples compartimentos, porta laptop acolchado y logo universitario bordado. Ideal para el campus.",
        precio: 150000,
        calificacion: 4.7,
        categoria: "Accesorios",
        img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },
    {
        nombre: "Libreta Universitaria",
        descripcion: "Cuaderno anillado tamaño carta con 200 hojas. Pasta dura con diseño institucional y escudo de la universidad.",
        precio: 25000,
        calificacion: 4.4,
        categoria: "Papelería",
        img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500"
    },
    {
        nombre: "Camiseta Polo",
        descripcion: "Polo tipo piqué con logo bordado pequeño en el pecho. Diseño elegante para eventos formales universitarios.",
        precio: 65000,
        calificacion: 4.5,
        categoria: "Ropa",
        img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500"
    },
    {
        nombre: "Lanyard con Porta ID",
        descripcion: "Cinta porta credencial con cierre de seguridad y porta tarjetas transparente. Colores institucionales y logo impreso.",
        precio: 15000,
        calificacion: 4.2,
        categoria: "Accesorios",
        img: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=500"
    },
    {
        nombre: "Banderín Universitario",
        descripcion: "Banderín de fieltro premium tamaño mediano (30x45cm) con escudo y nombre de la universidad. Perfecto para decoración.",
        precio: 40000,
        calificacion: 4.6,
        categoria: "Hogar",
        img: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=500"
    },
    {
        nombre: "Botella de Agua Reutilizable",
        descripcion: "Botella deportiva libre de BPA con capacidad de 750ml. Logo universitario serigrafiado y tapa anti-derrames.",
        precio: 30000,
        calificacion: 4.4,
        categoria: "Accesorios",
        img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500"
    },
    {
        nombre: "Set de Bolígrafos Premium",
        descripcion: "Estuche con 3 bolígrafos metálicos grabados con el logo universitario. Tinta azul, negra y roja.",
        precio: 35000,
        calificacion: 4.3,
        categoria: "Papelería",
        img: "https://images.unsplash.com/photo-1542216172-f356fdd22653?ixlib=rb-4.1.0&q=80&w=1680"
    },
    {
        nombre: "Chaqueta Deportiva",
        descripcion: "Chaqueta cortavientos con cierre completo y bolsillos laterales. Logo bordado en el pecho y espalda.",
        precio: 180000,
        calificacion: 4.7,
        categoria: "Ropa",
        img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
    },
    {
        nombre: "Mousepad Ergonómico",
        descripcion: "Pad para mouse con soporte de gel y base antideslizante. Diseño con logo universitario y colores institucionales.",
        precio: 28000,
        calificacion: 4.5,
        categoria: "Tecnología",
        img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500"
    },
    {
        nombre: "Agenda Académica",
        descripcion: "Agenda anual con planificador semanal, calendario y secciones para notas. Pasta dura con escudo universitario.",
        precio: 45000,
        calificacion: 4.6,
        categoria: "Papelería",
        img: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500"
    },
    {
        nombre: "USB Personalizado 32GB",
        descripcion: "Memoria USB 3.0 de 32GB con logo universitario grabado. Carcasa metálica resistente con llavero incorporado.",
        precio: 40000,
        calificacion: 4.4,
        categoria: "Tecnología",
        img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500"
    }
];

export async function seedInitialData() {
    const connection = await pool.getConnection();
    try {
        const [countRows] = await connection.query(
            "SELECT COUNT(*) AS total FROM productos"
        );

        if (countRows[0].total === 0) {
            console.log("🌱 Insertando productos iniciales...");
            for (const p of initialProducts) {
                await connection.query(
                    `INSERT INTO productos (nombre, descripcion, precio, calificacion, categoria, img)
           VALUES (?, ?, ?, ?, ?, ?)`,
                    [p.nombre, p.descripcion, p.precio, p.calificacion, p.categoria, p.img]
                );
            }
            console.log("Productos iniciales insertados");
        } else {
            console.log("Productos ya existen, no se vuelven a insertar");
        }
    } finally {
        connection.release();
    }
}
