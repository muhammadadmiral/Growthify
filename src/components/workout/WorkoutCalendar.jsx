// src/components/workout/WorkoutCalendar.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WorkoutCalendar = ({ 
  workoutPlans, 
  todayText, 
  upcomingText, 
  noUpcomingText,
  isDarkMode,
  language
}) => {
  const [today] = useState(new Date());
  const [upcomingWorkouts, setUpcomingWorkouts] = useState([]);
  
  // Days of the week translations
  const weekDays = {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    id: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  };
  
  // Short month names translations
  const monthNames = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    id: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  };
  
  // Get localized day names
  const getDayName = (dayIndex, short = false) => {
    const days = weekDays[language] || weekDays.en;
    return short ? days[dayIndex].substring(0, 3) : days[dayIndex];
  };
  
  const getMonthName = (monthIndex) => {
    const months = monthNames[language] || monthNames.en;
    return months[monthIndex];
  };

  // Generate upcoming workouts from the plans
  useEffect(() => {
    const next7Days = [];
    const todayDayName = getDayName(today.getDay(), true).toLowerCase();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = getDayName(date.getDay(), true).toLowerCase();
      
      // Find workouts scheduled for this day
      const workoutsToday = workoutPlans.filter(plan => 
        plan.schedule.includes(dayName)
      ).map(plan => ({
        id: `${plan.id}-${dayName}`,
        planId: plan.id,
        title: plan.title,
        category: plan.category,
        duration: plan.duration,
        date: new Date(date),
        isToday: i === 0
      }));
      
      if (workoutsToday.length > 0) {
        next7Days.push(...workoutsToday);
      }
    }
    
    setUpcomingWorkouts(next7Days);
  }, [workoutPlans, today]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Format date as "Day, Month Date"
  const formatDate = (date) => {
    const day = getDayName(date.getDay());
    const month = getMonthName(date.getMonth());
    const dateNum = date.getDate();
    return `${day}, ${month} ${dateNum}`;
  };
  
  // Get workout item background color based on category
  const getWorkoutColor = (category) => {
    const colors = {
      strength: isDarkMode 
        ? 'bg-blue-900/20 border-blue-800 text-blue-300' 
        : 'bg-blue-50 border-blue-200 text-blue-700',
      cardio: isDarkMode 
        ? 'bg-orange-900/20 border-orange-800 text-orange-300' 
        : 'bg-orange-50 border-orange-200 text-orange-700',
      flexibility: isDarkMode 
        ? 'bg-green-900/20 border-green-800 text-green-300' 
        : 'bg-green-50 border-green-200 text-green-700'
    };
    
    return colors[category] || (isDarkMode 
      ? 'bg-gray-800 border-gray-700 text-gray-300' 
      : 'bg-gray-50 border-gray-200 text-gray-700');
  };

  return (
    <motion.div 
      className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-neutral-200'} shadow-sm overflow-hidden`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
          {upcomingText}
        </h2>
      </div>
      
      <div className="p-6">
        {upcomingWorkouts.length > 0 ? (
          <div className="space-y-3">
            {upcomingWorkouts.map((workout) => (
              <motion.div
                key={workout.id}
                className={`flex items-center p-3 rounded-lg border ${getWorkoutColor(workout.category)}`}
                variants={itemVariants}
              >
                <div className="flex-shrink-0 text-center mr-4 w-12">
                  <p className="text-sm font-medium">{formatDate(workout.date).split(',')[0]}</p>
                  <p className="text-xs opacity-80">{getMonthName(workout.date.getMonth())} {workout.date.getDate()}</p>
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-medium">
                    {workout.title}
                    {workout.isToday && (
                      <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                        isDarkMode ? 'bg-primary-900/30 text-primary-400' : 'bg-primary-100 text-primary-800'
                      }`}>
                        {todayText}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs opacity-80">{workout.duration} min</p>
                </div>
                
                <button className="p-1 rounded-full hover:bg-black/10 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
            <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>{noUpcomingText}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WorkoutCalendar;