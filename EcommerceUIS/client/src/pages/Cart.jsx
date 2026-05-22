import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import '../styles/Cart.css';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleCheckout() {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        if (cart.length === 0) {
            setError('El carrito está vacío');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('authToken');
            const items = cart.map(item => ({
                productoId: item.id,
                cantidad: item.cantidad
            }));

            const response = await fetch('http://localhost:3000/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ items })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al crear el pedido');
            }

            // Clear cart and show success
            clearCart();
            alert(`¡Pedido creado exitosamente! ID: ${data.id}`);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Error procesando el pedido');
        } finally {
            setLoading(false);
        }
    }

    if (cart.length === 0) {
        return (
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <i className="fas fa-shopping-cart" style={{ fontSize: '4rem', color: '#98a0ad', marginBottom: '1rem' }}></i>
                        <h3 style={{ color: '#e6eef8' }}>Tu carrito está vacío</h3>
                        <p style={{ color: '#98a0ad' }}>Agrega productos para empezar a comprar</p>
                        <button 
                            className="btn btn-primary mt-3"
                            onClick={() => navigate('/tienda')}
                        >
                            Ir a la tienda
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const total = getTotal();

    return (
        <div className="container py-5">
            <h2 style={{ color: '#e6eef8', marginBottom: '2rem' }}>Carrito de compras</h2>

            <div className="row">
                {/* Cart Items */}
                <div className="col-lg-8">
                    <div className="cart-items">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.img} alt={item.nombre} />
                                </div>

                                <div className="cart-item-details">
                                    <h5 style={{ color: '#e6eef8' }}>{item.nombre}</h5>
                                    <p style={{ color: '#98a0ad', fontSize: '0.9rem' }}>
                                        {item.descripcion.substring(0, 80)}...
                                    </p>
                                    <p style={{ color: '#228534', fontWeight: 'bold' }}>
                                        ${item.precio.toLocaleString('es-CO')}
                                    </p>
                                </div>

                                <div className="cart-item-quantity">
                                    <button
                                        className="btn-quantity"
                                        onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        value={item.cantidad}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value) || 1;
                                            if (val > 0) updateQuantity(item.id, val);
                                        }}
                                        className="quantity-input"
                                    />
                                    <button
                                        className="btn-quantity"
                                        onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="cart-item-subtotal">
                                    <p style={{ color: '#e6eef8', fontWeight: 'bold' }}>
                                        ${(item.precio * item.cantidad).toLocaleString('es-CO')}
                                    </p>
                                </div>

                                <button
                                    className="btn-remove"
                                    onClick={() => removeFromCart(item.id)}
                                    aria-label="Remover del carrito"
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        className="btn btn-outline-danger mt-3"
                        onClick={clearCart}
                    >
                        Limpiar carrito
                    </button>
                </div>

                {/* Cart Summary */}
                <div className="col-lg-4">
                    <div className="cart-summary">
                        <h4 style={{ color: '#e6eef8', marginBottom: '1.5rem' }}>Resumen del pedido</h4>

                        <div className="summary-row">
                            <span style={{ color: '#98a0ad' }}>Subtotal:</span>
                            <span style={{ color: '#e6eef8' }}>
                                ${total.toLocaleString('es-CO')}
                            </span>
                        </div>

                        <div className="summary-row">
                            <span style={{ color: '#98a0ad' }}>Envío:</span>
                            <span style={{ color: '#228534' }}>Gratis</span>
                        </div>

                        <div className="summary-row" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginTop: '1rem' }}>
                            <span style={{ color: '#e6eef8', fontWeight: 'bold', fontSize: '1.1rem' }}>Total:</span>
                            <span style={{ color: '#228534', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                ${total.toLocaleString('es-CO')}
                            </span>
                        </div>

                        {error && (
                            <div className="alert alert-danger mt-3">{error}</div>
                        )}

                        <button
                            className="btn btn-success w-100 mt-3"
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading ? 'Procesando...' : (isAuthenticated ? 'Confirmar compra' : 'Inicia sesión para comprar')}
                        </button>

                        <button
                            className="btn btn-outline-secondary w-100 mt-2"
                            onClick={() => navigate('/tienda')}
                        >
                            Seguir comprando
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}