// src/components/workout/WorkoutHeader.jsx
import React from 'react';
import { motion } from 'framer-motion';

const WorkoutHeader = ({ 
  title, 
  subtitle, 
  onCreateClick, 
  createButtonText, 
  stats, 
  translations,
  isDarkMode 
}) => {
  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            {title}
          </h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
            {subtitle}
          </p>
        </motion.div>
        
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 md:mt-0"
        >
          <button
            onClick={onCreateClick}
            className={`px-4 py-2 rounded-lg ${
              isDarkMode 
                ? 'bg-primary-600 hover:bg-primary-700' 
                : 'bg-primary-500 hover:bg-primary-600'
            } text-white font-medium flex items-center transition-colors`}
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
            {createButtonText}
          </button>
        </motion.div>
      </div>
      
      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Workouts Completed */}
        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-neutral-200'} shadow-sm`}>
          <div className="flex items-center">
            <div className={`p-2 rounded-full ${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                {translations.workouts}
              </p>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {stats.workouts}
              </p>
            </div>
          </div>
        </div>
        
        {/* Current Streak */}
        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-neutral-200'} shadow-sm`}>
          <div className="flex items-center">
            <div className={`p-2 rounded-full ${isDarkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                {translations.streak}
              </p>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {stats.streak} <span className="text-sm font-normal">{translations.days}</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Total Minutes */}
        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-neutral-200'} shadow-sm`}>
          <div className="flex items-center">
            <div className={`p-2 rounded-full ${isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'}`}>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                {translations.minutes}
              </p>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {stats.minutes}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkoutHeader;