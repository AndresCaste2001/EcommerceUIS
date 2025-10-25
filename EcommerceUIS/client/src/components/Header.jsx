import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Header.css';
import { NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';

function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className='d-flex justify-content-between align-items-center'>
        <ul className='list-unstyled d-flex gap-3 mb-0'>
            <li>    
                <a href="mailto:info@uis.edu.co">
                    <i className="fa fa-envelope mx-2"></i>
                    info@uis.edu.co
                </a>
            </li>
            <li>
                <a href="tel:3183845641">
                    <i className="fa fa-phone mx-2"></i>
                    3112765058
                </a>
            </li>
        </ul>
        <ul className="list-unstyled d-flex gap-3 mb-0">
            <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                </a>
            </li>
            <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                </a>
            </li>
            <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                </a>
            </li>
        </ul>
      </div>
      
      <div className='container-fluid d-flex justify-content-between align-items-center headerLogo'>
        <div className="col-3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Universidad_Industrial_de_Santander_logo.svg/2560px-Universidad_Industrial_de_Santander_logo.svg.png" alt="Logo UIS" />
        </div>

        <nav className="col-6 d-none d-md-flex justify-content-center">
          <ul className='d-flex gap-4 mb-0'>
             <li><NavLink to="/" className='nav-link'>Inicio</NavLink></li>
            <li><NavLink to="/nosotros" className='nav-link'>Nosotros</NavLink></li>
            <li><NavLink to="/tienda" className='nav-link'>Tienda</NavLink></li>
            <li><NavLink to="/contacto" className='nav-link'>Contacto</NavLink></li>
          </ul>
        </nav>

        <div className="col-3">
          <div className="d-flex align-items-center gap-3 justify-content-end">
            <div className="search-box d-none d-lg-flex">
              <input type="search" className="form-control" placeholder="Buscar..." aria-label="Buscar" />
              <button className="btn" aria-label="Realizar búsqueda">
                <i className="fas fa-search"></i>
              </button>
            </div>

            <div className="nav-icons d-none d-md-flex gap-3">
              <a href="#" className="icon-link position-relative" aria-label="Carrito de compras">
                <i className="fas fa-shopping-cart"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">{count}</span>
              </a>
              <a href="#" className="icon-link position-relative" aria-label="Perfil de usuario">
                <i className="fas fa-user"></i>
              </a>
            </div>
          </div>
        </div>
      {/* Mobile hamburger */}
        <button
          className={`mobile-toggle d-md-none ${open ? 'is-open' : ''}`}
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="hamburger" />
        </button>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className={`mobile-menu d-md-none ${open ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="mobile-menu-inner">
          <ul className="mobile-nav-list">
            <li><NavLink onClick={() => setOpen(false)} to="/" className="mobile-nav-link">Inicio</NavLink></li>
            <li><NavLink onClick={() => setOpen(false)} to="/nosotros" className="mobile-nav-link">Nosotros</NavLink></li>
            <li><NavLink onClick={() => setOpen(false)} to="/tienda" className="mobile-nav-link">Tienda</NavLink></li>
            <li><NavLink onClick={() => setOpen(false)} to="/contacto" className="mobile-nav-link">Contacto</NavLink></li>
          </ul>

          <div className="mobile-actions">
            <NavLink onClick={() => setOpen(false)} to="/cart" className="mobile-action">
              <i className="fas fa-shopping-cart"></i>
              <span>Carrito</span>
              <span className="badge-counter ms-auto">{count}</span>
            </NavLink>

            <NavLink onClick={() => setOpen(false)} to="/login" className="mobile-action">
              <i className="fas fa-user"></i>
              <span>Iniciar sesión</span>
            </NavLink>
          </div>

          <button className="mobile-close" onClick={() => setOpen(false)} aria-label="Cerrar menú">Cerrar</button>
        </div>
      </div>
    </header>
  );
}
export default Header;