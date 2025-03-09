// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { MoonIcon, SunIcon, MenuIcon, XIcon, ChevronDownIcon } from 'lucide-react';

// Simple translations object
const translations = {
  en: {
    features: 'Features',
    pricing: 'Pricing',
    testimonials: 'Testimonials',
    blog: 'Blog',
    login: 'Login',
    getStarted: 'Get Started',
    profile: 'Profile',
    settings: 'Settings',
    help: 'Help Center',
    signOut: 'Sign Out'
  },
  id: {
    features: 'Fitur',
    pricing: 'Harga',
    testimonials: 'Testimoni',
    blog: 'Blog',
    login: 'Masuk',
    getStarted: 'Mulai',
    profile: 'Profil',
    settings: 'Pengaturan',
    help: 'Pusat Bantuan',
    signOut: 'Keluar'
  }
};

export default function Navbar({ onMenuClick, isLoggedIn = false }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Get translations based on current language
  const t = translations[language] || translations.en;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
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

  // Background styles based on scroll and dark mode
  const navBackground = isDarkMode
    ? isScrolled ? 'bg-gray-900/80 border-b border-primary-900/30' : 'bg-transparent'
    : isScrolled ? 'bg-white/80 border-b border-primary-200/40 shadow-lg shadow-primary-500/5' : 'bg-transparent';

  // Consistent text colors across both modes
  const navLinkColor = isDarkMode
  ? 'text-primary-400 hover:text-primary-300'
  : isScrolled 
    ? 'text-primary-600 hover:text-primary-700' 
    : 'text-primary-600 hover:text-primary-700'; 
  // Logo background effect for dark/light mode  
  const logoBgEffect = isDarkMode 
    ? 'from-primary-700/20 via-secondary-700/20 to-primary-700/20'
    : 'from-primary-500/20 via-secondary-500/20 to-primary-500/20';

  // Active state background
  const activeNavBg = isDarkMode
    ? 'bg-primary-900/30'
    : isScrolled ? 'bg-primary-50/70' : 'bg-white/20';

  // Nav links data
  const navLinks = [
    { name: t.features, path: '/features' },
    { name: t.pricing, path: '/pricing' },
    { name: t.testimonials, path: '/testimonials' },
    { name: t.blog, path: '/blog' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ease-in-out backdrop-blur-md ${navBackground}`}
      style={{
        backgroundImage: isScrolled 
          ? isDarkMode 
            ? 'radial-gradient(circle at top right, rgba(49, 151, 149, 0.07), transparent 70%)' 
            : 'radial-gradient(circle at top right, rgba(49, 151, 149, 0.05), transparent 70%)'
          : 'none'
      }}
    >
      {/* Top accent border with gradient */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          {/* Left side with logo and menu button */}
          <div className="flex items-center space-x-4">
            {/* Dashboard menu button (only for logged in users) */}
            {isLoggedIn && (
              <motion.button
                onClick={onMenuClick}
                className={`lg:hidden relative p-2 rounded-lg text-primary-500 transition-all duration-300 hover:text-primary-400`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Open main menu"
              >
                <span className={`absolute inset-0 rounded-lg opacity-0 hover:opacity-100 ${
                  isDarkMode ? 'bg-primary-900/50' : 'bg-primary-50/70'
                } transition-opacity duration-300`}></span>
                <MenuIcon size={20} />
              </motion.button>
            )}
            
            {/* Mobile menu button (for non-logged in users) */}
            {!isLoggedIn && (
              <motion.button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden relative p-2 rounded-lg text-primary-500 transition-all duration-300 hover:text-primary-400`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle mobile menu"
              >
                <span className={`absolute inset-0 rounded-lg opacity-0 hover:opacity-100 ${
                  isDarkMode ? 'bg-primary-900/50' : 'bg-primary-50/70'
                } transition-opacity duration-300`}></span>
                {isMobileMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
              </motion.button>
            )}
            
            {/* Logo with amazing effects */}
            <Link to="/" className="flex-shrink-0 group relative">
              <div className={`absolute -inset-4 rounded-2xl bg-gradient-to-r ${logoBgEffect} opacity-0 blur-xl group-hover:opacity-100 group-hover:duration-1000 duration-300 group-hover:animate-pulse-slow`}></div>
              <div className="relative flex items-center">
                <div className="relative">
                  <div className="font-heading font-bold text-2xl md:text-3xl bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-500 bg-clip-text text-transparent bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500">
                    Growthify
                  </div>
                  {/* Animated underline effect */}
                  <div className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
                {/* Orbiting dot animation */}
                <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 group-hover:animate-orbit transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>
          
          {/* Navigation Links - Desktop */}
          {!isLoggedIn && (
            <div className="hidden md:flex md:items-center md:space-x-1">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className={`px-4 py-2 mx-1 rounded-lg text-sm font-medium relative overflow-hidden transition-all duration-300 ${
                      isActive 
                        ? isDarkMode ? 'text-primary-300' : 'text-primary-600' 
                        : navLinkColor
                    }`}
                  >
                    {/* Dynamic highlight effect */}
                    <span className={`absolute inset-0 rounded-lg -z-10 transition-opacity duration-300 
                      ${isActive ? activeNavBg : 'opacity-0'}`}
                    ></span>

                    {/* Hover highlight */}
                    <span className={`absolute inset-0 rounded-lg -z-10 opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                      isDarkMode ? 'bg-primary-900/50' : isScrolled ? 'bg-primary-50/70' : 'bg-white/20'
                    }`}></span>
                    
                    {/* Text with dot indicator for active state */}
                    <span className="relative flex items-center">
                      {link.name}
                      {isActive && (
                        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500"></span>
                      )}
                    </span>
                    
                    {/* Animated underline with gradient */}
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-500/0 via-primary-500 to-primary-500/0 transform scale-x-0 hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                  </Link>
                );
              })}
            </div>
          )}
          
          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle with elegant effects */}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg relative overflow-hidden text-primary-500 hover:text-primary-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Dark Mode"
            >
              <span className={`absolute inset-0 rounded-lg opacity-0 hover:opacity-100 ${
                isDarkMode ? 'bg-primary-900/50' : 'bg-primary-50/70'
              } transition-opacity duration-300`}></span>
              
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDarkMode ? 'dark' : 'light'}
                  initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  {isDarkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Language Switcher with hover effects */}
            <motion.button 
              onClick={toggleLanguage}
              className="flex items-center space-x-2 p-2 rounded-lg relative overflow-hidden text-primary-500 hover:text-primary-400 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Switch Language"
            >
              <span className={`absolute inset-0 rounded-lg opacity-0 hover:opacity-100 ${
                isDarkMode ? 'bg-primary-900/50' : 'bg-primary-50/70'
              } transition-opacity duration-300`}></span>
              
              {/* Flag with glamorous effects */}
              <div className="relative">
                <motion.div 
                  className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 hover:opacity-100 blur-sm transition-opacity duration-300"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <img 
                  src={`/flags/${language === 'en' ? 'us-flag.png' : 'idn-flag.png'}`}
                  alt={language === 'en' ? 'English' : 'Bahasa Indonesia'}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-primary-500/30 relative"
                />
              </div>
              <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'ID'}</span>
            </motion.button>

            {/* User Menu for Logged In Users */}
            {isLoggedIn ? (
              <div className="relative user-dropdown">
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
                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold bg-gradient-to-br from-primary-500 to-secondary-500 shadow-md relative ring-2 ring-white/10 dark:ring-black/5">
                      AJ
                    </div>
                  </div>
                  
                  <div className="hidden sm:flex items-center text-primary-500 hover:text-primary-400">
                    <span className="text-sm font-medium">Alex J</span>
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
                            <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-medium bg-gradient-to-br from-primary-500 to-secondary-500 shadow-md relative">
                              AJ
                            </div>
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Alex Johnson</p>
                            <p className="text-xs text-primary-500">Premium Member</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Items with hover effects */}
                      <div className="py-2">
                        <Link to="/profile" className={`flex items-center px-4 py-2 text-sm ${
                          isDarkMode ? 'text-gray-300 hover:bg-primary-900/30 hover:text-primary-300' : 'text-gray-700 hover:bg-primary-50/70 hover:text-primary-600'
                        } transition-colors duration-200`}>
                          <svg className="h-4 w-4 mr-3 text-primary-500 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {t.profile}
                        </Link>
                        
                        <Link to="/settings" className={`flex items-center px-4 py-2 text-sm ${
                          isDarkMode ? 'text-gray-300 hover:bg-primary-900/30 hover:text-primary-300' : 'text-gray-700 hover:bg-primary-50/70 hover:text-primary-600'
                        } transition-colors duration-200`}>
                          <svg className="h-4 w-4 mr-3 text-primary-500 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {t.settings}
                        </Link>
                        
                        <Link to="/help" className={`flex items-center px-4 py-2 text-sm ${
                          isDarkMode ? 'text-gray-300 hover:bg-primary-900/30 hover:text-primary-300' : 'text-gray-700 hover:bg-primary-50/70 hover:text-primary-600'
                        } transition-colors duration-200`}>
                          <svg className="h-4 w-4 mr-3 text-primary-500 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {t.help}
                        </Link>
                      </div>
                      
                      {/* Sign Out Button with hover effect */}
                      <div className={`py-2 ${isDarkMode ? 'border-t border-gray-800' : 'border-t border-gray-100'}`}>
                        <button className={`w-full text-left flex items-center px-4 py-2 text-sm ${
                          isDarkMode 
                            ? 'text-gray-300 hover:bg-primary-900/30 hover:text-primary-300' 
                            : 'text-gray-700 hover:bg-primary-50/70 hover:text-primary-600'
                        } transition-colors duration-200`}>
                          <svg className="h-4 w-4 mr-3 text-primary-500 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          {t.signOut}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                {/* Login Button with hover effects */}
                <Link 
                  to="/login" 
                  className="hidden sm:flex items-center px-4 py-2 text-sm font-medium rounded-lg relative overflow-hidden text-primary-500 hover:text-primary-400 transition-all duration-300"
                >
                  <span className={`absolute inset-0 rounded-lg opacity-0 hover:opacity-100 ${
                    isDarkMode ? 'bg-primary-900/50' : 'bg-primary-50/70'
                  } transition-opacity duration-300`}></span>
                  <span className="relative">{t.login}</span>
                </Link>
                
                {/* Get Started Button with premium effects */}
                <Link 
                  to="/register" 
                  className="relative overflow-hidden group"
                >
                  {/* Animated glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 rounded-lg opacity-30 group-hover:opacity-60 blur-md group-hover:blur-lg transition-all duration-500 animate-gradient-shift"></div>
                  
                  {/* Button with hover and press effect */}
                  <div className={`relative flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                    isDarkMode
                      ? 'bg-primary-700 text-white hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-700/30' 
                      : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg hover:shadow-primary-500/30'
                  } transition-all duration-300 group-hover:translate-y-[1px]`}>
                    {/* Subtle inner shimmer effect */}
                    <span className="absolute inset-0 rounded-lg overflow-hidden">
                      <span className="absolute -inset-[100%] top-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine"></span>
                    </span>
                    <span className="relative">{t.getStarted}</span>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu - Animated slide down with premium styling */}
      <AnimatePresence>
        {!isLoggedIn && isMobileMenuOpen && (
          <motion.div 
            className={`md:hidden ${
              isDarkMode 
                ? 'bg-gray-900/95 border-b border-primary-900/30' 
                : 'bg-white/95 border-b border-primary-100/30'
            } shadow-xl`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.name}
                    to={link.path} 
                    className={`block px-4 py-3 rounded-lg text-base font-medium relative ${
                      isActive
                        ? 'text-primary-500'
                        : 'text-primary-600 hover:text-primary-500'
                    } transition-colors duration-200`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className={`absolute inset-0 rounded-lg -z-10 ${
                      isActive
                        ? isDarkMode ? 'bg-primary-900/30' : 'bg-primary-50/70'
                        : 'opacity-0 hover:opacity-100 transition-opacity duration-300'
                    } ${isDarkMode ? 'hover:bg-primary-900/30' : 'hover:bg-primary-50/70'}`}></span>
                    <div className="flex items-center">
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="ml-2 w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                      )}
                    </div>
                  </Link>
                );
              })}
              
              <Link 
  to="/login" 
  className={`hidden sm:flex items-center px-4 py-2 text-sm font-medium rounded-lg relative overflow-hidden ${
    isDarkMode 
      ? 'text-primary-400 hover:text-primary-300' 
      : 'text-primary-600 hover:text-primary-700'
  } transition-all duration-300`}
>
  <span className={`absolute inset-0 rounded-lg opacity-0 hover:opacity-100 ${
    isDarkMode ? 'bg-primary-900/50' : 'bg-primary-50/70'
  } transition-opacity duration-300`}></span>
  <span className="relative">{t.login}</span>
</Link>
              
              {/* CTA Button for Mobile */}
              <div className="p-2">
                <Link 
                  to="/register"
                  className="relative block overflow-hidden group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {/* Animated glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 rounded-lg opacity-30 group-hover:opacity-60 blur-md group-hover:blur-lg transition-all duration-500 animate-gradient-shift"></div>
                  
                  {/* Button with hover and press effect */}
                  <div className={`relative flex justify-center items-center px-4 py-3 text-base font-medium rounded-lg ${
                    isDarkMode
                      ? 'bg-primary-700 text-white hover:bg-primary-600' 
                      : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                  } transition-all duration-300 group-hover:translate-y-[1px]`}>
                    {/* Subtle inner shimmer effect */}
                    <span className="absolute inset-0 rounded-lg overflow-hidden">
                      <span className="absolute -inset-[100%] top-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine"></span>
                    </span>
                    <span className="relative">{t.getStarted}</span>
                    </div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}