// src/contexts/DarkModeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const DarkModeContext = createContext();

// Dark mode provider component
export const DarkModeProvider = ({ children }) => {
  // Get initial dark mode preference from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
           (!(('theme' in localStorage)) && 
            window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Update DOM and localStorage when dark mode changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ 
      isDarkMode, 
      toggleDarkMode 
    }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook to use dark mode context
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

// Function to get styled theme variables
export const getThemeColors = (isDark) => {
  return {
    background: isDark ? 'var(--color-background-dark)' : 'var(--color-background-light)',
    text: isDark ? 'var(--color-text-light)' : 'var(--color-text)',
    contentBg: isDark ? 'var(--color-content-dark)' : 'var(--color-content)',
    border: isDark ? 'rgba(255, 255, 255, 0.1)' : 'var(--color-primary-100)'
  };
};