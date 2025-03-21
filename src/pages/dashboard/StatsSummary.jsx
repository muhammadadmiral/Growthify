// src/components/dashboard/StatsSummary.jsx - Update this file

import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function StatsSummary({ stats }) {
  const { isDarkMode } = useDarkMode();

  // Ensure the stats object is rendered properly
  const renderStat = (stat) => {
    // Check if stat is an object with property values
    if (typeof stat === 'object' && stat !== null) {
      // Safe rendering by accessing properties directly
      return (
        <div key={stat.label || 'unknown'} className={`p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-100'
        } border shadow-sm`}>
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{stat.icon || '📊'}</div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                {stat.label || 'Stat'}
              </p>
              <div className="flex items-center">
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                  {stat.value || '0'}
                </p>
                {stat.change && (
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-md ${
                    stat.changeType === 'positive' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                      : stat.changeType === 'negative'
                        ? 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400'
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // If it's not an object or is null, render a placeholder
    return (
      <div className={`p-4 rounded-lg ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-100'
      } border shadow-sm`}>
        <div className="flex items-center space-x-3">
          <div className="text-2xl">📊</div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>Stat</p>
            <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              N/A
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.isArray(stats) ? (
        stats.map((stat, index) => renderStat(stat))
      ) : (
        // If stats is not an array, render placeholders
        [...Array(4)].map((_, index) => (
          <div key={index} className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-100'
          } border shadow-sm`}>
            <div className="flex items-center space-x-3">
              <div className="text-2xl">📊</div>
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>No Data</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                  --
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}