// src/components/route/ProtectedRoute.jsx
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth, checkProfileCompletion } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProtectedRoute({ children }) {
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: false,
    isProfileCompleted: false,
    isLoading: true
  });
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const isProfileComplete = await checkProfileCompletion(user.uid);
          setAuthStatus({
            isAuthenticated: true,
            isProfileCompleted: isProfileComplete,
            isLoading: false
          });
        } catch (error) {
          console.error('Error checking profile:', error);
          setAuthStatus({
            isAuthenticated: true,
            isProfileCompleted: false,
            isLoading: false
          });
        }
      } else {
        setAuthStatus({
          isAuthenticated: false,
          isProfileCompleted: false,
          isLoading: false
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Tampilkan loading jika masih memeriksa status
  if (authStatus.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500"></div>
      </div>
    );
  }

  // Jika tidak terotentikasi, arahkan ke login
  if (!authStatus.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika terotentikasi tapi profil belum lengkap, arahkan ke complete profile
  if (!authStatus.isProfileCompleted) {
    return <Navigate to="/complete-profile" state={{ from: location }} replace />;
  }

  // Jika sudah lengkap, tampilkan children (halaman yang diminta)
  return children;
}