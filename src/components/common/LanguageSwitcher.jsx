// src/components/common/LanguageSwitcher.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function LanguageSwitcher({ variant = "default" }) {
  const { language, toggleLanguage, isChangingLanguage } = useLanguage();
  const { isDarkMode } = useDarkMode();
  
  // Variants for different sizes/styles
  const variants = {
    default: {
      container: "w-20 h-10 rounded-full",
      text: "text-sm",
      flagSize: "w-5 h-5"
    },
    small: {
      container: "w-16 h-8 rounded-full", 
      text: "text-xs",
      flagSize: "w-4 h-4"
    },
    large: {
      container: "w-24 h-12 rounded-full",
      text: "text-base",
      flagSize: "w-6 h-6"
    },
    minimal: {
      container: "px-2 py-1 rounded",
      text: "text-xs",
      flagSize: "w-4 h-4"
    },
    contrast: {
      container: "w-20 h-10 rounded-full",
      text: "text-sm text-white",
      flagSize: "w-5 h-5"
    }
  };
  
  const style = variants[variant] || variants.default;
  
  // Flag URLs with fallbacks
  const flags = {
    en: [
      '/icons/flags/us_flag.svg', 
      '/assets/flags/us_flag.svg',
      '/images/flags/us_flag.svg'
    ],
    id: [
      '/icons/flags/id_flag.svg',
      '/assets/flags/id_flag.svg',
      '/images/flags/id_flag.svg'
    ]
  };
  
  // Animation variants
  const containerVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };
  
  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 5
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };
  
  // Get language text
  const getText = (lang) => {
    return lang === 'en' ? 'EN' : 'ID';
  };
  
  // Try each flag path
  const getFallbackFlag = (lang) => {
    // Create emoji fallback
    if (lang === 'en') return '🇺🇸';
    if (lang === 'id') return '🇮🇩';
    return '🌐';
  };
  
  // Track image loading state
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  // Try the next flag image when one fails
  const handleImageError = () => {
    const availablePaths = flags[language] || [];
    if (currentImageIndex < availablePaths.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      // All images failed, show emoji
      setImageLoaded(false);
    }
  };
  
  return (
    <motion.button 
      onClick={toggleLanguage}
      disabled={isChangingLanguage}
      className={`
        relative flex items-center justify-center 
        ${style.container} transition-all duration-300
        ${variant === 'contrast' 
          ? 'bg-white/10 hover:bg-white/20'
          : isDarkMode
            ? 'text-gray-300 hover:bg-gray-700'
            : 'text-primary-700 hover:bg-primary-100/20'
        }
        ${isChangingLanguage ? 'opacity-50 cursor-wait' : ''}
      `}
      variants={containerVariants}
      whileHover="hover"
      whileTap="tap"
      aria-label="Switch Language"
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={language}
          className="absolute flex items-center"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {imageLoaded ? (
            <img 
              src={flags[language]?.[currentImageIndex]}
              alt={language === 'en' ? 'English' : 'Bahasa Indonesia'}
              className={`${style.flagSize} mr-2 rounded-full object-cover shadow-sm`}
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
            />
          ) : (
            <span className={`${style.flagSize} mr-2 rounded-full flex items-center justify-center`}>
              {getFallbackFlag(language)}
            </span>
          )}
          <span className={style.text}>
            {getText(language)}
          </span>
        </motion.div>
      </AnimatePresence>
      
      {/* Loading indicator during language change */}
      {isChangingLanguage && (
        <span className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className="w-5 h-5 rounded-full border-2 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{ 
              borderColor: isDarkMode ? '#4FD1C5 transparent #4FD1C5 #4FD1C5' : '#38A169 transparent #38A169 #38A169'
            }}
          />
        </span>
      )}
    </motion.button>
  );
}