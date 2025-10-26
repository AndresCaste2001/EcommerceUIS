import { useEffect, useState, useMemo } from "react";
import "./../styles/home.css";

const DEFAULT_SLIDES = [
  {
    id: 1,
    title: <>UIS <span className="accent">E-Commerce</span></>,
    subtitle: "Compra oficial universitaria",
    text: "Merch institucional, papelería y accesorios con envío local.",
    img: "/src/assets/hoodie1.jpg",
  },
  {
    id: 2,
    title: "Ropa y accesorios",
    subtitle: "Diseños actuales",
    text: "Prendas cómodas y resistentes para el día a día universitario.",
    img: "/src/assets/cap1.jpg",
  },
  {
    id: 3,
    title: "Papelería UIS",
    subtitle: "Todo para tus clases",
    text: "Cuadernos, planners y kits con identidad UIS.",
    img: "/src/assets/cartuchera_morral.jpg",
  },
];

export default function Carousel({ slides = DEFAULT_SLIDES, interval = 6000 }) {
  const [current, setCurrent] = useState(0);
  const last = useMemo(() => slides.length - 1, [slides.length]);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((i) => (i === last ? 0 : i + 1));
    }, interval);
    return () => clearInterval(id);
  }, [interval, last]);

  const go = (dir) => {
    setCurrent((i) => {
      if (dir === "prev") return i === 0 ? last : i - 1;
      return i === last ? 0 : i + 1;
    });
  };

  return (
    <section className="home-block hero">
      <div className="hero-inner">
        {slides.map((s, i) => (
          <article
            key={s.id}
            className={`hero-slide ${i === current ? "is-active" : ""}`}
            aria-hidden={i !== current}
          >
            <div className="hero-media">
              <img src={s.img} alt={typeof s.title === "string" ? s.title : "slide"} />
            </div>
            <div className="hero-copy">
              <h1 className="hero-title">{s.title}</h1>
              <h3 className="hero-sub">{s.subtitle}</h3>
              <p className="muted">{s.text}</p>
            </div>
          </article>
        ))}

        <button className="hero-nav prev" onClick={() => go("prev")} aria-label="Anterior">‹</button>
        <button className="hero-nav next" onClick={() => go("next")} aria-label="Siguiente">›</button>

        <div className="hero-dots" role="tablist">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? "is-active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
