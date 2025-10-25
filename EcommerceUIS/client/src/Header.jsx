import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
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
                    318 384 5641
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

        <nav className="col-6 d-flex justify-content-center">
          <ul className='d-flex gap-4 mb-0'>
            <li><a href="#" className='nav-link'>Inicio</a></li>
            <li><a href="#" className='nav-link'>Nosotros</a></li>
            <li><a href="#" className='nav-link'>Tienda</a></li>
            <li><a href="#" className='nav-link'>Contacto</a></li>
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

            <div className="nav-icons d-flex gap-3">
              <a href="#" className="icon-link position-relative" aria-label="Carrito de compras">
                <i className="fas fa-shopping-cart"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">3</span>
              </a>
              <a href="#" className="icon-link position-relative" aria-label="Perfil de usuario">
                <i className="fas fa-user"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">2</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;