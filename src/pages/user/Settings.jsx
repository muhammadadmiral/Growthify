// src/pages/user/Settings.jsx
import { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Settings() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { language, setLanguage } = useLanguage();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('account');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    achievements: true,
    reminders: true,
    tips: true,
    marketing: false
  });
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    activitySharing: true,
    dataCollection: true
  });
  
  // Password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
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
              // Fetch saved settings if they exist
              notificationSettings: userData.notificationSettings || notificationSettings,
              privacySettings: userData.privacySettings || privacySettings
            });
            
            // Update state with user's saved settings
            if (userData.notificationSettings) {
              setNotificationSettings(userData.notificationSettings);
            }
            if (userData.privacySettings) {
              setPrivacySettings(userData.privacySettings);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setErrorMessage("Failed to load user settings. Please try again later.");
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  // Handle notification toggle changes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle privacy settings changes
  const handlePrivacyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save notification settings
  const saveNotificationSettings = async () => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        notificationSettings
      });
      setSuccessMessage("Notification settings updated successfully!");
    } catch (error) {
      console.error("Error updating notification settings:", error);
      setErrorMessage("Failed to update notification settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Save privacy settings
  const savePrivacySettings = async () => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        privacySettings
      });
      setSuccessMessage("Privacy settings updated successfully!");
    } catch (error) {
      console.error("Error updating privacy settings:", error);
      setErrorMessage("Failed to update privacy settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage("New passwords don't match.");
      setLoading(false);
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    
    try {
      // Re-authenticate user before changing password
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        passwordData.currentPassword
      );
      
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // Update password
      await updatePassword(auth.currentUser, passwordData.newPassword);
      
      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setSuccessMessage("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.code === 'auth/wrong-password') {
        setErrorMessage("Current password is incorrect.");
      } else {
        setErrorMessage("Failed to change password. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Toggle language
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setSuccessMessage("Language updated successfully!");
  };

  if (loading && !user) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        {successMessage && (
          <div className={`mb-4 p-3 rounded-lg bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400`}>
            {successMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className={`mb-4 p-3 rounded-lg bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400`}>
            {errorMessage}
          </div>
        )}
        
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('account')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'account'
                ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <span className="material-symbols-rounded align-middle mr-1">person</span>
            Account
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'notifications'
                ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <span className="material-symbols-rounded align-middle mr-1">notifications</span>
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <span className="material-symbols-rounded align-middle mr-1">security</span>
            Privacy
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'appearance'
                ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <span className="material-symbols-rounded align-middle mr-1">palette</span>
            Appearance
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <span className="material-symbols-rounded align-middle mr-1">lock</span>
            Security
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              
              <div className="mb-8">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Manage your account settings and email preferences.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <div className="flex">
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600"
                      />
                      <button className="ml-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        Change
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Your email address is also your login ID
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Account Type</label>
                    <div className="flex items-center">
                      <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center">
                        <span className="text-gray-700 dark:text-gray-300">Free Plan</span>
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300">Basic</span>
                      </div>
                      <button className="ml-2 px-3 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors">
                        Upgrade
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Language</label>
                    <select
                      value={language}
                      onChange={handleLanguageChange}
                      className="w-full rounded-lg px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    >
                      <option value="en">English</option>
                      <option value="id">Bahasa Indonesia</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">Danger Zone</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap justify-between items-center gap-4 p-4 border border-red-200 dark:border-red-900/50 rounded-lg bg-red-50 dark:bg-red-900/20">
                    <div>
                      <h4 className="font-medium">Deactivate Account</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Temporarily disable your account. You can reactivate anytime.
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg transition-colors">
                      Deactivate
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap justify-between items-center gap-4 p-4 border border-red-200 dark:border-red-900/50 rounded-lg bg-red-50 dark:bg-red-900/20">
                    <div>
                      <h4 className="font-medium">Delete Account</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Permanently delete your account and all associated data. This cannot be undone.
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Manage how and when you receive notifications from Growthify.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Notification Channels</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications via email
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="email"
                          checked={notificationSettings.email}
                          onChange={handleNotificationChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications on your device
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="push"
                          checked={notificationSettings.push}
                          onChange={handleNotificationChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="text-lg font-medium mb-3">Notification Types</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Achievements</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          When you earn new badges and complete goals
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="achievements"
                          checked={notificationSettings.achievements}
                          onChange={handleNotificationChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Reminders</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Workout, habit, and mindfulness reminders
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="reminders"
                          checked={notificationSettings.reminders}
                          onChange={handleNotificationChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Tips & Advice</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Personalized tips based on your goals
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="tips"
                          checked={notificationSettings.tips}
                          onChange={handleNotificationChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Marketing</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Promotions, offers, and newsletter
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="marketing"
                          checked={notificationSettings.marketing}
                          onChange={handleNotificationChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={saveNotificationSettings}
                    disabled={loading}
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Control your privacy and data sharing preferences.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Profile Visibility</h3>
                  <select
                    name="profileVisibility"
                    value={privacySettings.profileVisibility}
                    onChange={handlePrivacyChange}
                    className="w-full rounded-lg px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                  >
                    <option value="public">Public - Visible to everyone</option>
                    <option value="friends">Friends Only - Visible to connections</option>
                    <option value="private">Private - Only visible to you</option>
                  </select>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Control who can see your profile information and progress
                  </p>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="text-lg font-medium mb-3">Data Sharing</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Activity Sharing</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Share your workout and habit completion with the community
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="activitySharing"
                          checked={privacySettings.activitySharing}
                          onChange={handlePrivacyChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Data Collection</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Allow us to collect usage data to improve your experience
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="dataCollection"
                          checked={privacySettings.dataCollection}
                          onChange={handlePrivacyChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={savePrivacySettings}
                    disabled={loading}
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
                  <h3 className="text-lg font-medium mb-3">Data Export & Deletion</h3>
                  <div className="space-y-4">
                    <div>
                      <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors">
                        Request Data Export
                      </button>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Download all your personal data in a machine-readable format
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
       {/* Appearance Settings */}
{activeTab === 'appearance' && (
  <div className="p-6">
    <h2 className="text-xl font-semibold mb-4">Appearance Settings</h2>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
      Customize how Growthify looks to match your preferences.
    </p>
    
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Theme</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Dark Mode</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Switch between light and dark themes
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-lg font-medium mb-3">Theme Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className="flex items-center mb-4">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-primary-600' : 'bg-primary-500'} text-white`}>
                <span className="material-symbols-rounded">person</span>
              </div>
              <div className="ml-3">
                <div className={`h-2.5 w-24 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full mb-1.5`}></div>
                <div className={`h-2 w-16 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full`}></div>
              </div>
            </div>
            <div className={`h-2.5 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full mb-2.5`}></div>
            <div className={`h-2.5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full mb-2.5`}></div>
            <div className={`h-2.5 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full`}></div>
          </div>
          
          <div className="space-y-2">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex items-center">
                <span className={`p-1 rounded-full ${isDarkMode ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-100 text-primary-500'}`}>
                  <span className="material-symbols-rounded text-sm">favorite</span>
                </span>
                <div className="ml-2">
                  <div className={`h-2 w-20 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full`}></div>
                </div>
              </div>
            </div>
            
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex items-center">
                <span className={`p-1 rounded-full ${isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-500'}`}>
                  <span className="material-symbols-rounded text-sm">bolt</span>
                </span>
                <div className="ml-2">
                  <div className={`h-2 w-24 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full`}></div>
                </div>
              </div>
            </div>
            
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex items-center">
                <span className={`p-1 rounded-full ${isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-500'}`}>
                  <span className="material-symbols-rounded text-sm">task_alt</span>
                </span>
                <div className="ml-2">
                  <div className={`h-2 w-16 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-lg font-medium mb-3">Display Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Dashboard Layout</label>
            <select
              className="w-full rounded-lg px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
            >
              <option value="grid">Grid Layout</option>
              <option value="list">List Layout</option>
              <option value="compact">Compact Layout</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Animation</label>
            <select
              className="w-full rounded-lg px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
            >
              <option value="full">Full Animation</option>
              <option value="reduced">Reduced Animation</option>
              <option value="none">No Animation</option>
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Reduce animations if you experience motion sensitivity
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-lg font-medium mb-3">Color Accent</h3>
        <div className="grid grid-cols-5 gap-2">
          <button className="w-full aspect-square rounded-full bg-primary-500 ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-gray-800"></button>
          <button className="w-full aspect-square rounded-full bg-purple-500"></button>
          <button className="w-full aspect-square rounded-full bg-blue-500"></button>
          <button className="w-full aspect-square rounded-full bg-pink-500"></button>
          <button className="w-full aspect-square rounded-full bg-orange-500"></button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Note: This feature is available only for premium users
        </p>
      </div>
    </div>
  </div>
)}

{/* Security Settings */}
{activeTab === 'security' && (
  <div className="p-6">
    <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
      Manage your account security and login settings.
    </p>
    
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Change Password</h3>
        <form onSubmit={changePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="currentPassword">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
              className="w-full rounded-lg px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
              minLength={6}
              className="w-full rounded-lg px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
              minLength={6}
              className="w-full rounded-lg px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-lg font-medium mb-3">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Enable 2FA</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add an extra layer of security to your account
            </p>
          </div>
          <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
            Set Up
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Two-factor authentication adds an additional layer of security by requiring a code from your phone in addition to your password.
        </p>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-lg font-medium mb-3">Active Sessions</h3>
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-2`}>
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <span className="material-symbols-rounded mr-2 text-green-500">
                  smartphone
                </span>
                <span className="font-medium">Current Device</span>
                <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400">
                  Active
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Chrome on Windows • Last active: Just now
              </p>
            </div>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <span className="material-symbols-rounded mr-2 text-gray-500">
                  phone_iphone
                </span>
                <span className="font-medium">Mobile App</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                iPhone • Last active: 2 days ago
              </p>
            </div>
            <button className="px-2 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-xs text-gray-800 dark:text-gray-200 rounded transition-colors">
              Sign Out
            </button>
          </div>
        </div>
        
        <div className="mt-3">
          <button className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium transition-colors flex items-center">
            <span className="material-symbols-rounded mr-1">logout</span>
            Sign Out from All Devices
          </button>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-lg font-medium mb-3">Login Activity</h3>
        <div className="space-y-2">
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} text-sm`}>
            <div className="flex justify-between">
              <span>Successful login</span>
              <span className="text-xs text-gray-500">Today, 10:42 AM</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Chrome on Windows • IP: 192.168.1.xxx
            </p>
          </div>
          
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} text-sm`}>
            <div className="flex justify-between">
              <span>Successful login</span>
              <span className="text-xs text-gray-500">Yesterday, 08:17 PM</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Mobile App on iPhone • IP: 192.168.1.xxx
            </p>
          </div>
          
          <div className="mt-3 text-center">
            <button className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium transition-colors">
              View Full Activity Log
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}