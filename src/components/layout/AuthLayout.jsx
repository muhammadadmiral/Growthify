// src/components/layout/AuthLayout.jsx
import { useEffect } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function AuthLayout({ children }) {
  const { isDarkMode } = useDarkMode();

  // Apply specific styling for auth pages
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#111827' : '#F9FAFB';
    document.body.classList.add('auth-page');
    
    return () => {
      document.body.classList.remove('auth-page');
    };
  }, [isDarkMode]);

  return (
    <div className="app-container w-full min-h-screen">
      {children}
    </div>
  );
}