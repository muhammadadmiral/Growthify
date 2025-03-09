// src/components/layout/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

// Import components
import AuthButtons from './Navbar/AuthButtons';
import DarkModeToggle from './Navbar/DarkModeToggle';
import DesktopNav from './Navbar/DesktopNav';
import LanguageSwitcher from './Navbar/LanguageSwitcher';
import Logo from './Navbar/Logo';
import MobileMenu from './Navbar/MobileMenu';
import UserMenu from './Navbar/UserMenu';

// Import icons (these would normally be imported from react-icons)
// If you don't have react-icons installed, the icons will fallback to the SVG versions

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
    signOut: 'Sign Out',
    dashboard: 'Dashboard',
    search: 'Search...',
    notifications: 'Notifications'
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
    signOut: 'Keluar',
    dashboard: 'Dasbor',
    search: 'Cari...',
    notifications: 'Notifikasi'
  }
};

export default function Navbar({ onMenuClick }) {
  const [userData, setUserData] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const location = useLocation();
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const searchInputRef = useRef(null);
  const notificationRef = useRef(null);

  // Get translations based on current language
  const t = translations[language] || translations.en;

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user data from Firestore
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserData({
              uid: user.uid,
              name: userData.name || user.displayName || 'User',
              email: user.email,
              avatar: userData.profileImage || user.photoURL,
              role: userData.role || 'user',
              level: userData.level || 1,
              points: userData.points || 0
            });
          } else {
            // Basic user info if Firestore data not available
            setUserData({
              uid: user.uid,
              name: user.displayName || 'User',
              email: user.email,
              avatar: user.photoURL,
              level: 1,
              points: 0
            });
          }
          
          // Mock notifications - in a real app, fetch from Firestore
          setNotifications([
            { id: 1, title: 'New achievement unlocked!', read: false, time: '2h ago' },
            { id: 2, title: 'You completed a 3-day streak!', read: false, time: '1d ago' },
            { id: 3, title: 'New workout plan available', read: true, time: '3d ago' }
          ]);
          
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Basic user info if there's an error
          setUserData({
            uid: user.uid,
            name: user.displayName || 'User',
            email: user.email,
            avatar: user.photoURL,
            level: 1, 
            points: 0
          });
        }
      } else {
        setUserData(null);
        setNotifications([]);
      }
      setIsAuthCheckComplete(true);
    });

    return () => unsubscribe();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsNotificationsOpen(false);
  }, [location.pathname]);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close search if open and clicked outside
      if (searchInputRef.current && 
          !searchInputRef.current.contains(event.target) && 
          !event.target.closest('[data-search-toggle]')) {
        setIsSearchOpen(false);
      }
      
      // Close notifications if open and clicked outside
      if (notificationRef.current && 
          !notificationRef.current.contains(event.target) &&
          !event.target.closest('[data-notifications-toggle]')) {
        setIsNotificationsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Background styles based on scroll and dark mode
  const navBackground = isDarkMode
    ? isScrolled ? 'bg-gray-900/80 border-b border-primary-900/30' : 'bg-transparent'
    : isScrolled ? 'bg-white/80 border-b border-primary-200/40 shadow-lg shadow-primary-500/5' : 'bg-transparent';

  // Check if on dashboard
  const isDashboardPage = location.pathname.startsWith('/dashboard') || 
                          location.pathname.startsWith('/profile') || 
                          location.pathname.startsWith('/physical') || 
                          location.pathname.startsWith('/mental') || 
                          location.pathname.startsWith('/habits') || 
                          location.pathname.startsWith('/social');

  // Nav links data - different for public vs dashboard
  const publicNavLinks = [
    { name: t.features, path: '/features' },
    { name: t.pricing, path: '/pricing' },
    { name: t.testimonials, path: '/testimonials' },
    { name: t.blog, path: '/blog' }
  ];

  const dashboardLink = { name: t.dashboard, path: '/dashboard' };
  const isUserLoggedIn = !!userData;
  
  // Handle search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
    setIsSearchOpen(false);
  };
  
  // Toggle search
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsNotificationsOpen(false);
  };
  
  // Toggle notifications
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsSearchOpen(false);
  };
  
  // Unread notifications count
  const unreadCount = notifications.filter(n => !n.read).length;
  
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
            {/* Menu buttons */}
            {isUserLoggedIn && isDashboardPage ? (
              <MobileMenu.DashboardButton onMenuClick={onMenuClick} isDarkMode={isDarkMode} />
            ) : (
              <MobileMenu.Button 
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                isDarkMode={isDarkMode}
              />
            )}
            
            {/* Logo */}
            <Logo isDarkMode={isDarkMode} />
          </div>
          
          {/* Middle section: Navigation Links for public, Search for dashboard */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-md mx-auto">
            {isAuthCheckComplete && !isDashboardPage && (
              <DesktopNav 
                links={publicNavLinks} 
                currentPath={location.pathname}
                isDarkMode={isDarkMode}
                isScrolled={isScrolled}
              />
            )}
            
            {isAuthCheckComplete && isUserLoggedIn && isDashboardPage && (
              <div className="w-full max-w-md">
                <form onSubmit={handleSearchSubmit} className="relative w-full">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={t.search}
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className={`
                        pl-10 pr-3 py-2 w-full rounded-lg text-sm
                        focus:outline-none focus:ring-2 focus:ring-primary-600
                        ${isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                          : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'}
                      `}
                      aria-label="Search"
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
          
          {/* Right Side */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Dark Mode Toggle */}
            <DarkModeToggle isDarkMode={isDarkMode} />

            {/* Language Switcher */}
            <LanguageSwitcher variant="default" />
            
            {/* Mobile Search Button - Dashboard only */}
            {isUserLoggedIn && isDashboardPage && (
              <button 
                data-search-toggle
                onClick={toggleSearch}
                className={`md:hidden relative p-2 rounded-full
                  ${isDarkMode 
                    ? 'hover:bg-gray-800 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-600'}
                `}
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
            
            {/* Notifications - Only for logged in users */}
            {isAuthCheckComplete && isUserLoggedIn && (
              <div className="relative">
                <button 
                  data-notifications-toggle
                  onClick={toggleNotifications}
                  className={`
                    relative p-2 rounded-full
                    ${isDarkMode 
                      ? 'hover:bg-gray-800 text-gray-300' 
                      : 'hover:bg-gray-100 text-gray-600'}
                  `}
                  aria-label={t.notifications}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  
                  {/* Notification badge */}
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center text-xs bg-red-500 text-white rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notifications dropdown */}
                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      ref={notificationRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`
                        absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto py-2 rounded-lg shadow-lg
                        ${isDarkMode 
                          ? 'bg-gray-800 border border-gray-700 text-gray-200' 
                          : 'bg-white border border-gray-200 text-gray-800'}
                        z-50
                      `}
                    >
                      <div className="px-4 py-2 border-b border-gray-700 flex justify-between items-center">
                        <h3 className="font-medium">Notifications</h3>
                        <button 
                          className={`text-xs ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}
                          onClick={() => {
                            // Mark all as read functionality
                            setNotifications(notifications.map(n => ({ ...n, read: true })));
                          }}
                        >
                          Mark all as read
                        </button>
                      </div>
                      
                      {notifications.length > 0 ? (
                        <div>
                          {notifications.map((notification) => (
                            <div 
                              key={notification.id}
                              className={`px-4 py-3 ${!notification.read ? (isDarkMode ? 'bg-gray-700/40' : 'bg-blue-50/40') : ''} ${isDarkMode ? 'hover:bg-gray-700/70' : 'hover:bg-gray-100'}`}
                            >
                              <div className="flex justify-between">
                                <p className={`text-sm font-medium ${!notification.read && 'font-semibold'}`}>
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-primary-400' : 'bg-primary-500'}`}></span>
                                )}
                              </div>
                              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {notification.time}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="px-4 py-6 text-center">
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No notifications yet</p>
                        </div>
                      )}
                      
                      <div className={`px-4 py-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} mt-1`}>
                        <Link 
                          to="/notifications" 
                          className={`text-xs ${isDarkMode ? 'text-primary-400' : 'text-primary-600'} block text-center`}
                          onClick={() => setIsNotificationsOpen(false)}
                        >
                          View all notifications
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* User Menu or Auth Buttons */}
            {isAuthCheckComplete && isUserLoggedIn ? (
              <UserMenu userData={userData} isDarkMode={isDarkMode} menuItems={[
                { name: t.profile, path: '/profile', icon: 'profile' },
                { name: t.settings, path: '/settings', icon: 'settings' },
                { name: t.help, path: '/help', icon: 'help' },
                { name: t.signOut, action: 'signOut', icon: 'signOut' }
              ]} />
            ) : isAuthCheckComplete && (
              <AuthButtons 
                loginText={t.login} 
                registerText={t.getStarted} 
                isDarkMode={isDarkMode} 
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {!isUserLoggedIn && (
        <MobileMenu.Panel 
          isOpen={isMobileMenuOpen}
          links={publicNavLinks}
          currentPath={location.pathname}
          isDarkMode={isDarkMode}
          registerText={t.getStarted}
          onLinkClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile Search Panel */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden border-t ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}
          >
            <div className="container mx-auto px-4 py-3">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={t.search}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={`
                      pl-10 pr-10 py-2 w-full rounded-lg text-sm
                      focus:outline-none focus:ring-2 focus:ring-primary-600
                      ${isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                        : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'}
                    `}
                    aria-label="Search"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className={`p-1 rounded-full ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}