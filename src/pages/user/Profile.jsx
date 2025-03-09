// src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile as updateFirebaseProfile } from 'firebase/auth';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function Profile() {
  const { isDarkMode } = useDarkMode();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    location: '',
    goals: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    gender: ''
  });
  const [stats, setStats] = useState({
    streakDays: 3,
    workoutCount: 12,
    mindfulnessMinutes: 240,
    habitsCompleted: 45
  });
  const [achievements, setAchievements] = useState([
    { id: 1, title: '3-Day Streak', icon: 'local_fire_department', date: '2025-03-06' },
    { id: 2, title: 'Early Bird', icon: 'wb_sunny', date: '2025-03-05' },
    { id: 3, title: 'Workout Warrior', icon: 'fitness_center', date: '2025-02-28' }
  ]);

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
            
            setFormData({
              displayName: auth.currentUser.displayName || userData.name || '',
              bio: userData.bio || '',
              location: userData.location || '',
              goals: userData.goals || '',
              dateOfBirth: userData.dateOfBirth || '',
              height: userData.height || '',
              weight: userData.weight || '',
              gender: userData.gender || ''
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update Firebase Auth profile
      await updateFirebaseProfile(auth.currentUser, {
        displayName: formData.displayName
      });

      // Update Firestore document
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        name: formData.displayName,
        bio: formData.bio,
        location: formData.location,
        goals: formData.goals,
        dateOfBirth: formData.dateOfBirth,
        height: formData.height,
        weight: formData.weight,
        gender: formData.gender,
        updatedAt: new Date()
      });

      // Update local state
      setUser(prev => ({
        ...prev,
        displayName: formData.displayName,
        bio: formData.bio,
        location: formData.location,
        goals: formData.goals,
        dateOfBirth: formData.dateOfBirth,
        height: formData.height,
        weight: formData.weight,
        gender: formData.gender
      }));

      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="relative">
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.displayName} 
                className="w-20 h-20 rounded-full object-cover border-2 border-primary-500"
              />
            ) : (
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${isDarkMode ? 'bg-primary-700 text-white' : 'bg-primary-500 text-white'}`}>
                {user.displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="absolute bottom-0 right-0 bg-green-500 p-1 rounded-full border-2 border-white">
              <span className="material-symbols-rounded text-white text-sm">verified</span>
            </span>
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold">{user.displayName}</h1>
            <div className="flex items-center mt-1">
              <span className="material-symbols-rounded mr-1 text-primary-500">
                military_tech
              </span>
              <span className="text-sm">Level {user.level} • {user.points} points</span>
            </div>
            {user.location && (
              <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                <span className="material-symbols-rounded mr-1">location_on</span>
                <span>{user.location}</span>
              </div>
            )}
          </div>
        </div>
        
        <div>
          {editing ? (
            <div className="flex space-x-2">
              <button
                onClick={() => setEditing(false)}
                className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className={`px-4 py-2 rounded-lg flex items-center ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
            >
              <span className="material-symbols-rounded mr-1">edit</span>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - User info */}
        <div className="lg:col-span-2">
          <div className={`rounded-xl shadow-sm overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mb-6`}>
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Profile Information</h2>
              {editing ? (
                <span className="text-primary-500 text-sm">Editing</span>
              ) : null}
            </div>
            
            {editing ? (
              <form className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="displayName">
                      Display Name
                    </label>
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      className={`w-full rounded-lg p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="location">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full rounded-lg p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="dateOfBirth">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className={`w-full rounded-lg p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="gender">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full rounded-lg p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border`}
                    >
                      <option value="">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-binary</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="height">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      id="height"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className={`w-full rounded-lg p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="weight">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className={`w-full rounded-lg p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border`}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="bio">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="3"
                    value={formData.bio}
                    onChange={handleChange}
                    className={`w-full rounded-lg p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border`}
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="goals">
                    Personal Goals
                  </label>
                  <textarea
                    id="goals"
                    name="goals"
                    rows="2"
                    value={formData.goals}
                    onChange={handleChange}
                    className={`w-full rounded-lg p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border`}
                  ></textarea>
                </div>
              </form>
            ) : (
              <div className="p-6 space-y-6">
                {user.bio && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Bio</h3>
                    <p>{user.bio}</p>
                  </div>
                )}
                
                {user.goals && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Goals</h3>
                    <p>{user.goals}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h3>
                    <p>{user.email}</p>
                  </div>
                  
                  {user.dateOfBirth && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Date of Birth</h3>
                      <p>{user.dateOfBirth}</p>
                    </div>
                  )}
                  
                  {user.gender && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Gender</h3>
                      <p>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</p>
                    </div>
                  )}
                  
                  {user.height && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Height</h3>
                      <p>{user.height} cm</p>
                    </div>
                  )}
                  
                  {user.weight && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Weight</h3>
                      <p>{user.weight} kg</p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Member Since</h3>
                    <p>{new Date(user.createdAt.toDate ? user.createdAt.toDate() : user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* User stats */}
          <div className={`rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mb-6`}>
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <h2 className="text-xl font-semibold">Activity Stats</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center">
                    <span className={`p-2 rounded-full ${isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-500'}`}>
                      <span className="material-symbols-rounded">local_fire_department</span>
                    </span>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
                      <h3 className="text-xl font-bold">{stats.streakDays} days</h3>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center">
                    <span className={`p-2 rounded-full ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-500'}`}>
                      <span className="material-symbols-rounded">fitness_center</span>
                    </span>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Workouts</p>
                      <h3 className="text-xl font-bold">{stats.workoutCount}</h3>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center">
                    <span className={`p-2 rounded-full ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-500'}`}>
                      <span className="material-symbols-rounded">self_improvement</span>
                    </span>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Mindfulness</p>
                      <h3 className="text-xl font-bold">{stats.mindfulnessMinutes} min</h3>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center">
                    <span className={`p-2 rounded-full ${isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-500'}`}>
                      <span className="material-symbols-rounded">task_alt</span>
                    </span>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Habits Completed</p>
                      <h3 className="text-xl font-bold">{stats.habitsCompleted}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Achievements */}
        <div>
          <div className={`rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mb-6`}>
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <h2 className="text-xl font-semibold">Recent Achievements</h2>
            </div>
            
            <div className="p-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`flex items-center p-3 mb-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
                  <div className={`p-2 rounded-full ${isDarkMode ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-100 text-primary-500'}`}>
                    <span className="material-symbols-rounded">{achievement.icon}</span>
                  </div>
                  <div className="ml-3 flex-grow">
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(achievement.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-yellow-500">
                    <span className="material-symbols-rounded">emoji_events</span>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 text-center">
                <button className={`text-primary-500 text-sm hover:underline font-medium flex items-center justify-center mx-auto`}>
                  View All Achievements
                  <span className="material-symbols-rounded ml-1">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Membership card */}
          <div className={`rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}>
            <div className="relative h-40">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800">
                <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ 
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
                }}></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm opacity-80 font-medium">Membership</p>
                    <h3 className="text-xl font-bold">Free Plan</h3>
                  </div>
                  <div className="flex items-center">
                    <span className="material-symbols-rounded mr-1">workspace_premium</span>
                    <span className="text-sm">Basic</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Unlock premium features to accelerate your growth journey.
              </p>
              <button className="w-full py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}