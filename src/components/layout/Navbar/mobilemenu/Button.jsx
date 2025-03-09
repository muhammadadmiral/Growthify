// src/components/layout/Navbar/MobileMenu/Button.jsx
import React from 'react';

const Button = ({ isOpen, onClick, isDarkMode }) => {
  return (
    <button
      type="button"
      className={`lg:hidden p-2 rounded-lg ${
        isDarkMode 
          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
          : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100'
      }`}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label="Toggle menu"
    >
      <span className="sr-only">Open main menu</span>
      <div className="w-6 h-6 flex items-center justify-center relative">
        <span
          aria-hidden="true"
          className={`absolute block w-5 h-0.5 transform transition duration-300 ease-in-out ${
            isDarkMode ? 'bg-gray-300' : 'bg-neutral-600'
          } ${isOpen ? 'rotate-45' : '-translate-y-1.5'}`}
        ></span>
        <span
          aria-hidden="true"
          className={`absolute block w-5 h-0.5 ${
            isDarkMode ? 'bg-gray-300' : 'bg-neutral-600'
          } ${isOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ease-in-out`}
        ></span>
        <span
          aria-hidden="true"
          className={`absolute block w-5 h-0.5 transform transition duration-300 ease-in-out ${
            isDarkMode ? 'bg-gray-300' : 'bg-neutral-600'
          } ${isOpen ? '-rotate-45' : 'translate-y-1.5'}`}
        ></span>
      </div>
    </button>
  );
};

export default Button;