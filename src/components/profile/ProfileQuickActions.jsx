// src/components/profile/ProfileQuickActions.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileQuickActions = ({ isDarkMode }) => {
  const navigate = useNavigate();
  
  return (
    <div className={`rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mb-6`}>
      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
      </div>
      
      <div className="p-4 space-y-3">
        <button 
          onClick={() => navigate('/physical/body-transformation')}
          className={`w-full flex items-center p-3 rounded-lg text-left ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
          } transition-colors`}
        >
          <div className={`p-2 rounded-full ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-500'} mr-3`}>
            <span className="material-symbols-rounded">fitness_center</span>
          </div>
          <div>
            <h3 className="font-medium">Start Body Transformation</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Set up your body goals</p>
          </div>
        </button>
        
        <button 
          onClick={() => navigate('/mental/goal-setting')}
          className={`w-full flex items-center p-3 rounded-lg text-left ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
          } transition-colors`}
        >
          <div className={`p-2 rounded-full ${isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-500'} mr-3`}>
            <span className="material-symbols-rounded">check_circle</span>
          </div>
          <div>
            <h3 className="font-medium">Set Personal Goals</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Define what you want to achieve</p>
          </div>
        </button>
        
        <button 
          onClick={() => navigate('/habits/tracker')}
          className={`w-full flex items-center p-3 rounded-lg text-left ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
          } transition-colors`}
        >
          <div className={`p-2 rounded-full ${isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-500'} mr-3`}>
            <span className="material-symbols-rounded">calendar_today</span>
          </div>
          <div>
            <h3 className="font-medium">Track Daily Habits</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Build consistency with habit tracking</p>
          </div>
        </button>
        
        <button 
          onClick={() => navigate('/physical/skincare')}
          className={`w-full flex items-center p-3 rounded-lg text-left ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
          } transition-colors`}
        >
          <div className={`p-2 rounded-full ${isDarkMode ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-500'} mr-3`}>
            <span className="material-symbols-rounded">spa</span>
          </div>
          <div>
            <h3 className="font-medium">Skincare Routine</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Create your personalized skincare plan</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProfileQuickActions;