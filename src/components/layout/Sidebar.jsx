// src/components/layout/Sidebar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const sidebarRef = useRef(null);
  const [activeGroup, setActiveGroup] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [animateButtonHover, setAnimateButtonHover] = useState(false);
  
  // Translations
  const t = {
    en: {
      dashboard: 'Dashboard',
      physicalGoals: {
        title: 'Physical Growth',
        body: 'Body Transformation',
        nutrition: 'Nutrition & Diet',
        workout: 'Workout Plans',
        skincare: 'Skincare Routine'
      },
      mindset: {
        title: 'Mental Growth',
        goals: 'Goal Setting',
        motivation: 'Motivation Center',
        reflection: 'Reflection Journal'
      },
      habits: {
        title: 'Habit Building',
        tracker: 'Habit Tracker',
        streaks: 'Streak Analytics',
        challenges: 'Challenges'
      },
      social: {
        title: 'Social Growth',
        communities: 'Communities',
        partners: 'Accountability Partners',
        events: 'Live Events'
      },
      premium: {
        title: 'Unlock Premium',
        description: 'Access personalized coaching and exclusive content',
        button: 'Upgrade Now'
      },
      closeSidebar: 'Close sidebar'
    },
    id: {
      dashboard: 'Dasbor',
      physicalGoals: {
        title: 'Pertumbuhan Fisik',
        body: 'Transformasi Tubuh',
        nutrition: 'Nutrisi & Diet',
        workout: 'Rencana Latihan',
        skincare: 'Rutinitas Perawatan Kulit'
      },
      mindset: {
        title: 'Pertumbuhan Mental',
        goals: 'Penetapan Tujuan',
        motivation: 'Pusat Motivasi',
        reflection: 'Jurnal Refleksi'
      },
      habits: {
        title: 'Pembangunan Kebiasaan',
        tracker: 'Pelacak Kebiasaan',
        streaks: 'Analisis Rangkaian',
        challenges: 'Tantangan'
      },
      social: {
        title: 'Pertumbuhan Sosial',
        communities: 'Komunitas',
        partners: 'Rekan Akuntabilitas',
        events: 'Acara Langsung'
      },
      premium: {
        title: 'Buka Premium',
        description: 'Akses pelatihan personal dan konten eksklusif',
        button: 'Tingkatkan Sekarang'
      },
      closeSidebar: 'Tutup sidebar'
    }
  }[language] || {
    // Default to English
    dashboard: 'Dashboard',
    physicalGoals: {
      title: 'Physical Growth',
      body: 'Body Transformation',
      nutrition: 'Nutrition & Diet',
      workout: 'Workout Plans',
      skincare: 'Skincare Routine'
    },
    mindset: {
      title: 'Mental Growth',
      goals: 'Goal Setting',
      motivation: 'Motivation Center',
      reflection: 'Reflection Journal'
    },
    habits: {
      title: 'Habit Building',
      tracker: 'Habit Tracker',
      streaks: 'Streak Analytics',
      challenges: 'Challenges'
    },
    social: {
      title: 'Social Growth',
      communities: 'Communities',
      partners: 'Accountability Partners',
      events: 'Live Events'
    },
    premium: {
      title: 'Unlock Premium',
      description: 'Access personalized coaching and exclusive content',
      button: 'Upgrade Now'
    },
    closeSidebar: 'Close sidebar'
  };
  
  // Menu structure with grouping and Material Symbols icons
  const menuGroups = [
    {
      id: 'main',
      items: [
        { 
          name: t.dashboard, 
          path: '/dashboard', 
          icon: 'dashboard',
          animation: "dashboard"
        }
      ]
    },
    {
      id: 'physical',
      title: t.physicalGoals.title,
      icon: 'monitoring',
      items: [
        { 
          name: t.physicalGoals.body, 
          path: '/physical/body', 
          icon: 'fitness_center'
        },
        { 
          name: t.physicalGoals.nutrition, 
          path: '/physical/nutrition', 
          icon: 'restaurant',
          animation: "nutrition"
        },
        { 
          name: t.physicalGoals.workout, 
          path: '/physical/workout', 
          icon: 'directions_run',
          animation: "workout"
        },
        { 
          name: t.physicalGoals.skincare, 
          path: '/physical/skincare', 
          icon: 'face'
        }
      ]
    },
    {
      id: 'mental',
      title: t.mindset.title,
      icon: 'psychology',
      items: [
        { 
          name: t.mindset.goals, 
          path: '/mental/goals', 
          icon: 'track_changes'
        },
        { 
          name: t.mindset.motivation, 
          path: '/mental/motivation', 
          icon: 'emoji_objects'
        },
        { 
          name: t.mindset.reflection, 
          path: '/mental/reflection', 
          icon: 'self_improvement'
        }
      ]
    },
    {
      id: 'habits',
      title: t.habits.title,
      icon: 'calendar_month',
      items: [
        { 
          name: t.habits.tracker, 
          path: '/habits/tracker', 
          icon: 'checklist'
        },
        { 
          name: t.habits.streaks, 
          path: '/habits/streaks', 
          icon: 'trending_up'
        },
        { 
          name: t.habits.challenges, 
          path: '/habits/challenges', 
          icon: 'military_tech'
        }
      ]
    },
    {
      id: 'social',
      title: t.social.title,
      icon: 'groups',
      items: [
        { 
          name: t.social.communities, 
          path: '/social/communities', 
          icon: 'diversity_3'
        },
        { 
          name: t.social.partners, 
          path: '/social/partners', 
          icon: 'handshake'
        },
        { 
          name: t.social.events, 
          path: '/social/events', 
          icon: 'event'
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
      {/* Include Google Material Symbols in the head */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      
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
        <div className={`h-16 flex items-center justify-between ${isDarkMode ? 'border-gray-800' : 'border-primary-100'} border-b relative px-4`}>
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
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className={`${
              isDarkMode 
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' 
                : 'text-text-muted hover:text-text-dark hover:bg-gray-100'
            } p-2 rounded-md transition-colors`}
            aria-label={t.closeSidebar}
          >
            <span className="material-symbols-rounded">close</span>
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
                  onMouseEnter={() => setHoveredItem(`group-${group.id}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="flex items-center">
                    {group.icon && (
                      <span className="material-symbols-rounded mr-2 text-lg">{group.icon}</span>
                    )}
                    {group.title}
                  </span>
                  {group.items.length > 1 && (
                    <motion.span
                      className="material-symbols-rounded text-lg"
                      animate={{ rotate: activeGroup === group.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      expand_more
                    </motion.span>
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
                    className="overflow-hidden"
                  >
                    <ul className="space-y-1 pl-3">
                      {group.items.map((item) => {
                        const isActive = location.pathname === item.path;
                        const itemId = `menu-item-${item.path.replace(/\//g, '-')}`;
                        
                        return (
                          <motion.li key={item.path} variants={itemVariants}>
                            <Link
                              id={itemId}
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
                              onMouseEnter={() => setHoveredItem(item.path)}
                              onMouseLeave={() => setHoveredItem(null)}
                            >
                              <span className={`mr-3 flex-shrink-0 ${
                                isActive 
                                  ? isDarkMode
                                    ? 'text-primary-400'
                                    : 'text-primary-500' 
                                  : isDarkMode
                                    ? 'text-gray-500 group-hover:text-gray-400'
                                    : 'text-text-muted group-hover:text-primary-400'
                              }`}>
                                <span className="material-symbols-rounded">{item.icon}</span>
                              </span>
                              
                              <span className="flex-1">{item.name}</span>
                              
                              {isActive && (
                                <span className={`ml-auto w-1.5 h-6 rounded-full ${isDarkMode ? 'bg-primary-400' : 'bg-primary-500'}`}></span>
                              )}
                              
                              {/* Animated decoration for hovered items */}
                              {hoveredItem === item.path && !isActive && (
                                <motion.span 
                                  className="absolute inset-0 rounded-lg z-0"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.9 }}
                                  transition={{ duration: 0.1 }}
                                  style={{
                                    background: isDarkMode 
                                      ? 'linear-gradient(270deg, rgba(49, 151, 149, 0.1), transparent)'
                                      : 'linear-gradient(270deg, rgba(49, 151, 149, 0.05), transparent)'
                                  }}
                                />
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
          
          {/* Premium upgrade card with gradient effect */}
          <motion.div 
            className="mt-6 mx-1 mb-3 relative overflow-hidden"
            variants={itemVariants}
          >
            <div className="rounded-xl">
              <div 
                className={`rounded-xl p-5 ${isDarkMode ? 'text-gray-200' : 'text-white'} shadow-md relative overflow-hidden`}
                onMouseEnter={() => setAnimateButtonHover(true)}
                onMouseLeave={() => setAnimateButtonHover(false)}
              >
                {/* Background gradient with subtle animation */}
                <div 
                  className="absolute inset-0 z-0 bg-gradient-to-br transition-all duration-1000 ease-in-out"
                  style={{ 
                    backgroundImage: isDarkMode
                      ? 'linear-gradient(135deg, #2C7A7B, #2B6CB0, #2F855A, #2C7A7B)'
                      : 'linear-gradient(135deg, #319795, #3182CE, #38A169, #319795)',
                    backgroundSize: '300% 300%',
                    animation: 'gradientAnimation 15s ease infinite'
                  }}
                ></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-2">
                    <span className="material-symbols-rounded mr-2">diamond</span>
                    <h3 className="font-bold text-lg">{t.premium.title}</h3>
                  </div>
                  <p className="text-sm opacity-90 mb-4">{t.premium.description}</p>
                  
                  <button 
                    onMouseEnter={() => setAnimateButtonHover(true)}
                    onMouseLeave={() => setAnimateButtonHover(false)}
                    className={`w-full ${
                      isDarkMode 
                        ? 'bg-gray-800 text-white hover:bg-gray-700' 
                        : 'bg-white hover:bg-opacity-90'
                    } font-semibold py-2 px-3 rounded-lg text-sm transition-all transform hover:scale-105 flex items-center justify-center`}
                    style={{ 
                      color: isDarkMode ? '#fff' : '#319795'
                    }}
                  >
                    <span className="material-symbols-rounded mr-1">workspace_premium</span>
                    {t.premium.button}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.aside>

      {/* Add global style for gradient animation */}
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        
        /* Customize Material Symbols */
        .material-symbols-rounded {
          font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 24;
          font-size: 1.15rem;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          vertical-align: middle;
        }
      `}</style>
    </>
  );
}