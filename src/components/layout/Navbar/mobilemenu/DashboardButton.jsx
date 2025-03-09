// src/components/layout/Navbar/MobileMenu/DashboardButton.jsx
import React from 'react';

const DashboardButton = ({ onMenuClick, isDarkMode }) => {
  return (
    <button
      type="button"
      className={`md:flex lg:hidden p-2 rounded-lg ${
        isDarkMode 
          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
          : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100'
      }`}
      onClick={onMenuClick}
      aria-label="Toggle dashboard menu"
    >
      <span className="sr-only">Open dashboard menu</span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 6h16M4 12h16M4 18h16" 
        />
      </svg>
    </button>
  );
};

export default DashboardButton;