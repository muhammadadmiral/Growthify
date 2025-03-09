// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { MoonIcon, SunIcon } from 'lucide-react';

// Translation map with fixed widths to prevent layout shifts
const translations = {
  en: {
    features: 'Features',
    pricing: 'Pricing',
    testimonials: 'Testimonials',
    blog: 'Blog',
    login: 'Login',
    getStarted: 'Get Started',
    profile: 'Your Profile',
    settings: 'Settings',
    helpCenter: 'Help Center',
    signOut: 'Sign out'
  },
  id: {
    features: 'Fitur',
    pricing: 'Harga',
    testimonials: 'Testimoni',
    blog: 'Blog',
    login: 'Masuk',
    getStarted: 'Mulai',
    profile: 'Profil Anda',
    settings: 'Pengaturan',
    helpCenter: 'Pusat Bantuan',
    signOut: 'Keluar'
  }
};

export default function Navbar({ onMenuClick, isLoggedIn = false }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, isChangingLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Get translations based on current language
  const t = translations[language] || translations.en;

  // Event listener for scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prepare glossy background effect based on scroll and dark mode
  const getGlassEffect = () => {
    if (isDarkMode) {
      return isScrolled
        ? 'bg-gray-900/95 border-b border-gray-800/50 backdrop-blur-md'
        : 'bg-transparent border-b border-transparent';
    } else {
      return isScrolled
        ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/20 shadow-sm'
        : 'bg-transparent border-b border-transparent';
    }
  };

  // Prepare text for animation to prevent layout shifts
  // Ganti fungsi NavText dengan ini:
const NavText = ({ children, className = '', width = 'auto' }) => {
  return (
    <div className="relative overflow-hidden" style={{ width, minWidth: width, height: '24px' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={language + (isChangingLanguage ? '-loading' : '')}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`${className} flex items-center justify-center`}
          style={{ position: 'relative' }}
        >
          {isChangingLanguage ? (
            <div className="w-full h-2 rounded-full overflow-hidden bg-gray-200/30">
              <motion.div 
                className="h-full bg-primary-500/40"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }} 
                transition={{ duration: 0.5 }}
              />
            </div>
          ) : (
            children
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

  // Nav links with consistent widths
  const navLinks = [
    { key: 'features', label: t.features, path: '/features', width: '80px' },
    { key: 'pricing', label: t.pricing, path: '/pricing', width: '75px' },
    { key: 'testimonials', label: t.testimonials, path: '/testimonials', width: '120px' },
    { key: 'blog', label: t.blog, path: '/blog', width: '60px' }
  ];

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ease-in-out
        ${getGlassEffect()}
      `}
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            {/* Mobile menu button */}
            {isLoggedIn ? (
              <button
                onClick={onMenuClick}
                className={`
                  lg:hidden inline-flex items-center justify-center p-2 rounded-full 
                  transition-all duration-300 hover:scale-105
                  ${isDarkMode
                    ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    : isScrolled 
                      ? 'text-gray-600 hover:bg-gray-100/70' 
                      : 'text-white hover:bg-white/10'
                  }
                `}
                aria-label="Open main menu"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
              </button>
            ) : (
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`
                  md:hidden inline-flex items-center justify-center p-2 rounded-full
                  transition-all duration-300 hover:scale-105
                  ${isDarkMode
                    ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                    : isScrolled 
                      ? 'text-gray-600 hover:bg-gray-100/70' 
                      : 'text-white hover:bg-white/10'
                  }
                `}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            )}
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
              <div className="relative flex items-center py-1">
                <div 
                  className="font-heading font-bold text-2xl md:text-2xl"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #319795, #3182CE)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  Growthify
                </div>
                <div className={`absolute -bottom-px left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500 ${isScrolled ? 'w-full' : 'group-hover:w-full'}`}></div>
              </div>
            </Link>
          </div>
          
          {/* Navigation Links - Desktop */}
          {!isLoggedIn && (
            <div className="hidden md:flex md:items-center md:space-x-2">
              {navLinks.map((link) => (
             <Link 
             key={link.key} 
             to={link.path} 
             className={`
               px-4 py-2 mx-1 rounded-lg relative group overflow-hidden
               ${isDarkMode
                 ? 'text-gray-200 hover:text-white' // Sebelumnya text-gray-300
                 : isScrolled 
                   ? 'text-gray-700 hover:text-primary-600' 
                   : 'text-white hover:text-white'
               }
             `}
           >
                  {/* Background hover effect */}
                  <span className={`
                    absolute inset-0 w-full h-full transition-all duration-300 ease-out rounded-lg scale-0 group-hover:scale-100
                    ${isDarkMode 
                      ? 'bg-gray-800' 
                      : isScrolled ? 'bg-gray-100/70' : 'bg-white/10'
                    }
                  `}></span>
                  
                  {/* Animated underline effect */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-500"></span>
                  
                  {/* Text with smooth language transition */}
                  <span className="relative">
                    <NavText width={link.width}>{link.label}</NavText>
                  </span>
                </Link>
              ))}
            </div>
          )}
          
          {/* Right Side Buttons */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className={`
                p-2 rounded-full relative overflow-hidden
                transition-colors duration-500 ease-in-out
                ${isDarkMode
                  ? 'text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/50'
                  : isScrolled 
                    ? 'text-gray-600 hover:text-primary-600 bg-gray-100/50 hover:bg-gray-200/50' 
                    : 'text-white hover:text-white bg-white/10 hover:bg-white/20'
                }
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Dark Mode"
              aria-pressed={isDarkMode}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDarkMode ? 'dark' : 'light'}
                  initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {isDarkMode ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
              
              {/* Subtle glow effect */}
              <span className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-primary-500' : 'bg-secondary-500'} opacity-0 transition-opacity duration-500 blur-md`}></span>
            </motion.button>

            {/* Language Switcher - Luxury Version */}
            <div className="relative">
              <motion.button 
                onClick={toggleLanguage}
                disabled={isChangingLanguage}
                className={`
                  relative flex items-center justify-center h-10 px-3
                  rounded-full transition-all duration-300 overflow-hidden
                  ${isChangingLanguage ? 'opacity-80 cursor-wait' : 'opacity-100'}
                  ${isDarkMode
                    ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300'
                    : isScrolled 
                      ? 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-700' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Switch Language"
              >
                {/* Background animation */}
                <span className={`
                  absolute inset-0 transition-all duration-500 ease-out 
                  ${isChangingLanguage ? 'opacity-20' : 'opacity-0'}
                  ${isDarkMode ? 'bg-primary-800' : 'bg-primary-100'}
                `}></span>
                
                {/* Flag and text container - fixed width to prevent layout shifts */}
                <div className="relative flex items-center" style={{ width: '62px', justifyContent: 'flex-start' }}>
                  {/* Flag with fallback */}
                  <div className="w-5 h-5 mr-2 rounded-full overflow-hidden flex-shrink-0 relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={language}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0"
                      >
                        <div 
                          className="w-full h-full flex items-center justify-center"
                          style={{ 
                            backgroundImage: language === 'en' 
                              ? "url('/public/flags/us_flag.png')" 
                              : "url('/public/flags/id_flag.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          {/* Fallback if image fails to load */}
                          <span className="opacity-0">
                            {language === 'en' ? '🇺🇸' : '🇮🇩'}
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
        {/* Language text with animation */}
<div className="relative overflow-hidden" style={{ width: '30px', minWidth: '30px', height: '20px' }}>
  <AnimatePresence mode="wait">
    <motion.div 
      key={language}
      className="flex items-center justify-start"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      style={{ position: 'relative' }}
    >
      <span className="text-sm font-medium">
        {language === 'en' ? 'EN' : 'ID'}
      </span>
    </motion.div>
  </AnimatePresence>
</div>
                </div>
                
                {/* Loading indicator during language change */}
                {isChangingLanguage && (
                  <span className="absolute inset-0 flex items-center justify-center bg-gray-800/10 backdrop-blur-sm">
                    <motion.span 
                      className="w-4 h-4 rounded-full border-2 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{ 
                        borderColor: isDarkMode 
                          ? '#4FD1C5 transparent #4FD1C5 #4FD1C5' 
                          : '#319795 transparent #319795 #319795'
                      }}
                    />
                  </span>
                )}
              </motion.button>
            </div>

            {isLoggedIn ? (
              <>
                {/* Notification bell */}
                <button 
                  className={`
                    p-2 rounded-full transition-all duration-300
                    ${isDarkMode
                      ? 'text-gray-300 hover:bg-gray-800/70 hover:text-white' 
                      : isScrolled 
                        ? 'text-gray-600 hover:bg-gray-100/70 hover:text-primary-500' 
                        : 'text-white hover:bg-white/10'
                    }
                    relative
                  `}
                  aria-label="Notifications"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-accent-500 ring-2 ring-white dark:ring-gray-800 animate-pulse"></span>
                </button>
                
                {/* User profile dropdown */}
                <div className="ml-2 relative user-dropdown">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 hover:scale-105"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    <div 
                      className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold shadow-md"
                      style={{ 
                        background: 'linear-gradient(135deg, #319795, #3182CE)' 
                      }}
                    >
                      AJ
                    </div>
                  </button>
                  
                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        className={`
                          origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg 
                          ${isDarkMode 
                            ? 'bg-gray-800 ring-1 ring-gray-700 border border-gray-700' 
                            : 'bg-white ring-1 ring-black ring-opacity-5 border border-gray-100'
                          }
                          overflow-hidden z-10
                        `}
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                          <div className="px-4 py-3">
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Signed in as</p>
                            <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>alex.johnson@example.com</p>
                          </div>
                          
                          <div className="py-1" role="menu" aria-orientation="vertical">
                            <Link to="/profile" 
                              className={`
                                flex items-center px-4 py-2 text-sm group transition-colors
                                ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'}
                              `} 
                              role="menuitem"
                            >
                              <svg className={`mr-3 h-5 w-5 ${isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-primary-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <NavText width="85px">{t.profile}</NavText>
                            </Link>
                            
                            <Link to="/settings" 
                              className={`
                                flex items-center px-4 py-2 text-sm group transition-colors
                                ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'}
                              `} 
                              role="menuitem"
                            >
                              <svg className={`mr-3 h-5 w-5 ${isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-primary-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <NavText width="85px">{t.settings}</NavText>
                            </Link>
                            
                            <Link to="/help" 
                              className={`
                                flex items-center px-4 py-2 text-sm group transition-colors
                                ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'}
                              `} 
                              role="menuitem"
                            >
                              <svg className={`mr-3 h-5 w-5 ${isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-primary-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <NavText width="95px">{t.helpCenter}</NavText>
                            </Link>
                          </div>
                          
                          <div className="py-1">
                            <button 
                              className={`
                                w-full text-left flex items-center px-4 py-2 text-sm group transition-colors
                                ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'}
                              `} 
                              role="menuitem"
                            >
                              <svg className={`mr-3 h-5 w-5 ${isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              <NavText width="70px">{t.signOut}</NavText>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`
                    hidden sm:flex px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                    ${isDarkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                      : isScrolled 
                        ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-100/70' 
                        : 'text-white hover:text-white hover:bg-white/10'
                    }
                    relative overflow-hidden group
                  `}
                >
                  <span className="absolute inset-0 w-full h-full rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 blur"></span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-500"></span>
                  <NavText width="60px">{t.login}</NavText>
                </Link>
                
                <Link 
  to="/register" 
  className={`
    px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-all duration-300
    ${isDarkMode
      ? 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/20'
      : isScrolled 
        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg hover:shadow-primary-500/20' 
        : 'bg-white text-primary-600 hover:bg-white/90 hover:shadow-lg hover:shadow-white/20'
    }
    relative overflow-hidden group
  `}
>
  {/* Animated gradient border */}
  <span className="absolute inset-0 rounded-lg overflow-hidden">
    <span className="absolute inset-0 rounded-lg border border-transparent group-hover:border-primary-300/30 dark:group-hover:border-primary-500/30 transition-all duration-300"></span>
  </span>
  
  {/* Animated shine effect */}
  <span className="absolute -inset-[100%] top-0 block transform -skew-x-12 group-hover:animate-shine bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-500"></span>
  
  {/* Text with fixed width to prevent layout shifts */}
  <NavText width="100px">{t.getStarted}</NavText>
</Link>

{/* Mobile menu button - Only visible on small screens */}
<button 
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  className={`
    sm:hidden p-2 rounded-full 
    transition-all duration-300 hover:scale-105
    ${isDarkMode
      ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
      : isScrolled 
        ? 'text-gray-600 hover:bg-gray-100/70' 
        : 'text-white hover:bg-white/10'
    }
  `}
  aria-label="Toggle mobile menu"
  aria-expanded={isMobileMenuOpen}
>
  <AnimatePresence mode="wait">
    <motion.div
      key={isMobileMenuOpen ? 'open' : 'closed'}
      initial={{ opacity: 0, rotate: isMobileMenuOpen ? -90 : 90 }}
      animate={{ opacity: 1, rotate: 0 }}
      exit={{ opacity: 0, rotate: isMobileMenuOpen ? 90 : -90 }}
      transition={{ duration: 0.2 }}
    >
      {isMobileMenuOpen ? (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </motion.div>
  </AnimatePresence>
</button>
</>
)}
</div>
</div>
</div>

{/* Mobile menu - Animated slide down */}
<AnimatePresence>
{!isLoggedIn && isMobileMenuOpen && (
  <motion.div 
    className={`md:hidden overflow-hidden ${
      isDarkMode 
        ? 'bg-gray-900/95 backdrop-blur-md border-t border-gray-800/30' 
        : isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-t border-gray-200/30' 
          : 'bg-gradient-to-r from-primary-900/95 to-secondary-900/95 backdrop-blur-md'
    }`}
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: 'auto', opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    <div className="px-2 pt-2 pb-3 space-y-1">
      {navLinks.map((link) => (
        <Link 
          key={link.key}
          to={link.path} 
          className={`
            flex justify-center items-center px-3 py-3 text-base font-medium rounded-lg transition-colors duration-300
            ${isDarkMode
              ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
              : isScrolled 
                ? 'text-gray-700 hover:bg-gray-100 hover:text-primary-600' 
                : 'text-white hover:bg-white/10 hover:text-white'
            }
            relative group
          `}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Animated underline */}
          <span className="absolute bottom-0 left-1/4 right-1/4 w-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
          
          <NavText width={link.width}>{link.label}</NavText>
        </Link>
      ))}
      
      <Link 
        to="/login" 
        className={`
          flex justify-center items-center px-3 py-3 text-base font-medium rounded-lg transition-colors duration-300
          ${isDarkMode
            ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
            : isScrolled 
              ? 'text-gray-700 hover:bg-gray-100 hover:text-primary-600' 
              : 'text-white hover:bg-white/10 hover:text-white'
          }
          relative group
        `}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {/* Animated underline */}
        <span className="absolute bottom-0 left-1/4 right-1/4 w-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
        
        <NavText width="60px">{t.login}</NavText>
      </Link>
      
      <div className="p-3">
        <Link 
          to="/register" 
          className={`
            flex justify-center items-center px-4 py-3 text-base font-medium rounded-lg shadow-sm transition-all duration-300 w-full
            ${isDarkMode
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : isScrolled 
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' 
                : 'bg-white text-primary-600 hover:bg-white/90'
            }
            relative overflow-hidden group
          `}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Animated shine effect */}
          <span className="absolute -inset-[100%] top-0 block transform -skew-x-12 group-hover:animate-shine bg-gradient-to-r from-transparent via-white/10 to-transparent"></span>
          
          <NavText width="110px">{t.getStarted}</NavText>
        </Link>
      </div>
    </div>
  </motion.div>
)}
</AnimatePresence>
</nav>
);
}