// src/components/dashboard/GoalProgress.jsx - Update this file

import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';

// This component might be rendering an object directly
export default function GoalProgress({ goals }) {
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  
  // Translation object
  const t = {
    en: {
      title: 'Goal Progress',
      addGoal: 'Add Goal',
      noGoals: 'No goals created yet.',
      createFirstGoal: 'Create your first goal',
      categories: {
        body: 'Body',
        mindset: 'Mindset',
        fitness: 'Fitness'
      }
    },
    id: {
      title: 'Kemajuan Tujuan',
      addGoal: 'Tambah Tujuan',
      noGoals: 'Belum ada tujuan yang dibuat.',
      createFirstGoal: 'Buat tujuan pertama Anda',
      categories: {
        body: 'Tubuh',
        mindset: 'Pola Pikir',
        fitness: 'Kebugaran'
      }
    }
  };

  const translations = t[language] || t.en;

  // Function to safely render category names
  const getCategoryName = (category) => {
    // Make sure we're rendering a string, not an object
    if (translations.categories && translations.categories[category]) {
      return translations.categories[category];
    }
    return category; // Fallback to the category key itself
  };

  return (
    <div className={`rounded-xl ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-100'
    } border shadow-elegant overflow-hidden`}>
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
          {translations.title}
        </h2>
        <button className={`px-3 py-1 rounded-lg text-sm ${
          isDarkMode ? 'bg-primary-700 hover:bg-primary-600 text-white' : 'bg-primary-500 hover:bg-primary-600 text-white'
        }`}>
          {translations.addGoal}
        </button>
      </div>
      
      <div className="p-6">
        {goals.length > 0 ? (
          <div className="space-y-4">
            {goals.map(goal => (
              <div key={goal.id} className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>{goal.name}</h3>
                    <div className="flex items-center space-x-2">
                      {/* Make sure we're rendering a string here, not an object */}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        goal.category === 'body' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                          : goal.category === 'mindset'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400'
                      }`}>
                        {/* Safe rendering of category name */}
                        {getCategoryName(goal.category)}
                      </span>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                        Due: {goal.dueDate}
                      </span>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                    {goal.progress}%
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="h-2.5 rounded-full bg-primary-500 dark:bg-primary-400" 
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
              {translations.noGoals}
            </p>
            <button className={`px-4 py-2 rounded-lg ${
              isDarkMode ? 'bg-primary-700 hover:bg-primary-600 text-white' : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}>
              {translations.createFirstGoal}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}