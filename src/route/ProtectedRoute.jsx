// src/components/route/ProtectedRoute.jsx
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../config/firebase';
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
          // Create a function to check profile completion
          const checkProfileCompletion = async (uid) => {
            const response = await fetch(`/api/users/${uid}/profile-status`);
            if (!response.ok) {
              throw new Error('Failed to check profile status');
            }
            const data = await response.json();
            return data.isComplete;
          };
          
          // Use the function to check profile completion
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

  // Show loading state while checking auth status
  if (authStatus.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!authStatus.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to complete profile if authenticated but profile not completed
  if (!authStatus.isProfileCompleted) {
    return <Navigate to="/complete-profile" state={{ from: location }} replace />;
  }

  // If authenticated and profile is complete, render the children
  return children;
}