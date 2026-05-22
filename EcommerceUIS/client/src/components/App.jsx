import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Shop from '../pages/Shop.jsx'
import Contact from '../pages/Contact.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Cart from '../pages/Cart.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* protected routes */}
        <Route
          path="nosotros"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="tienda"
          element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          }
        />

        <Route
          path="contacto"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cart" element={<Cart />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

