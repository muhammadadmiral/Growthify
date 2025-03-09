// src/components/Home/HeroSection.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useTranslations } from '../../hooks/useTranslations';

export default function HeroSection() {
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslations();
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Hero Background */}
      <div 
        className={`absolute inset-0 transform skewY(-6deg) origin-top-right -translate-y-36 z-0 ${
          isDarkMode ? 'bg-gray-800' : ''
        }`}
        style={{ 
          background: isDarkMode 
            ? 'linear-gradient(135deg, #1e3a8a, #1e1e3a, #1a2e35)'
            : 'linear-gradient(135deg, #E6FFFA, #EBF8FF, #F0FFF4)',
          boxShadow: isDarkMode
            ? 'inset 0 0 30px rgba(49, 151, 149, 0.05)'
            : 'inset 0 0 30px rgba(49, 151, 149, 0.1)'
        }}
      ></div>
      
      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1 
          className={`text-4xl md:text-5xl font-bold mb-6 leading-tight font-heading ${
            isDarkMode ? 'text-gray-100' : 'text-text-dark'
          }`}
          variants={fadeInUp}
        >
          {t.home.hero.title.split(' With ')[0]}{' '}
          <span className="gradient-text">With</span>{' '}
          {t.home.hero.title.split(' With ')[1]}
        </motion.h1>
        
        <motion.p 
          className={`max-w-2xl mx-auto text-lg md:text-xl mb-10 ${
            isDarkMode ? 'text-gray-300' : 'text-text'
          }`}
          variants={fadeInUp}
        >
          {t.home.hero.subtitle}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={fadeInUp}
        >
          <Link
            to="/register"
            className={`px-8 py-3 rounded-md ${
              isDarkMode 
                ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                : 'bg-primary-500 text-white hover:bg-primary-600'
            } font-medium shadow-lg transform hover:scale-105 transition-all duration-200`}
          >
            {t.home.hero.startButton}
          </Link>
          
          <Link
            to="/features"
            className={`px-8 py-3 rounded-md ${
              isDarkMode 
                ? 'border border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700'
                : 'border border-secondary-300 bg-white text-secondary-700 hover:bg-secondary-50'
            } font-medium transition-all duration-200`}
          >
            {t.home.hero.exploreButton}
          </Link>
        </motion.div>
        
        {/* Feature checkmarks */}
        <motion.div 
          className={`mt-10 flex flex-wrap justify-center gap-6 text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-text'
          }`}
          variants={fadeInUp}
        >
          <div className="flex items-center">
            <span className={`${isDarkMode ? 'text-primary-400' : 'text-primary-500'} mr-2`}>✓</span>
            <span>{t.home.hero.features.personalizedPlans}</span>
          </div>
          <div className="flex items-center">
            <span className={`${isDarkMode ? 'text-primary-400' : 'text-primary-500'} mr-2`}>✓</span>
            <span>{t.home.hero.features.expertGuidance}</span>
          </div>
          <div className="flex items-center">
            <span className={`${isDarkMode ? 'text-primary-400' : 'text-primary-500'} mr-2`}>✓</span>
            <span>{t.home.hero.features.progressTracking}</span>
          </div>
        </motion.div>
        
        {/* Decorative elements */}
        <div 
          className="absolute bottom-0 right-0 w-64 h-64 opacity-20 rounded-full" 
          style={{ 
            background: isDarkMode
              ? 'radial-gradient(circle, #2C7A7B, transparent)'
              : 'radial-gradient(circle, #38B2AC, transparent)' 
          }}
        ></div>
        <div 
          className="absolute top-40 left-10 w-32 h-32 opacity-20 rounded-full hidden md:block" 
          style={{ 
            background: isDarkMode
              ? 'radial-gradient(circle, #2B6CB0, transparent)'
              : 'radial-gradient(circle, #4299E1, transparent)' 
          }}
        ></div>
      </motion.div>
    </div>
  );
}