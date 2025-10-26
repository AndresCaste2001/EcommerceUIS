import "./../styles/home.css";

const DEFAULT_CATEGORIES = [
  { id: "ropa",       title: "Ropa",       img: "/src/assets/cat_ropa.png",       to: "/shop?cat=ropa" },
  { id: "accesorios", title: "Accesorios", img: "/src/assets/cat_accesorios.png", to: "/shop?cat=accesorios" },
  { id: "papeleria",  title: "Papelería",  img: "/src/assets/cat_papeleria.png",  to: "/shop?cat=papeleria" },
];

export default function Categories({ items = DEFAULT_CATEGORIES, onGo }) {
  return (
    <section className="home-block categories">
      <div className="container">
        <header className="section-head center pill">
          <h2>Categorías del mes</h2>
          <p className="muted">Explora las líneas destacadas y encuentra lo que necesitas.</p>
        </header>

        <div className="grid-3 categories-grid">
          {items.map((c) => (
            <article key={c.id} className="category-card">
              <a
                className="category-figure"
                href={c.to}
                onClick={(e) => {
                  if (onGo) { e.preventDefault(); onGo(c.to); }
                }}
              >
                <img className="circle" src={c.img} alt={c.title} />
              </a>

              <h5 className="category-title">{c.title}</h5>

              <div className="card-actions">
                <a
                  className="btn btn-accent"
                  href={c.to}
                  onClick={(e) => onGo && (e.preventDefault(), onGo(c.to))}
                >
                  Ir a la tienda
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
