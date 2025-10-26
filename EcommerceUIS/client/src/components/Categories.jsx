import { Link } from "react-router-dom";
import "./../styles/home.css";

const DEFAULT_CATEGORIES = [
  { id: "ropa",       title: "Ropa",       img: "/src/assets/cat_ropa.png",       to: "/tienda" },
  { id: "accesorios", title: "Accesorios", img: "/src/assets/cat_accesorios.png", to: "/tienda" },
  { id: "papeleria",  title: "Papelería",  img: "/src/assets/cat_papeleria.png",  to: "/tienda" },
];

export default function Categories({ items = DEFAULT_CATEGORIES }) {
  return (
    <section className="home-block categories">
      <div className="container">
        <header className="section-head center pill">
          <h2>Categorías del mes</h2>
        </header>

        <div className="grid-3 categories-grid">
          {items.map((c) => (
            <article key={c.id} className="category-card">
              <Link className="category-figure" to={c.to}>
                <img className="circle" src={c.img} alt={c.title} />
              </Link>

              <h5 className="category-title">{c.title}</h5>

              <div className="card-actions">
                <Link className="btn btn-accent" to={c.to}>
                  Ir a la tienda
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
