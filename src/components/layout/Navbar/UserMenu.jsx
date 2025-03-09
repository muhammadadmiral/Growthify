// src/components/layout/Navbar/UserMenu.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import UserMenuItems from './UserMenuItems';

export default function UserMenu({ userData, isDarkMode, menuItems }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Redirect to home page after signing out
      navigate('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  
  // Handle menu item click - for sign out action
  const handleMenuItemClick = (action) => {
    if (action === 'signOut') {
      handleSignOut();
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative user-dropdown" ref={dropdownRef}>
      <motion.button 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 rounded-lg p-1.5 relative overflow-hidden text-primary-500 hover:text-primary-400 transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-expanded={isDropdownOpen}
      >
        <span className={`absolute inset-0 rounded-lg opacity-0 hover:opacity-100 ${
          isDarkMode ? 'bg-primary-900/50' : 'bg-primary-50/70'
        } transition-opacity duration-300`}></span>
        
        {/* Avatar with premium effects */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 opacity-40 blur-sm group-hover:opacity-70 transition-opacity duration-300"></div>
          {userData.avatar ? (
            <img 
              src={userData.avatar} 
              alt={userData.name} 
              className="h-8 w-8 rounded-full object-cover shadow-md relative ring-2 ring-white/10 dark:ring-black/5"
            />
          ) : (
            <div className="h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold bg-gradient-to-br from-primary-500 to-secondary-500 shadow-md relative ring-2 ring-white/10 dark:ring-black/5">
              {getUserInitials(userData.name)}
            </div>
          )}
        </div>
        
        <div className="hidden sm:flex items-center text-primary-500 hover:text-primary-400">
          <span className="text-sm font-medium">{userData.name.split(' ')[0]}</span>
          <ChevronDownIcon size={16} className="ml-1" />
        </div>
      </motion.button>
      
      {/* User Dropdown Menu with elegant styling */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div 
            className={`absolute right-0 mt-3 w-56 rounded-xl overflow-hidden z-10 ${
              isDarkMode 
                ? 'bg-gray-900/95 border border-primary-900/50 shadow-xl shadow-primary-900/20' 
                : 'bg-white/95 border border-primary-100/50 shadow-xl shadow-primary-500/10'
            }`}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Top accent border with gradient */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600"></div>
            
            {/* User Info */}
            <div className={`px-4 py-4 ${isDarkMode ? 'border-b border-gray-800' : 'border-b border-gray-100'}`}>
              <div className="flex items-center space-x-3">
                {/* Avatar with premium effects */}
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 opacity-40 blur-sm"></div>
                  {userData.avatar ? (
                    <img 
                      src={userData.avatar} 
                      alt={userData.name} 
                      className="h-10 w-10 rounded-full object-cover shadow-md relative ring-2 ring-white/10 dark:ring-black/5"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-medium bg-gradient-to-br from-primary-500 to-secondary-500 shadow-md relative ring-2 ring-white/10 dark:ring-black/5">
                      {getUserInitials(userData.name)}
                    </div>
                  )}
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {userData.name}
                  </p>
                  <p className={`text-xs truncate max-w-[10rem] ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                    {userData.email}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Menu Items */}
            <UserMenuItems 
              items={menuItems} 
              isDarkMode={isDarkMode} 
              onItemClick={handleMenuItemClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}