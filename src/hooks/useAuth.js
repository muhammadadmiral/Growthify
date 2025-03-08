// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth, getUserProfile } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          // Dapatkan detail profil pengguna dari Firestore
          const userProfile = await getUserProfile(authUser.uid);
          setUser(authUser);
          setProfile(userProfile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUser(authUser);
          setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    // Cleanup subscription saat komponen unmount
    return () => unsubscribe();
  }, []);

  return { 
    user, 
    profile, 
    loading,
    isAuthenticated: !!user 
  };
};

// Contoh hook untuk redirect berdasarkan autentikasi
export const useRequireAuth = (redirectPath = '/login') => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate(redirectPath);
      }
    }
  }, [user, loading, navigate, redirectPath]);

  return { user, loading };
};