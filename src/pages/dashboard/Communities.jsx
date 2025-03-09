// src/pages/dashboard/Communities.jsx
import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function Communities() {
  const { isDarkMode } = useDarkMode();
  
  return (
    <div className="w-full p-6">
      <div className={`mb-6 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
        <h1 className="text-2xl font-bold">Communities</h1>
        <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
          Connect with like-minded individuals on your growth journey
        </p>
      </div>
      
      <div className={`p-8 rounded-xl ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-100'
      } border shadow-elegant`}>
        <div className="text-center">
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
            Communities feature is coming soon!
          </p>
          <button className={`mt-4 px-4 py-2 rounded-md ${
            isDarkMode ? 'bg-primary-700 text-white' : 'bg-primary-600 text-white'
          }`}>
            Join Waitlist
          </button>
        </div>
      </div>
    </div>
  );
}