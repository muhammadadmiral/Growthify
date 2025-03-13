// src/components/layout/Navbar/UserMenu.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../../../config/firebase';
import { signOut } from 'firebase/auth';

export default function UserMenu({ userData, isDarkMode, menuItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle menu item click
  const handleMenuItemClick = (item) => {
    setIsOpen(false);
    
    if (item.action === 'signOut') {
      handleSignOut();
    } else if (item.path) {
      navigate(item.path);
    }
  };
  
  // Sign out handler
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 sm:space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="hidden sm:flex flex-col items-end">
          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {userData.name.split(' ')[0]}
          </span>
          <span className={`text-xs ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>
            Level {userData.level}
          </span>
        </div>
        
        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {userData.avatar ? (
            <img 
              src={userData.avatar} 
              alt={userData.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div 
              className={`w-full h-full flex items-center justify-center text-lg font-semibold ${
                isDarkMode ? 'bg-primary-900 text-primary-400' : 'bg-primary-100 text-primary-600'
              }`}
            >
              {userData.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </button>
      
      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 
              ${isDarkMode 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-200'}
              ring-1 ring-black ring-opacity-5 z-50
            `}
          >
            {/* User Info Section */}
            <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {userData.name}
              </p>
              <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {userData.email}
              </p>
              <div className="mt-2 flex items-center">
                <div className={`flex-shrink-0 h-2 w-full rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                    style={{ width: `${userData.points % 1000 / 10}%` }}
                  />
                </div>
                <p className={`ml-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {userData.points % 1000} / 1000 XP
                </p>
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="py-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className={`
                    w-full text-left px-4 py-2 text-sm 
                    ${isDarkMode 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-100'}
                    flex items-center
                  `}
                  onClick={() => handleMenuItemClick(item)}
                >
                  {item.icon === 'profile' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  {item.icon === 'settings' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  {item.icon === 'help' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {item.icon === 'signOut' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  )}
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}