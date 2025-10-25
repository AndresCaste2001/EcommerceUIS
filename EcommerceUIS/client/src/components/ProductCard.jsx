import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ProductCard.css";
import { useCart } from '../contexts/CartContext.jsx';
import React from 'react';

export default function ProductCard({ product }) {
  const { nombre, descripcion, precio, calificacion, categoria, img } = product;
  const fmtPrice = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(precio);
  const { addToCart } = useCart();

  return (
    <article className="card product-card card h-100">
      <img src={img} className="card-img-top" alt={nombre} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{nombre}</h5>
        <p className="rating small mb-2">{categoria} · {calificacion} ★</p>
        <p className="card-text flex-grow-1" style={{ fontSize: 14 }}>{descripcion?.slice(0, 120)}{descripcion?.length > 120 ? '…' : ''}</p>
        <div className="mt-3 d-flex justify-content-between align-items-center">
          <strong>{fmtPrice}</strong>
          <button className="btn btn-sm btn-outline-primary" onClick={() => addToCart(product)} aria-label={`Agregar ${nombre}`}>Agregar</button >
        </div>
      </div>
    </article>
  );
}
