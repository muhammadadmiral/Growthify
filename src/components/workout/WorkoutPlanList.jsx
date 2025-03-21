// src/components/workout/WorkoutPlanList.jsx
import React from 'react';
import { motion } from 'framer-motion';

const WorkoutPlanList = ({ 
  workoutPlans,
  selectedPlanId,
  onSelectPlan,
  onFilterChange,
  currentFilter,
  filters,
  noPlansText,
  isDarkMode 
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const planVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Format date to relative time (like "2 days ago")
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Get category display text and color
  const getCategoryInfo = (category) => {
    const categoryColors = {
      strength: {
        bg: isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100',
        text: isDarkMode ? 'text-blue-400' : 'text-blue-800'
      },
      cardio: {
        bg: isDarkMode ? 'bg-orange-900/30' : 'bg-orange-100',
        text: isDarkMode ? 'text-orange-400' : 'text-orange-800'
      },
      flexibility: {
        bg: isDarkMode ? 'bg-green-900/30' : 'bg-green-100',
        text: isDarkMode ? 'text-green-400' : 'text-green-800'
      }
    };
    
    const colorInfo = categoryColors[category] || { 
      bg: isDarkMode ? 'bg-gray-800' : 'bg-gray-100',
      text: isDarkMode ? 'text-gray-400' : 'text-gray-800'
    };
    
    return {
      label: category.charAt(0).toUpperCase() + category.slice(1),
      ...colorInfo
    };
  };
  
  // Get level badge styles
  const getLevelBadgeStyles = (level) => {
    const levelStyles = {
      beginner: {
        bg: isDarkMode ? 'bg-green-900/30' : 'bg-green-100',
        text: isDarkMode ? 'text-green-400' : 'text-green-800'
      },
      intermediate: {
        bg: isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-100',
        text: isDarkMode ? 'text-yellow-400' : 'text-yellow-800'
      },
      advanced: {
        bg: isDarkMode ? 'bg-red-900/30' : 'bg-red-100',
        text: isDarkMode ? 'text-red-400' : 'text-red-800'
      },
      all: {
        bg: isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100',
        text: isDarkMode ? 'text-purple-400' : 'text-purple-800'
      }
    };
    
    return levelStyles[level] || levelStyles.all;
  };

  return (
    <motion.div
      className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-neutral-200'} shadow-sm overflow-hidden`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
            Workout Plans
          </h2>
          
          {/* Filter tabs */}
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {Object.entries(filters).map(([key, label]) => (
              <button
                key={key}
                onClick={() => onFilterChange(key)}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium whitespace-nowrap transition-colors ${
                  currentFilter === key
                    ? isDarkMode 
                      ? 'bg-primary-700 text-white' 
                      : 'bg-primary-100 text-primary-800'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {workoutPlans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {workoutPlans.map((plan) => {
              const categoryInfo = getCategoryInfo(plan.category);
              const levelStyles = getLevelBadgeStyles(plan.level);
              const isSelected = selectedPlanId === plan.id;
              
              return (
                <motion.div
                  key={plan.id}
                  variants={planVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectPlan(plan.id)}
                  className={`p-4 rounded-lg border cursor-pointer ${
                    isSelected
                      ? isDarkMode 
                        ? 'border-primary-600 bg-primary-900/20' 
                        : 'border-primary-500 bg-primary-50'
                      : isDarkMode
                        ? 'border-gray-700 bg-gray-800 hover:border-gray-600' 
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                  } transition-colors relative`}
                >
                  {/* Selected indicator */}
                  {isSelected && (
                    <div className={`absolute top-2 right-2 h-2 w-2 rounded-full ${
                      isDarkMode ? 'bg-primary-500' : 'bg-primary-500'
                    }`}></div>
                  )}
                  
                  <div className="flex items-start mb-3">
                    <div 
                      className="h-12 w-12 rounded-lg flex-shrink-0 bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${plan.image || 'https://via.placeholder.com/100'})` 
                      }}
                    ></div>
                    
                    <div className="ml-3 flex-grow">
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                        {plan.title}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${categoryInfo.bg} ${categoryInfo.text}`}>
                          {categoryInfo.label}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${levelStyles.bg} ${levelStyles.text}`}>
                          {plan.level.charAt(0).toUpperCase() + plan.level.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                    {plan.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs">
                    <div className={`${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {plan.duration} min • {plan.frequency}x/week
                      </span>
                    </div>
                    <div className={`${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                      Last used: {formatRelativeTime(plan.lastUsed)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
            <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p>{noPlansText}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WorkoutPlanList;