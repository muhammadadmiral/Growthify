// src/components/layout/Sidebar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const sidebarRef = useRef(null);
  const [activeGroup, setActiveGroup] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  
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
  };
  
  // Get translations based on language, with fallback to English
  const translations = language === 'id' ? t.id : t.en;
  
  // Menu structure with updated paths to match App.jsx routes
  const menuGroups = [
    {
      id: 'main',
      items: [
        { 
          name: translations.dashboard, 
          path: '/dashboard', 
          icon: 'dashboard'
        }
      ]
    },
    {
      id: 'physical',
      title: translations.physicalGoals.title,
      icon: 'monitoring',
      items: [
        { 
          name: translations.physicalGoals.body, 
          path: '/physical/body-transformation', 
          icon: 'fitness_center'
        },
        { 
          name: translations.physicalGoals.nutrition, 
          path: '/physical/nutrition', 
          icon: 'restaurant'
        },
        { 
          name: translations.physicalGoals.workout, 
          path: '/physical/workout-planner', 
          icon: 'directions_run'
        },
        { 
          name: translations.physicalGoals.skincare, 
          path: '/physical/skincare', 
          icon: 'face'
        }
      ]
    },
    {
      id: 'mental',
      title: translations.mindset.title,
      icon: 'psychology',
      items: [
        { 
          name: translations.mindset.goals, 
          path: '/mental/goal-setting', 
          icon: 'track_changes'
        },
        { 
          name: translations.mindset.motivation, 
          path: '/mental/motivation', 
          icon: 'emoji_objects'
        },
        { 
          name: translations.mindset.reflection, 
          path: '/mental/reflection', 
          icon: 'self_improvement'
        }
      ]
    },
    {
      id: 'habits',
      title: translations.habits.title,
      icon: 'calendar_month',
      items: [
        { 
          name: translations.habits.tracker, 
          path: '/habits/tracker', 
          icon: 'checklist'
        },
        { 
          name: translations.habits.streaks, 
          path: '/habits/streaks', 
          icon: 'trending_up'
        },
        { 
          name: translations.habits.challenges, 
          path: '/habits/challenges', 
          icon: 'military_tech'
        }
      ]
    },
    {
      id: 'social',
      title: translations.social.title,
      icon: 'groups',
      items: [
        { 
          name: translations.social.communities, 
          path: '/social/communities', 
          icon: 'diversity_3'
        },
        { 
          name: translations.social.partners, 
          path: '/social/partners', 
          icon: 'handshake'
        },
        { 
          name: translations.social.events, 
          path: '/social/events', 
          icon: 'event'
        }
      ]
    }
  ];

  // Set initial active group based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/physical')) {
      setActiveGroup('physical');
    } else if (path.startsWith('/mental')) {
      setActiveGroup('mental');
    } else if (path.startsWith('/habits')) {
      setActiveGroup('habits');
    } else if (path.startsWith('/social')) {
      setActiveGroup('social');
    }
  }, [location.pathname]);
  
  // Initialize and manage sidebar visibility
  useEffect(() => {
    if (!sidebarRef.current) return;
    
    const sidebar = sidebarRef.current;
    sidebar.id = 'sidebar';
    
    // Apply initial class based on isOpen prop
    if (isOpen) {
      sidebar.classList.remove('hidden-sidebar');
      sidebar.classList.add('visible-sidebar');
    } else {
      sidebar.classList.remove('visible-sidebar');
      sidebar.classList.add('hidden-sidebar');
    }
    
    // Update classes when isOpen changes
    if (isOpen) {
      sidebar.classList.remove('hidden-sidebar');
      sidebar.classList.add('visible-sidebar');
    } else {
      sidebar.classList.remove('visible-sidebar');
      sidebar.classList.add('hidden-sidebar');
    }
  }, [isOpen, sidebarRef]);
  
  // Handle overlay click to close sidebar
  useEffect(() => {
    const handleOverlayClick = () => {
      if (onClose) {
        onClose();
      }
    };
    
    const overlay = document.getElementById('sidebar-overlay');
    if (overlay) {
      overlay.addEventListener('click', handleOverlayClick);
      return () => overlay.removeEventListener('click', handleOverlayClick);
    }
  }, [onClose]);
  
  // Handle clicks outside sidebar to close it on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen && 
        window.innerWidth < 1024 && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest('#sidebar-toggle-button')
      ) {
        if (onClose) {
          onClose();
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);
  
  // Toggle group expansion
  const toggleGroup = (groupId) => {
    setActiveGroup(activeGroup === groupId ? null : groupId);
  };

  // Handle navigation with improved mobile support
  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      if (onClose) {
        onClose();
      }
    }
  };

  // Check if a link is active
  const isLinkActive = (path) => {
    // Check if current path exactly matches the link path
    if (location.pathname === path) return true;
    
    // For sub-pages of workout, allow highlight on parent menu
    if (path === '/physical/workout-planner' && 
        (location.pathname === '/physical/workout-progress' || 
         location.pathname === '/physical/workout-history' || 
         location.pathname === '/physical/workout-statistics')) {
      return true;
    }
    
    return false;
  };

  return (
    <>
      {/* Include Google Material Symbols in the head */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      
      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} z-30 shadow-xl w-72 lg:w-64 pt-16 sm:pt-20 lg:pt-0 lg:static lg:z-0 border-r overflow-hidden`}
      >
        {/* Logo area - only visible on desktop */}
        <div className={`h-16 sm:h-20 hidden lg:flex items-center justify-between ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} border-b relative px-4`}>
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
        </div>
        
        {/* Close button - only visible on mobile */}
        <button 
          onClick={onClose}
          className={`lg:hidden absolute top-4 right-4 ${
            isDarkMode 
              ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          } p-2 rounded-md transition-colors`}
          aria-label={translations.closeSidebar}
        >
          <span className="material-symbols-rounded">close</span>
        </button>
        
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
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
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
                    <span
                      className="material-symbols-rounded text-lg transform transition-transform duration-200"
                      style={{ transform: activeGroup === group.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      expand_more
                    </span>
                  )}
                </button>
              )}
              
              {(activeGroup === group.id || !group.title || group.id === 'main') && (
                <div className="overflow-hidden">
                  <ul className="space-y-1 pl-3">
                    {group.items.map((item) => {
                      const isActive = isLinkActive(item.path);
                      
                      return (
                        <li key={item.path}>
                          <button
                            onClick={() => handleNavigation(item.path)}
                            className={`group relative w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                              isActive
                                ? isDarkMode 
                                  ? 'bg-primary-900/30 text-primary-400'
                                  : 'bg-primary-50 text-primary-600'
                                : isDarkMode
                                  ? 'text-gray-300 hover:bg-gray-800/70'
                                  : 'text-gray-700 hover:bg-gray-100/70'
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
                                  : 'text-gray-500 group-hover:text-primary-400'
                            }`}>
                              <span className="material-symbols-rounded">{item.icon}</span>
                            </span>
                            
                            <span className="flex-1 text-left">{item.name}</span>
                            
                            {isActive && (
                              <span className={`ml-auto w-1.5 h-6 rounded-full ${isDarkMode ? 'bg-primary-400' : 'bg-primary-500'}`}></span>
                            )}
                            
                            {/* Decoration for hovered items */}
                            {hoveredItem === item.path && !isActive && (
                              <span 
                                className="absolute inset-0 rounded-lg z-0"
                                style={{
                                  background: isDarkMode 
                                    ? 'linear-gradient(270deg, rgba(49, 151, 149, 0.1), transparent)'
                                    : 'linear-gradient(270deg, rgba(49, 151, 149, 0.05), transparent)'
                                }}
                              />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          ))}
          
          {/* Premium upgrade card */}
          <div className="mt-6 mx-1 mb-3 relative overflow-hidden">
            <div className="rounded-xl">
              <div 
                className={`rounded-xl p-5 ${isDarkMode ? 'text-gray-200' : 'text-white'} shadow-md relative overflow-hidden`}
              >
                {/* Background gradient */}
                <div 
                  className="absolute inset-0 z-0 bg-gradient-to-br"
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
                    <h3 className="font-bold text-lg">{translations.premium.title}</h3>
                  </div>
                  <p className="text-sm opacity-90 mb-4">{translations.premium.description}</p>
                  
                  <button 
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
                    {translations.premium.button}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Add global style for gradient animation */}
      <style jsx="true" global="true">{`
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