// src/components/layout/Navbar/AuthButtons.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AuthButtons({ loginText, registerText, isDarkMode }) {
  return (
    <div className="hidden md:flex md:items-center space-x-3">
      {/* Login button - with ghost style */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link 
          to="/login" 
          className={`
            px-4 py-2 rounded-lg text-sm font-medium 
            ${isDarkMode 
              ? 'text-primary-400 hover:bg-primary-900/30 hover:text-primary-300' 
              : 'text-primary-600 hover:bg-primary-50/70 hover:text-primary-700'
            }
            transition-all duration-300
          `}
        >
          {loginText}
        </Link>
      </motion.div>
      
      {/* Register button - with prominent style and gradient hover effect */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        {/* Gradient glow effect on hover */}
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
        
        <Link 
          to="/register" 
          className={`
            relative px-5 py-2 rounded-lg text-sm font-medium
            ${isDarkMode 
              ? 'bg-primary-600 text-white hover:bg-primary-700' 
              : 'bg-primary-500 text-white hover:bg-primary-600'
            }
            shadow-md hover:shadow-lg hover:shadow-primary-500/20
            transition-all duration-300
          `}
        >
          {registerText}
        </Link>
      </motion.div>
    </div>
  );
}