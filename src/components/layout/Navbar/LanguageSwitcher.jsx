// src/components/layout/Navbar/LanguageSwitcher.jsx
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSwitcher({ variant = 'default' }) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const menuRef = useRef(null);
  
  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleChangeLanguage = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };
  
  // Languages with their display names and flag images
  const languages = [
    { code: 'en', name: 'English', flagSrc: '/flags/us-flag.png' },
    { code: 'id', name: 'Bahasa Indonesia', flagSrc: '/flags/idn-flag.png' }
  ];
  
  // Get current language details
  const currentLang = languages.find(lang => lang.code === language) || languages[0];
  
  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {variant === 'compact' ? (
          <div className="w-6 h-6 overflow-hidden rounded-full">
            <img 
              src={currentLang.flagSrc} 
              alt={`${currentLang.name} flag`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <div className="w-5 h-5 overflow-hidden rounded-full">
              <img 
                src={currentLang.flagSrc} 
                alt={`${currentLang.name} flag`}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm">{currentLang.code.toUpperCase()}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </button>
      
      {/* Language dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ring-1 ring-black ring-opacity-5 z-50"
          >
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleChangeLanguage(lang.code)}
                className={`
                  w-full text-left px-4 py-2 text-sm flex items-center space-x-3
                  ${language === lang.code 
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
                `}
              >
                <div className="w-5 h-5 overflow-hidden rounded-full">
                  <img 
                    src={lang.flagSrc} 
                    alt={`${lang.name} flag`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>{lang.name}</span>
                
                {language === lang.code && (
                  <svg className="h-5 w-5 ml-auto text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}