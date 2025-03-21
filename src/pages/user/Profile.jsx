// src/pages/user/Profile.jsx
import { useState, useEffect } from 'react';
import { auth, db, getUserProfile } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useDarkMode } from '../../contexts/DarkModeContext';

// Import modular components
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileInformation from '../../components/profile/ProfileInformation';
import ProfileStats from '../../components/profile/ProfileStats';
import ProfileQuickActions from '../../components/profile/ProfileQuickActions';
import ProfileMembership from '../../components/profile/ProfileMembership';
import ProfileImageModal from '../../components/profile/ProfileImageModal';

export default function Profile() {
  const { isDarkMode } = useDarkMode();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    streakDays: 0,
    workoutCount: 0,
    mindfulnessMinutes: 0,
    habitsCompleted: 0
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: auth.currentUser.uid,
              email: auth.currentUser.email,
              displayName: auth.currentUser.displayName || userData.name || 'User',
              photoURL: auth.currentUser.photoURL,
              bio: userData.bio || '',
              location: userData.location || '',
              goals: userData.goals || '',
              dateOfBirth: userData.dateOfBirth || '',
              height: userData.height || '',
              weight: userData.weight || '',
              gender: userData.gender || '',
              createdAt: userData.createdAt || new Date(),
              level: userData.level || 1,
              points: userData.points || 0
            });
            
            // Set stats if available
            if (userData.stats) {
              setStats({
                streakDays: userData.stats.streakDays || 0,
                workoutCount: userData.stats.workoutCount || 0,
                mindfulnessMinutes: userData.stats.mindfulnessMinutes || 0,
                habitsCompleted: userData.stats.habitsCompleted || 0
              });
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold mb-2">User Not Found</h2>
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  // Update user data after profile edit
  const handleUserUpdate = (updatedData) => {
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Image Modal */}
      <ProfileImageModal 
        isOpen={isImageModalOpen} 
        onClose={() => setIsImageModalOpen(false)}
        currentPhotoURL={user?.photoURL}
        isDarkMode={isDarkMode}
      />

      {/* Profile Header */}
      <ProfileHeader 
        user={user} 
        isDarkMode={isDarkMode} 
        onImageEdit={() => setIsImageModalOpen(true)} 
      />
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - User info */}
        <div className="lg:col-span-2">
          {/* Profile Information */}
          <ProfileInformation 
            user={user} 
            isDarkMode={isDarkMode} 
            onUserUpdate={handleUserUpdate} 
          />
          
          {/* User Activity Stats */}
          <ProfileStats 
            stats={stats} 
            isDarkMode={isDarkMode} 
          />
        </div>
        
        {/* Right column */}
        <div>
          {/* Quick Actions */}
          <ProfileQuickActions 
            isDarkMode={isDarkMode} 
          />
          
          {/* Membership Card */}
          <ProfileMembership 
            isDarkMode={isDarkMode} 
          />
        </div>
      </div>
    </div>
  );
}