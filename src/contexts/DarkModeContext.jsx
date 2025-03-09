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
      
      // Update meta theme-color for mobile devices
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#0F172A'); // dark background color
      }
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      
      // Reset meta theme-color
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#F0F9FF'); // light background color
      }
    }
    
    // Apply transition class after theme change to enable smooth transitions
    // but prevent transition on initial load
    setTimeout(() => {
      root.classList.add('transition-colors');
    }, 100);
    
  }, [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };
  
  // Force a specific mode
  const setMode = (mode) => {
    if (mode === 'dark' || mode === 'light') {
      setIsDarkMode(mode === 'dark');
    }
  };

  return (
    <DarkModeContext.Provider value={{ 
      isDarkMode, 
      toggleDarkMode,
      setMode
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

// Theme variables helper
export const getThemeColors = (isDark) => {
  return {
    background: isDark ? 'var(--color-background-dark)' : 'var(--color-background-light)',
    text: isDark ? 'var(--color-text-light)' : 'var(--color-text)',
    contentBg: isDark ? 'var(--color-content-dark)' : 'var(--color-content)',
    border: isDark ? 'rgba(255, 255, 255, 0.1)' : 'var(--color-primary-100)'
  };
};