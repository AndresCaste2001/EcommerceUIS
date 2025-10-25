import React from 'react'
import '../styles/Sidebar.css'

export default function Sidebar() {
  return (
    <aside className="sidebar-sticky">
      <div className="sidebar-card">
        <div className="card-header">
          <span>Filtros</span>
          <small className="category-count">3</small>
        </div>

        <div className="card-section sidebar-search">
          <input type="search" placeholder="Buscar producto..." aria-label="Buscar productos" />
          <button className="btn">OK</button>
        </div>

        <div className="card-section sidebar-categories">
          <h6>Categorías</h6>
          <ul>
            <li><a className="category-link" href="#"><span>Ropa</span><span className="category-count">12</span></a></li>
            <li><a className="category-link" href="#"><span>Accesorios</span><span className="category-count">7</span></a></li>
            <li><a className="category-link" href="#"><span>Papelería</span><span className="category-count">5</span></a></li>
          </ul>
        </div>

        <div className="card-section sidebar-price">
          <h6>Precio</h6>
          <div className="range-row">
            <input type="range" min="0" max="100000" />
          </div>
          <div className="price-values">
            <span>0</span><span>100.000</span>
          </div>
        </div>

        <div className="sidebar-actions">
          <button className="btn btn-clear">Limpiar</button>
          <button className="btn btn-apply">Aplicar</button>
        </div>
      </div>
    </aside>
  )
}