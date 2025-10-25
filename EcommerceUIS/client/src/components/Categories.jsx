import "./../styles/home.css";

const DEFAULT_CATEGORIES = [
  {
    id: "ropa",
    title: "Ropa",
    img: "/src/assets/cat-ropa.jpg", //image 1 circular
    to: "/shop?cat=ropa",
  },
  {
    id: "accesorios",
    title: "Accesorios",
    img: "/src/assets/cat-accesorios.jpg", //image 2
    to: "/shop?cat=accesorios",
  },
  {
    id: "papeleria",
    title: "Papelería",
    img: "/src/assets/cat-papeleria.jpg", // imagen 3
    to: "/shop?cat=papeleria",
  },
];

export default function Categories({ items = DEFAULT_CATEGORIES, onGo }) {
  return (
    <section className="home-block categories container">
      <header className="section-head">
        <h2>Categorías del mes</h2>
        <p className="muted">
          Explora las líneas destacadas y encuentra lo que necesitas.
        </p>
      </header>

      <div className="grid-3">
        {items.map((c) => (
          <article key={c.id} className="category-card">
            <a
              href={c.to}
              onClick={(e) => {
                if (onGo) {
                  e.preventDefault();
                  onGo(c.to);
                }
              }}
            >
              <img className="circle" src={c.img} alt={c.title} />
            </a>
            <h5>{c.title}</h5>
            <p>
              <a className="btn btn-accent" href={c.to} onClick={(e) => onGo && (e.preventDefault(), onGo(c.to))}>
                Ir a la tienda
              </a>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
