// src/components/workout/WorkoutDetailPanel.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WorkoutDetailPanel = ({ selectedPlan, isDarkMode, language }) => {
  // Translation content
  const translations = {
    en: {
      noPlan: "Select a workout plan to view details",
      startWorkout: "Start Workout",
      editPlan: "Edit Plan",
      deletePlan: "Delete",
      details: "Details",
      duration: "Duration",
      frequency: "Frequency",
      level: "Level",
      category: "Category",
      times: "times per week",
      minutes: "minutes",
      exercises: "Exercises",
      sets: "Sets",
      reps: "Reps",
      rest: "Rest",
      seconds: "sec"
    },
    id: {
      noPlan: "Pilih rencana latihan untuk melihat detail",
      startWorkout: "Mulai Latihan",
      editPlan: "Edit Rencana",
      deletePlan: "Hapus",
      details: "Detail",
      duration: "Durasi",
      frequency: "Frekuensi",
      level: "Tingkat",
      category: "Kategori",
      times: "kali per minggu",
      minutes: "menit",
      exercises: "Latihan",
      sets: "Set",
      reps: "Repetisi",
      rest: "Istirahat",
      seconds: "detik"
    }
  };
  
  const t = translations[language] || translations.en;
  
  // Animation variants
  const panelVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
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
  
  // Format level and category text
  const formatText = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  
  // Get category color scheme
  const getCategoryColors = (category) => {
    const colorMap = {
      strength: isDarkMode ? 'text-blue-400 bg-blue-900/20' : 'text-blue-800 bg-blue-100',
      cardio: isDarkMode ? 'text-orange-400 bg-orange-900/20' : 'text-orange-800 bg-orange-100',
      flexibility: isDarkMode ? 'text-green-400 bg-green-900/20' : 'text-green-800 bg-green-100'
    };
    
    return colorMap[category] || (isDarkMode ? 'text-gray-300 bg-gray-800' : 'text-gray-800 bg-gray-100');
  };
  
  // If no plan is selected, show placeholder
  if (!selectedPlan) {
    return (
      <div className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-neutral-200'} shadow-sm h-full p-6 flex flex-col justify-center items-center text-center`}>
        <svg className="w-16 h-16 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke={isDarkMode ? '#6B7280' : '#9CA3AF'}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
          {t.noPlan}
        </p>
      </div>
    );
  }
  
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={selectedPlan.id}
        className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-neutral-200'} shadow-sm overflow-hidden`}
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {/* Header with image */}
        <div className="relative h-40">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${selectedPlan.image || 'https://via.placeholder.com/500x200'})` }}
          >
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/50' : 'bg-black/30'}`}></div>
          </div>
          
          <div className="absolute inset-x-0 bottom-0 p-4">
            <motion.h2 
              className="text-white text-xl font-bold drop-shadow-sm" 
              variants={itemVariants}
            >
              {selectedPlan.title}
            </motion.h2>
            <motion.p 
              className="text-white/80 text-sm mt-1 drop-shadow-sm"
              variants={itemVariants}
            >
              {selectedPlan.exercises?.length || 0} {t.exercises}
            </motion.p>
          </div>
        </div>
        
        {/* Action buttons */}
        <motion.div 
          className="p-4 flex space-x-2 border-b border-gray-200 dark:border-gray-700"
          variants={itemVariants}
        >
          <button className={`flex-1 py-2 px-4 rounded-lg ${
            isDarkMode ? 'bg-primary-600 hover:bg-primary-700' : 'bg-primary-500 hover:bg-primary-600'
          } text-white font-medium transition-colors`}>
            {t.startWorkout}
          </button>
          
          <button className={`py-2 px-3 rounded-lg ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          } transition-colors`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button className={`py-2 px-3 rounded-lg ${
            isDarkMode ? 'bg-gray-700 hover:bg-red-900/40 text-gray-300 hover:text-red-300' : 'bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600'
          } transition-colors`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </motion.div>
        
        {/* Details section */}
        <div className="p-4">
          <motion.h3 
            className={`text-base font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}
            variants={itemVariants}
          >
            {t.details}
          </motion.h3>
          
          <motion.div 
            className="grid grid-cols-2 gap-3 mb-4"
            variants={itemVariants}
          >
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.duration}
              </p>
              <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {selectedPlan.duration} {t.minutes}
              </p>
            </div>
            
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.frequency}
              </p>
              <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {selectedPlan.frequency} {t.times}
              </p>
            </div>
            
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.level}
              </p>
              <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {formatText(selectedPlan.level)}
              </p>
            </div>
            
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.category}
              </p>
              <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {formatText(selectedPlan.category)}
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
              {selectedPlan.description}
            </p>
          </motion.div>
          
          {/* Exercises list */}
          <motion.div variants={itemVariants}>
            <h3 className={`text-base font-medium mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              {t.exercises}
            </h3>
            
            <div className="space-y-3">
              {selectedPlan.exercises?.map((exercise, index) => (
                <motion.div 
                  key={exercise.id}
                  className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} flex items-center space-x-3`}
                  variants={itemVariants}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-600' : 'bg-white'
                  } text-sm font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                    {index + 1}
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                      {exercise.name}
                    </h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs">
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                        {t.sets}: {exercise.sets}
                      </span>
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                        {t.reps}: {exercise.reps}
                      </span>
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                        {t.rest}: {exercise.rest} {t.seconds}
                      </span>
                    </div>
                    {exercise.notes && (
                      <p className={`mt-1 text-xs italic ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                        {exercise.notes}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WorkoutDetailPanel;