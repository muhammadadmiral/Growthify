// src/contexts/LanguageContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';


// Create the context
const LanguageContext = createContext();

// Language provider component
export const LanguageProvider = ({ children }) => {
  
  // Get initial language from localStorage or default to browser language or fallback to English
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('app_language');
    if (savedLang) return savedLang;
    
    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang?.startsWith('id') ? 'id' : 'en';
  });

  // Track loading state for animations
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('app_language', language);
    document.documentElement.lang = language;
    
    // Reset language change animation state
    const timer = setTimeout(() => {
      setIsChangingLanguage(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [language]);

  // Toggle language between English and Indonesian with animation
  const toggleLanguage = () => {
    setIsChangingLanguage(true);
    // Small delay to allow fade-out animation
    setTimeout(() => {
      setLanguage(prevLang => prevLang === 'en' ? 'id' : 'en');
    }, 300);
  };
  
  // Set specific language with animation
  const setAppLanguage = (lang) => {
    if (lang === language) return;
    if (lang === 'en' || lang === 'id') {
      setIsChangingLanguage(true);
      // Small delay to allow fade-out animation
      setTimeout(() => {
        setLanguage(lang);
      }, 300);
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: setAppLanguage, 
      toggleLanguage,
      isChangingLanguage
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

