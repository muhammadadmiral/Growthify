import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function PhysicalGoals() {
  const { isDarkMode } = useDarkMode();
  
  return (
    <div className="w-full p-6">
      <div className={`mb-6 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
        <h1 className="text-2xl font-bold">Physical Goals</h1>
        <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
          Track and manage your physical transformation journey
        </p>
      </div>
      
      <div className={`p-8 rounded-xl ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-100'
      } border shadow-elegant`}>
        <div className="text-center">
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
            Physical goals dashboard is under development.
          </p>
          <button className={`mt-4 px-4 py-2 rounded-md ${
            isDarkMode ? 'bg-primary-700 text-white' : 'bg-primary-600 text-white'
          }`}>
            Create Your First Physical Goal
          </button>
        </div>
      </div>
    </div>
  );
}