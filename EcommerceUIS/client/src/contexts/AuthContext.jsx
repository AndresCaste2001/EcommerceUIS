import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if token exists in localStorage
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                // Verify token is still valid by calling /auth/me
                verifyToken(token);
            }
        } catch (err) {
            console.error('Auth initialization error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    async function verifyToken(token) {
        try {
            const response = await fetch(`${API_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                localStorage.removeItem('authToken');
                setUser(null);
            }
        } catch (err) {
            console.error('Token verification error:', err);
            localStorage.removeItem('authToken');
            setUser(null);
        }
    }

    async function login({ username, password }) {
        if (!username || !password) {
            throw new Error('Usuario y contraseña son requeridos');
        }

        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        localStorage.setItem('authToken', data.token);
        setUser(data.user);
        return data;
    }

    async function register({ username, email, password, passwordConfirm }) {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, passwordConfirm })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }

        localStorage.setItem('authToken', data.token);
        setUser(data.user);
        return data;
    }

    function logout() {
        localStorage.removeItem('authToken');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}