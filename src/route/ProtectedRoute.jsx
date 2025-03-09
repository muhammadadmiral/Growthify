// src/components/route/ProtectedRoute.jsx
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import LoadingFallback from '../common/LoadingFallback';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: false,
    isProfileCompleted: false,
    isAdmin: false,
    isLoading: true
  });
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Check Firestore for user data including profile completion and admin status
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setAuthStatus({
              isAuthenticated: true,
              isProfileCompleted: userData.profileCompleted === true,
              isAdmin: userData.role === 'admin',
              isLoading: false
            });
          } else {
            // User exists in auth but not in Firestore
            setAuthStatus({
              isAuthenticated: true,
              isProfileCompleted: false,
              isAdmin: false,
              isLoading: false
            });
          }
        } catch (error) {
          console.error('Error in ProtectedRoute:', error);
          setAuthStatus({
            isAuthenticated: true,
            isProfileCompleted: false,
            isAdmin: false,
            isLoading: false
          });
        }
      } else {
        // No authenticated user
        setAuthStatus({
          isAuthenticated: false,
          isProfileCompleted: false,
          isAdmin: false,
          isLoading: false
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Loading state
  if (authStatus.isLoading) {
    return <LoadingFallback />;
  }

  // Not authenticated
  if (!authStatus.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Profile not completed
  if (!authStatus.isProfileCompleted) {
    return <Navigate to="/complete-profile" state={{ from: location.pathname }} replace />;
  }

  // Admin check if required
  if (requireAdmin && !authStatus.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Authenticated and profile complete
  return children;
}