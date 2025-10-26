import ProductCard from "./ProductCard.jsx";
import "./../styles/home.css";

const DEFAULT_PRODUCTS = [
  { 
    id: 1, 
    nombre: "Camiseta Universitaria Clásica", 
    descripcion: "Camiseta cómoda de algodón con el logo oficial de la UIS",
    img: "/src/assets/hoodie-destacado.png",  
    precio: 45000,  
    calificacion: 4, 
    categoria: "Ropa"
  },
  { 
    id: 2, 
    nombre: "Hoodie con Capucha",
    descripcion: "Sudadera con capucha, perfecta para el clima de Bucaramanga",
    img: "/src/assets/camisa-destacado.png",  
    precio: 120000, 
    calificacion: 5, 
    categoria: "Ropa"
  },
  { 
    id: 3, 
    nombre: "Gorra Snapback",
    descripcion: "Gorra ajustable con bordado del logo UIS",
    img: "/src/assets/morral-destacado.png",   
    precio: 35000,  
    calificacion: 4, 
    categoria: "Accesorios"
  },
    {
    id: 4,
    nombre: "Gorra Snapback",
    descripcion: "Gorra ajustable con bordado del logo UIS",
    img: "/src/assets/morral-destacado.png",
    precio: 35000,
    calificacion: 4,
    categoria: "Accesorios",
 }
];

export default function FeaturedProducts({ products = DEFAULT_PRODUCTS, limit = 3 }) {
  // Limit the products to display
  const displayProducts = products.slice(0, limit);

  return (
    <section className="home-block featured">
      <div className="container">
        <header className="section-head center">
          <h2>Productos destacados</h2>
        </header>

        <div className="grid-3">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
