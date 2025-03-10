// src/components/profile/ProfileStats.jsx
import React from 'react';

const ProfileStats = ({ stats, isDarkMode }) => {
  return (
    <div className={`rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mb-6`}>
      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <h2 className="text-xl font-semibold">Activity Stats</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center">
              <span className={`p-2 rounded-full ${isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-500'}`}>
                <span className="material-symbols-rounded">local_fire_department</span>
              </span>
              <div className="ml-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
                <h3 className="text-xl font-bold">{stats.streakDays} days</h3>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center">
              <span className={`p-2 rounded-full ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-500'}`}>
                <span className="material-symbols-rounded">fitness_center</span>
              </span>
              <div className="ml-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">Workouts</p>
                <h3 className="text-xl font-bold">{stats.workoutCount}</h3>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center">
              <span className={`p-2 rounded-full ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-500'}`}>
                <span className="material-symbols-rounded">self_improvement</span>
              </span>
              <div className="ml-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">Mindfulness</p>
                <h3 className="text-xl font-bold">{stats.mindfulnessMinutes} min</h3>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center">
              <span className={`p-2 rounded-full ${isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-500'}`}>
                <span className="material-symbols-rounded">task_alt</span>
              </span>
              <div className="ml-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">Habits Completed</p>
                <h3 className="text-xl font-bold">{stats.habitsCompleted}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;