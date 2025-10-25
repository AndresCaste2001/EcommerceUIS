import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    // redirect to login and keep the location the user attempted
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}