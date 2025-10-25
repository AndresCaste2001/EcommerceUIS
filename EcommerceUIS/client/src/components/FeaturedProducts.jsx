import "./../styles/home.css";

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    title: "Camiseta Universitaria Clásica",
    img: "/src/assets/feat-camisa.jpg", //image 1
    price: 45000,
    rating: 4,
    reviews: 24,
    to: "/shop?sku=camiseta-clasica", 
  },
  {
    id: 2,
    title: "Hoodie con Capucha",
    img: "/src/assets/feat-hoodie.jpg", //image 2
    price: 120000,
    rating: 5,
    reviews: 48,
    to: "/shop?sku=hoodie",
  },
  {
    id: 3,
    title: "Gorra Snapback",
    img: "/src/assets/feat-gorra.jpg", // image 3
    price: 35000,
    rating: 4,
    reviews: 74,
    to: "/shop?sku=gorra",
  },
];

function Stars({ value = 0, max = 5 }) {
  return (
    <span className="stars" aria-label={`Calificación ${value} de ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          className={`star ${i < value ? "on" : ""}`}
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path d="M12 17.3l-6.16 3.7 1.64-6.98L2 8.9l7.02-.6L12 1.5l2.98 6.8 7.02.6-5.48 5.12 1.64 6.98z" />
        </svg>
      ))}
    </span>
  );
}

export default function FeaturedProducts({ products = DEFAULT_PRODUCTS }) {
  return (
    <section className="home-block featured">
      <div className="container">
        <header className="section-head center">
          <h2>Productos destacados</h2>
          <p className="muted">
            Selección curada con la mejor relación calidad/precio.
          </p>
        </header>

        <div className="grid-3">
          {products.map((p) => (
            <article key={p.id} className="card">
              <a href={p.to}>
                <img className="card-img" src={p.img} alt={p.title} />
              </a>
              <div className="card-body">
                <div className="card-top">
                  <Stars value={p.rating} />
                  <span className="price">
                    {p.price.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <a className="card-title" href={p.to}>{p.title}</a>
                <p className="muted small">Reseñas ({p.reviews})</p>
                <div className="card-actions">
                  <a className="btn btn-outline" href={p.to}>Ver detalle</a>
                  <button className="btn btn-accent">Agregar</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
