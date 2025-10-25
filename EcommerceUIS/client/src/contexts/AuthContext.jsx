import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth');
      if (raw) setUser(JSON.parse(raw).user);
    } catch { /* ignore */ }
  }, []);

  async function login({ username, password }) {
    // mock async login - accept any non-empty username
    if (!username) throw new Error('Username required');
    const fakeToken = 'fake-token-' + Date.now();
    const payload = { user: { username }, token: fakeToken };
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