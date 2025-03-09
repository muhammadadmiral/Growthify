// src/components/layout/Sidebar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const sidebarRef = useRef(null);
  const [activeGroup, setActiveGroup] = useState(null);
  
  // Translations
  const t = {
    en: {
      dashboard: 'Dashboard',
      physicalGoals: 'Physical Goals',
      mindset: 'Mindset',
      habits: 'Habits',
      communities: 'Communities',
      profile: 'Profile',
      settings: 'Settings',
      freePlan: 'Free Plan',
      premium: {
        title: 'Unlock Premium',
        description: 'Access personalized coaching and exclusive content',
        button: 'Upgrade Now'
      },
      signOut: 'Sign Out'
    },
    id: {
      dashboard: 'Dasbor',
      physicalGoals: 'Tujuan Fisik',
      mindset: 'Pola Pikir',
      habits: 'Kebiasaan',
      communities: 'Komunitas',
      profile: 'Profil',
      settings: 'Pengaturan',
      freePlan: 'Paket Gratis',
      premium: {
        title: 'Buka Premium',
        description: 'Akses pelatihan personal dan konten eksklusif',
        button: 'Tingkatkan Sekarang'
      },
      signOut: 'Keluar'
    }
  }[language] || {
    en: {
      dashboard: 'Dashboard',
      physicalGoals: 'Physical Goals',
      mindset: 'Mindset',
      habits: 'Habits',
      communities: 'Communities',
      profile: 'Profile',
      settings: 'Settings',
      freePlan: 'Free Plan',
      premium: {
        title: 'Unlock Premium',
        description: 'Access personalized coaching and exclusive content',
        button: 'Upgrade Now'
      },
      signOut: 'Sign Out'
    }
  };
  
  // Menu structure with grouping
  const menuGroups = [
    {
      id: 'main',
      items: [
        { 
          name: t.dashboard, 
          path: '/dashboard', 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'growth',
      title: 'Growth Areas',
      items: [
        { 
          name: t.physicalGoals, 
          path: '/physical', 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
            </svg>
          )
        },
        { 
          name: t.mindset, 
          path: '/mindset', 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          )
        },
        { 
          name: t.habits, 
          path: '/habits', 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'social',
      title: 'Social',
      items: [
        { 
          name: t.communities, 
          path: '/communities', 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'user',
      title: 'User',
      items: [
        { 
          name: t.profile, 
          path: '/profile', 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          )
        },
        { 
          name: t.settings, 
          path: '/settings', 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          )
        }
      ]
    }
  ];

  // Close sidebar when route changes on mobile screens
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      onClose();
    }
  }, [location.pathname, isOpen, onClose]);
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen && 
        window.innerWidth < 1024 && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target)
      ) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);
  
  // Toggle group expansion
  const toggleGroup = (groupId) => {
    setActiveGroup(activeGroup === groupId ? null : groupId);
  };
  
  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Sidebar animation variants
  const sidebarVariants = {
    open: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    closed: { 
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "afterChildren"
      }
    }
  };
  
  // Item animation variants
  const itemVariants = {
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.2 }
    },
    closed: { 
      opacity: 0, 
      x: -10,
      transition: { duration: 0.1 }
    }
  };

  return (
    <>
      {/* Overlay for mobile - only appears when sidebar is open */}
      <AnimatePresence>
        {isOpen && window.innerWidth < 1024 && (
          <motion.div 
            className={`fixed inset-0 ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-secondary-900 bg-opacity-30'} backdrop-blur-sm z-20 lg:hidden`}
            onClick={onClose}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          ></motion.div>
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.aside 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-content border-primary-100'} z-30 shadow-elegant w-72 lg:w-64 lg:static lg:z-0 border-r overflow-hidden`}
        aria-label="Sidebar"
        variants={sidebarVariants}
        initial={false}
        animate={isOpen || window.innerWidth >= 1024 ? "open" : "closed"}
      >
        {/* Logo area */}
        <div className={`h-16 flex items-center justify-center ${isDarkMode ? 'border-gray-800' : 'border-primary-100'} border-b relative`}>
          <Link to="/dashboard" className="flex items-center">
            <div 
              className="font-heading font-bold text-2xl transition-all duration-300 hover:scale-105"
              style={{
                backgroundImage: 'linear-gradient(90deg, #319795, #3182CE)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Growthify
            </div>
          </Link>
          
          {/* Close button - only visible on mobile */}
          <button 
            onClick={onClose}
            className={`absolute right-4 top-3 lg:hidden ${
              isDarkMode 
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' 
                : 'text-text-muted hover:text-text-dark hover:bg-gray-100'
            } p-1 rounded-md transition-colors`}
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Menu items with collapsible sections */}
        <div className="overflow-y-auto h-[calc(100%-10rem)] py-3 px-3">
          {menuGroups.map((group) => (
            <div key={group.id} className="mb-3">
              {group.title && (
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-md mb-1 ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50' 
                      : 'text-neutral-500 hover:text-neutral-700 hover:bg-gray-100/50'
                  }`}
                >
                  <span>{group.title}</span>
                  {group.items.length > 1 && (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 transition-transform duration-200 ${
                        activeGroup === group.id ? 'transform rotate-180' : ''
                      }`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
              )}
              
              <AnimatePresence initial={false}>
                {(activeGroup === group.id || !group.title || group.id === 'main') && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={{
                      open: { 
                        height: 'auto',
                        opacity: 1,
                        transition: { duration: 0.3 }
                      },
                      closed: { 
                        height: 0,
                        opacity: 0,
                        transition: { duration: 0.2 }
                      }
                    }}
                  >
                    <ul className="space-y-1">
                      {group.items.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                          <motion.li key={item.path} variants={itemVariants}>
                            <Link
                              to={item.path}
                              className={`group flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                isActive
                                  ? isDarkMode 
                                    ? 'bg-primary-900/30 text-primary-400'
                                    : 'bg-primary-50 text-primary-600'
                                  : isDarkMode
                                    ? 'text-gray-300 hover:bg-gray-800/70'
                                    : 'text-text hover:bg-secondary-50/70'
                              }`}
                              aria-current={isActive ? 'page' : undefined}
                            >
                              <span className={`mr-3 ${
                                isActive 
                                  ? isDarkMode
                                    ? 'text-primary-400'
                                    : 'text-primary-500' 
                                  : isDarkMode
                                    ? 'text-gray-500 group-hover:text-gray-400'
                                    : 'text-text-muted group-hover:text-primary-400'
                              }`}>
                                {item.icon}
                              </span>
                              {item.name}
                              
                              {isActive && (
                                <span className={`ml-auto w-1.5 h-6 rounded-full ${isDarkMode ? 'bg-primary-400' : 'bg-primary-500'}`}></span>
                              )}
                            </Link>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          
          {/* Premium upgrade card */}
          <motion.div 
            className="mt-6 mx-1 mb-3"
            variants={itemVariants}
          >
            <div className={`rounded-xl p-5 ${isDarkMode ? 'text-gray-200' : 'text-white'} shadow-md relative overflow-hidden`}>
              {/* Background gradient with subtle animation */}
              <div 
                className="absolute inset-0 z-0 bg-gradient-to-br transition-all duration-1000 ease-in-out animate-gradient-slow"
                style={{ 
                  backgroundImage: isDarkMode
                    ? 'linear-gradient(135deg, #2C7A7B, #2B6CB0, #2F855A, #2C7A7B)'
                    : 'linear-gradient(135deg, #319795, #3182CE, #38A169, #319795)',
                  backgroundSize: '300% 300%',
                }}
              ></div>
              
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">{t.premium.title}</h3>
                <p className="text-sm opacity-90 mb-4">{t.premium.description}</p>
                <button 
                  className={`w-full ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white hover:bg-gray-700' 
                      : 'bg-white hover:bg-opacity-90'
                  } font-semibold py-2 px-3 rounded-lg text-sm transition-all hover:shadow-lg transform hover:-translate-y-0.5`}
                  style={{ color: isDarkMode ? '#fff' : '#319795' }}
                >
                  {t.premium.button}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* User section at bottom */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-primary-100 bg-content'}`}>
          <div className="flex items-center">
            <div 
              className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold shadow-md"
              style={{ 
                background: 'linear-gradient(135deg, #319795, #3182CE)',
                boxShadow: isDarkMode
                  ? '0 0 10px rgba(49, 151, 149, 0.3)'
                  : '0 0 15px rgba(49, 151, 149, 0.2)'
              }}
            >
              AJ
            </div>
            <div className="ml-3 flex-grow">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-text-dark'}`}>
                Alex Johnson
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-text-muted'}`}>
                {t.freePlan}
              </p>
            </div>
            
            {/* Sign out button */}
            <button 
              onClick={handleSignOut}
              className={`ml-auto p-1.5 rounded-md ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' 
                  : 'text-text-muted hover:text-text hover:bg-gray-100'
              } transition-colors`}
              aria-label={t.signOut}
              title={t.signOut}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}