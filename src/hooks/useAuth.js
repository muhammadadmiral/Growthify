// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth, getUserProfile, updateUserProfile } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Refresh user profile
  const refreshProfile = async () => {
    if (user) {
      try {
        const userProfile = await getUserProfile(user.uid);
        setProfile(userProfile);
        return userProfile;
      } catch (error) {
        console.error('Error refreshing user profile:', error);
        return null;
      }
    }
    return null;
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    if (user) {
      try {
        await updateUserProfile(user, profileData);
        return await refreshProfile();
      } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
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

    return () => unsubscribe();
  }, []);

  return { 
    user, 
    profile, 
    loading,
    isAuthenticated: !!user,
    refreshProfile,
    updateProfile
  };
};

// Authentication Redirect Hook
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