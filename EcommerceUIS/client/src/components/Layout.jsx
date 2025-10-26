import Header from './Header.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'

export default function Layout() {
  return (
      <div className="d-flex flex-column min-vh-100">
          <Header />
          <main>
              <Outlet />
          </main>
          <Footer />
      </div>
  );
}