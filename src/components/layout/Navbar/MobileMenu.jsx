// src/components/layout/Navbar/MobileMenu.jsx
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Mobile Menu Button
const Button = ({ isOpen, onClick, isDarkMode }) => {
  return (
    <button
      type="button"
      className={`md:hidden p-2 rounded-lg ${
        isDarkMode 
          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
          : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100'
      }`}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label="Toggle menu"
    >
      <span className="sr-only">Open main menu</span>
      <div className="w-6 h-6 flex items-center justify-center relative">
        <span
          aria-hidden="true"
          className={`absolute block w-5 h-0.5 transform transition duration-300 ease-in-out ${
            isDarkMode ? 'bg-gray-300' : 'bg-neutral-600'
          } ${isOpen ? 'rotate-45' : '-translate-y-1.5'}`}
        ></span>
        <span
          aria-hidden="true"
          className={`absolute block w-5 h-0.5 ${
            isDarkMode ? 'bg-gray-300' : 'bg-neutral-600'
          } ${isOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ease-in-out`}
        ></span>
        <span
          aria-hidden="true"
          className={`absolute block w-5 h-0.5 transform transition duration-300 ease-in-out ${
            isDarkMode ? 'bg-gray-300' : 'bg-neutral-600'
          } ${isOpen ? '-rotate-45' : 'translate-y-1.5'}`}
        ></span>
      </div>
    </button>
  );
};

// Dashboard Menu Button (hamburger style)
const DashboardButton = ({ onMenuClick, isDarkMode }) => {
  return (
    <button
      type="button"
      className={`md:hidden p-2 rounded-lg ${
        isDarkMode 
          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
          : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100'
      }`}
      onClick={onMenuClick}
      aria-label="Toggle dashboard menu"
    >
      <span className="sr-only">Open dashboard menu</span>
      <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
        <span
          aria-hidden="true"
          className={`block w-5 h-0.5 ${isDarkMode ? 'bg-gray-300' : 'bg-neutral-600'}`}
        ></span>
        <span
          aria-hidden="true"
          className={`block w-5 h-0.5 ${isDarkMode ? 'bg-gray-300' : 'bg-neutral-600'}`}
        ></span>
        <span
          aria-hidden="true"
          className={`block w-5 h-0.5 ${isDarkMode ? 'bg-gray-300' : 'bg-neutral-600'}`}
        ></span>
      </div>
    </button>
  );
};

// Mobile Menu Panel with slide-in animation
const Panel = ({ isOpen, links, currentPath, isDarkMode, registerText, onLinkClick }) => {
  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "afterChildren",
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  };
  
  const linkVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onLinkClick}
          ></motion.div>
          
          {/* Menu panel with links */}
          <motion.div
            className={`fixed top-0 left-0 bottom-0 w-64 ${
              isDarkMode 
                ? 'bg-gray-900/95 border-r border-gray-800' 
                : 'bg-white/95 border-r border-neutral-200'
            } z-50 overflow-y-auto md:hidden`}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Menu header with gradient accent */}
            <div className="h-16 flex items-center justify-center relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"></div>
              <div className="font-heading font-bold text-xl bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-500 bg-clip-text text-transparent">
                Growthify
              </div>
            </div>
            
            {/* Links container */}
            <div className="px-2 py-3 space-y-1">
              {links.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <motion.div
                    key={link.name}
                    variants={linkVariants}
                    onClick={onLinkClick}
                  >
                    <Link
                      to={link.path}
                      className={`block px-3 py-2 rounded-lg text-base font-medium transition-all ${
                        isActive
                          ? isDarkMode 
                            ? 'bg-primary-900/30 text-primary-400' 
                            : 'bg-primary-50 text-primary-600'
                          : isDarkMode
                            ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                            : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Sign up button */}
              <motion.div 
                variants={linkVariants}
                className="pt-4 mt-4 border-t border-dashed border-gray-700/50"
              >
                <Link
                  to="/register"
                  className={`block w-full text-center px-4 py-2 rounded-lg text-white font-medium ${
                    isDarkMode ? 'bg-primary-600 hover:bg-primary-700' : 'bg-primary-500 hover:bg-primary-600'
                  } transition-colors`}
                  onClick={onLinkClick}
                >
                  {registerText}
                </Link>
              </motion.div>
            </div>
            
            {/* Footer area */}
            <div className={`absolute bottom-6 left-0 right-0 px-4 text-center text-xs ${
              isDarkMode ? 'text-gray-500' : 'text-neutral-500'
            }`}>
              &copy; {new Date().getFullYear()} Growthify
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Export all components as named exports in an object
export default {
  Button,
  DashboardButton,
  Panel
};