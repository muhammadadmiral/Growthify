// src/components/route/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Mock authentication check - replace with your actual auth logic
  const isAuthenticated = () => {
    // In a real app, check localStorage, context, or auth state
    return localStorage.getItem('growthify_auth_token') !== null;
  };

  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
}