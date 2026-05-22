import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [count, setCount] = useState(0);

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('cart');
            if (saved) {
                const items = JSON.parse(saved);
                setCart(items);
                setCount(items.length);
            }
        } catch (err) {
            console.error('Error loading cart:', err);
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        setCount(cart.length);
    }, [cart]);

    function addToCart(product, quantity = 1) {
        setCart(prevCart => {
            const existing = prevCart.find(item => item.id === product.id);
            if (existing) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, cantidad: item.cantidad + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, cantidad: quantity }];
        });
    }

    function removeFromCart(productId) {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    }

    function updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === productId ? { ...item, cantidad: quantity } : item
                )
            );
        }
    }

    function clearCart() {
        setCart([]);
    }

    function getTotal() {
        return cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }

    return (
        <CartContext.Provider value={{
            cart,
            count,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getTotal
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}