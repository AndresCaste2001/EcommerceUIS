import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Shop from '../pages/Shop.jsx'
import Contact from '../pages/Contact.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="nosotros" element={<About />} />
        <Route path="tienda" element={<Shop />} />
        <Route path="contacto" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

