import React from 'react';
import '../styles/Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer bg-dark text-white mt-auto">
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h5>Ecommerce UIS</h5>
                        <p className="mb-0">Tu tienda de confianza</p>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h6>Enlaces</h6>
                        <ul className="list-unstyled">
                            <li><NavLink to="/" className='nav-link'>Inicio</NavLink></li>
                            <li><NavLink to="/nosotros" className='nav-link'>Nosotros</NavLink></li>
                            <li><NavLink to="/tienda" className='nav-link'>Tienda</NavLink></li>
                            <li><NavLink to="/contacto" className='nav-link'>Contacto</NavLink></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h6>Contacto</h6>
                        <p className="mb-1">Email: info@ecommerceuIS.com</p>
                        <p className="mb-0">Tel: (123) 456-7890</p>
                    </div>
                </div>
                <hr className="bg-secondary" />
                <div className="text-center text-muted">
                    <small>&copy; 2025 Ecommerce UIS. Todos los derechos reservados.</small>
                </div>
            </div>
        </footer>
    );
}