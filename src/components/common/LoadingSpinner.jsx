import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function LoadingSpinner({ size = 'medium' }) {
  const { isDarkMode } = useDarkMode();
  
  // Size values
  const sizeClasses = {
    small: 'h-8 w-8 border-2',
    medium: 'h-12 w-12 border-t-2',
    large: 'h-16 w-16 border-t-3'
  };
  
  const spinnerSize = sizeClasses[size] || sizeClasses.medium;
  
  return (
    <div className="flex justify-center items-center">
      <div 
        className={`animate-spin rounded-full ${spinnerSize} ${
          isDarkMode ? 'border-primary-400' : 'border-primary-500'
        }`}
        aria-label="Loading"
      ></div>
    </div>
  );
}