// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onMenuClick, isLoggedIn = false }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-10 transition-all duration-300 ${
      isScrolled 
        ? 'bg-content shadow-md py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {/* Mobile menu button */}
            {isLoggedIn && (
              <button
                onClick={onMenuClick}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-text-muted hover:text-primary-500 hover:bg-primary-50 focus:outline-none"
                aria-label="Open menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center ml-0 lg:ml-0">
              <div className={`font-heading font-bold text-xl md:text-2xl ${
                !isScrolled ? 'text-text-light' : ''
              }`}
                   style={{
                     backgroundImage: 'linear-gradient(90deg, #319795, #3182CE)',
                     WebkitBackgroundClip: 'text',
                     backgroundClip: 'text',
                     color: 'transparent'
                   }}>
                Growthify
              </div>
            </Link>
          </div>
          
          {/* Navigation links - only show on larger screens when not logged in */}
          {!isLoggedIn && (
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-6">
              <Link to="/features" className={`px-3 py-2 text-sm font-medium transition-colors ${
                isScrolled ? 'text-text hover:text-primary-500' : 'text-text-light hover:text-white'
              }`}>
                Features
              </Link>
              <Link to="/pricing" className={`px-3 py-2 text-sm font-medium transition-colors ${
                isScrolled ? 'text-text hover:text-primary-500' : 'text-text-light hover:text-white'
              }`}>
                Pricing
              </Link>
              <Link to="/testimonials" className={`px-3 py-2 text-sm font-medium transition-colors ${
                isScrolled ? 'text-text hover:text-primary-500' : 'text-text-light hover:text-white'
              }`}>
                Testimonials
              </Link>
              <Link to="/blog" className={`px-3 py-2 text-sm font-medium transition-colors ${
                isScrolled ? 'text-text hover:text-primary-500' : 'text-text-light hover:text-white'
              }`}>
                Blog
              </Link>
            </div>
          )}
          
          {/* Right side buttons */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <>
                {/* Notification bell */}
                <button className={`p-2 rounded-full hover:bg-primary-50 focus:outline-none relative ${
                  isScrolled ? 'text-text-muted hover:text-primary-500' : 'text-text-light hover:text-white'
                }`}
                        aria-label="Notifications">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: '#48BB78' }}></span>
                </button>
                
                {/* User profile dropdown */}
                <div className="ml-3 relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold"
                         style={{ 
                           background: 'linear-gradient(90deg, #319795, #3182CE)' 
                         }}>
                      AJ
                    </div>
                  </button>
                  
                  {/* Dropdown menu */}
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-content ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <Link to="/profile" className="block px-4 py-2 text-sm text-text hover:bg-primary-50" role="menuitem">Your Profile</Link>
                        <Link to="/settings" className="block px-4 py-2 text-sm text-text hover:bg-primary-50" role="menuitem">Settings</Link>
                        <Link to="/help" className="block px-4 py-2 text-sm text-text hover:bg-primary-50" role="menuitem">Help Center</Link>
                        <div className="border-t border-secondary-200 my-1"></div>
                        <button className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-primary-50" role="menuitem">Sign out</button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className={`px-4 py-2 text-sm font-medium transition-colors ${
                  isScrolled ? 'text-primary-600 hover:text-primary-700' : 'text-text-light hover:text-white'
                }`}>
                  Login
                </Link>
                <Link to="/register" 
                      className={`ml-4 px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-colors ${
                        isScrolled 
                          ? 'bg-primary-500 text-white hover:bg-primary-600' 
                          : 'bg-transparent text-text-light border border-white hover:bg-white/10'
                      }`}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu - when not logged in */}
      {!isLoggedIn && (
        <div className={`md:hidden ${isScrolled ? 'bg-content' : 'bg-secondary-900 bg-opacity-90'}`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/features" className={`block px-3 py-2 text-base font-medium ${
              isScrolled 
                ? 'text-text hover:text-primary-500 hover:bg-primary-50' 
                : 'text-text-light hover:text-white hover:bg-secondary-800 hover:bg-opacity-70'
            }`}>
              Features
            </Link>
            <Link to="/pricing" className={`block px-3 py-2 text-base font-medium ${
              isScrolled 
                ? 'text-text hover:text-primary-500 hover:bg-primary-50' 
                : 'text-text-light hover:text-white hover:bg-secondary-800 hover:bg-opacity-70'
            }`}>
              Pricing
            </Link>
            <Link to="/testimonials" className={`block px-3 py-2 text-base font-medium ${
              isScrolled 
                ? 'text-text hover:text-primary-500 hover:bg-primary-50' 
                : 'text-text-light hover:text-white hover:bg-secondary-800 hover:bg-opacity-70'
            }`}>
              Testimonials
            </Link>
            <Link to="/blog" className={`block px-3 py-2 text-base font-medium ${
              isScrolled 
                ? 'text-text hover:text-primary-500 hover:bg-primary-50' 
                : 'text-text-light hover:text-white hover:bg-secondary-800 hover:bg-opacity-70'
            }`}>
              Blog
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}