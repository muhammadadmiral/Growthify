// src/components/route/ProtectedRoute.jsx
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

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
          // Directly check Firestore for profile completion
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);

          console.log('User Firestore Data:', userSnap.data()); // Debug log

          const isProfileComplete = userSnap.exists() 
            ? userSnap.data().profileCompleted === true 
            : false;
          
          console.log('Profile Completed:', isProfileComplete); // Debug log

          setAuthStatus({
            isAuthenticated: true,
            isProfileCompleted: isProfileComplete,
            isLoading: false
          });
        } catch (error) {
          console.error('Error in ProtectedRoute:', error);
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

  // Loading state
  if (authStatus.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500"></div>
      </div>
    );
  }

  // Not authenticated
  if (!authStatus.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Profile not completed
  if (!authStatus.isProfileCompleted) {
    return <Navigate to="/complete-profile" state={{ from: location }} replace />;
  }

  // Authenticated and profile complete
  return children;
}