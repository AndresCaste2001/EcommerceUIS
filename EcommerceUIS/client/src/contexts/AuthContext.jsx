import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const VALID_CREDENTIALS = {
    username: 'admin',
    password: '1234'
};


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth');
      if (raw) {
        const data = JSON.parse(raw);
        setUser(data.user);
      }
    } catch { /* ignore */ }
  }, []);

  async function login({ username, password }) {
    // Validate credentials
    if (!username || !password) {
      throw new Error('Usuario y contraseña son requeridos');
    }

    // Check against hardcoded credentials
    if (username !== VALID_CREDENTIALS.username || password !== VALID_CREDENTIALS.password) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));

    const payload = { 
      user: { username }
    };
    
    localStorage.setItem('auth', JSON.stringify(payload));
    setUser(payload.user);
    return payload;
  }

  function logout() {
    localStorage.removeItem('auth');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}