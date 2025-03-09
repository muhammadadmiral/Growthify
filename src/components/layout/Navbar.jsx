// src/components/layout/Navbar/index.jsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';

import AuthButtons from './Navbar/AuthButtons';
import DarkModeToggle from './Navbar/DarkModeToggle';
import DesktopNav from './Navbar/DesktopNav';
import LanguageSwitcher from './Navbar/LanguageSwitcher';
import Logo from './Navbar/Logo';
import MobileMenu from './Navbar/MobileMenu';
import UserMenu from './Navbar/UserMenu';




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
    dashboard: 'Dashboard'
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
    dashboard: 'Dasbor'
  }
};

export default function Navbar({ onMenuClick }) {
  const [userData, setUserData] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();

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
              role: userData.role || 'user'
            });
          } else {
            // Basic user info if Firestore data not available
            setUserData({
              uid: user.uid,
              name: user.displayName || 'User',
              email: user.email,
              avatar: user.photoURL
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Basic user info if there's an error
          setUserData({
            uid: user.uid,
            name: user.displayName || 'User',
            email: user.email,
            avatar: user.photoURL
          });
        }
      } else {
        setUserData(null);
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
  }, [location.pathname]);

  // Background styles based on scroll and dark mode
  const navBackground = isDarkMode
    ? isScrolled ? 'bg-gray-900/80 border-b border-primary-900/30' : 'bg-transparent'
    : isScrolled ? 'bg-white/80 border-b border-primary-200/40 shadow-lg shadow-primary-500/5' : 'bg-transparent';

  // Nav links data
  const navLinks = [
    { name: t.features, path: '/features' },
    { name: t.pricing, path: '/pricing' },
    { name: t.testimonials, path: '/testimonials' },
    { name: t.blog, path: '/blog' }
  ];

  const dashboardLink = { name: t.dashboard, path: '/dashboard' };
  const isUserLoggedIn = !!userData;

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
            {isUserLoggedIn ? (
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
          
          {/* Navigation Links - Desktop */}
          {isAuthCheckComplete && !isUserLoggedIn && (
            <DesktopNav 
              links={navLinks} 
              currentPath={location.pathname}
              isDarkMode={isDarkMode}
              isScrolled={isScrolled}
            />
          )}
          
          {/* Dashboard Link for logged in users */}
          {isAuthCheckComplete && isUserLoggedIn && (
            <DesktopNav 
              links={[dashboardLink]} 
              currentPath={location.pathname}
              isDarkMode={isDarkMode}
              isScrolled={isScrolled}
            />
          )}
          
          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <DarkModeToggle isDarkMode={isDarkMode} />

            {/* Language Switcher */}
            <LanguageSwitcher variant="default" />

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
          links={navLinks}
          currentPath={location.pathname}
          isDarkMode={isDarkMode}
          registerText={t.getStarted}
          onLinkClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}