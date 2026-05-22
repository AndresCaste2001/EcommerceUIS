import React from 'react'
import '../styles/Sidebar.css'

export default function Sidebar({ 
  selectedCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange, 
  onClearFilters,
  searchTerm,
  onSearchChange
}) {
  const categories = ['Ropa', 'Accesorios', 'Papelería', 'Hogar', 'Tecnología'];

  return (
    <aside className="sidebar-sticky">
      <div className="sidebar-card">

        <div className="card-header">
          <span>Filtros</span>
        </div>

        <div className="card-section sidebar-search">
          <input 
            type="search" 
            placeholder="Buscar producto..." 
            aria-label="Buscar productos"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="card-section sidebar-categories">
          <h6 className="section-title">Categorías</h6>
          <ul>
            {categories.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <li key={cat}>
                  <a 
                    className={`category-link${isSelected ? ' selected' : ''}`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onCategoryChange(isSelected ? '' : cat);
                    }}
                  >
                    <span>{cat}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="card-section sidebar-sorting">
          <h6 className="section-title">Ordenar por</h6>
          <select 
            className="sidebar-select"
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="">Sin ordenar</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Calificación</option>
          </select>
        </div>

        <div className="sidebar-actions">
          <button 
            className="btn btn-clear"
            onClick={onClearFilters}
          >
            Limpiar
          </button>
        </div>

      </div>
    </aside>
  )
}