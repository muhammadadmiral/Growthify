import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, 
  Calendar, 
  Clock, 
  Activity, 
  Flame 
} from 'lucide-react';

import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';

// Mock data (to be replaced with actual Firebase data)
const mockWorkoutHistory = [
  {
    id: 'wh1',
    date: '2025-02-01',
    workoutPlan: 'Strength Training',
    duration: 45,
    intensity: 'High',
    caloriesBurned: 350,
    exercises: [
      { name: 'Squats', sets: 3, reps: 12, weight: 50 },
      { name: 'Bench Press', sets: 3, reps: 10, weight: 40 },
      { name: 'Deadlifts', sets: 3, reps: 8, weight: 60 }
    ]
  },
  {
    id: 'wh2',
    date: '2025-02-05',
    workoutPlan: 'HIIT Cardio',
    duration: 30,
    intensity: 'Very High',
    caloriesBurned: 400,
    exercises: [
      { name: 'Burpees', sets: 4, reps: '30s', weight: null },
      { name: 'Mountain Climbers', sets: 4, reps: '30s', weight: null },
      { name: 'Jump Squats', sets: 4, reps: '30s', weight: null }
    ]
  }
];

export default function WorkoutHistory() {
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  // State Management
  const [workoutHistory, setWorkoutHistory] = useState(mockWorkoutHistory);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [filter, setFilter] = useState('all');

  // Translations
  const translations = {
    en: {
      title: 'Workout History',
      subtitle: 'Review your past workout sessions',
      filters: {
        all: 'All',
        strength: 'Strength',
        cardio: 'Cardio',
        flexibility: 'Flexibility'
      },
      details: {
        date: 'Date',
        duration: 'Duration',
        intensity: 'Intensity',
        calories: 'Calories Burned',
        exercises: 'Exercises'
      },
      noWorkouts: 'No workout history found'
    },
    id: {
      title: 'Riwayat Latihan',
      subtitle: 'Tinjau sesi latihan Anda sebelumnya',
      filters: {
        all: 'Semua',
        strength: 'Kekuatan',
        cardio: 'Kardio',
        flexibility: 'Fleksibilitas'
      },
      details: {
        date: 'Tanggal',
        duration: 'Durasi',
        intensity: 'Intensitas',
        calories: 'Kalori Terbakar',
        exercises: 'Latihan'
      },
      noWorkouts: 'Tidak ada riwayat latihan ditemukan'
    }
  };

  const t = translations[language] || translations.en;

  // Filtered workout history
  const filteredWorkoutHistory = filter === 'all' 
    ? workoutHistory 
    : workoutHistory.filter(workout => {
        // In a real app, this would match the workout plan's category
        return workout.workoutPlan.toLowerCase().includes(filter);
      });

  // Render Workout List
  const renderWorkoutList = () => (
    <motion.div 
      className={`rounded-xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-200'} border shadow-sm overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`px-6 py-4 border-b flex justify-between items-center ${
        isDarkMode ? 'border-gray-700' : 'border-neutral-200'
      }`}>
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
          {t.title}
        </h2>
        <div className="flex space-x-2">
          {Object.entries(t.filters).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1 rounded-lg text-xs ${
                filter === key
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
      
      <div className="p-6">
        {filteredWorkoutHistory.length > 0 ? (
          <div className="space-y-4">
            {filteredWorkoutHistory.map((workout, index) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setSelectedWorkout(workout)}
                className={`p-4 rounded-lg border flex justify-between items-center cursor-pointer ${
                  selectedWorkout?.id === workout.id
                    ? isDarkMode
                      ? 'border-primary-600 bg-primary-900/20'
                      : 'border-primary-500 bg-primary-50'
                    : isDarkMode 
                      ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
                      : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div>
                  <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                    {workout.workoutPlan}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-1 text-sm">
                    <span className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                      <Calendar className="w-4 h-4 mr-1" />
                      {workout.date}
                    </span>
                    <span className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                      <Clock className="w-4 h-4 mr-1" />
                      {workout.duration} min
                    </span>
                    <span className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                      <Flame className="w-4 h-4 mr-1" />
                      {workout.intensity}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {workout.caloriesBurned} cal
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
            <BarChart2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{t.noWorkouts}</p>
          </div>
        )}
      </div>
    </motion.div>
  );

  // Render Workout Details
  const renderWorkoutDetails = () => {
    if (!selectedWorkout) {
      return (
        <motion.div 
          className={`rounded-xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-200'} border shadow-sm overflow-hidden h-full flex items-center justify-center`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
            <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Select a workout to view details</p>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div 
        key={selectedWorkout.id}
        className={`rounded-xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-200'} border shadow-sm overflow-hidden`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`px-6 py-4 border-b flex justify-between items-center ${
          isDarkMode ? 'border-gray-700' : 'border-neutral-200'
        }`}>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
            {selectedWorkout.workoutPlan}
          </h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {Object.entries(t.details).map(([key, label]) => {
              let value;
              switch(key) {
                case 'date':
                  value = selectedWorkout.date;
                  break;
                case 'duration':
                  value = `${selectedWorkout.duration} min`;
                  break;
                case 'intensity':
                  value = selectedWorkout.intensity;
                  break;
                case 'calories':
                  value = `${selectedWorkout.caloriesBurned} cal`;
                  break;
                case 'exercises':
                  value = `${selectedWorkout.exercises.length} exercises`;
                  break;
                default:
                  value = '';
              }
              
              return (
                <div 
                  key={key}
                  className={`p-4 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-neutral-50 border-neutral-200'
                  } border`}
                >
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                    {label}
                  </p>
                  <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {value}
                  </p>
                </div>
              );
            })}
          </div>

          <h3 className={`text-base font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
            {t.details.exercises}
          </h3>
          
          <div className="space-y-3">
            {selectedWorkout.exercises.map((exercise, index) => (
              <div 
                key={exercise.name} 
                className={`p-4 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-neutral-50 border-neutral-200'
                } border flex justify-between items-center`}
              >
                <div>
                  <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                    {exercise.name}
                  </h4>
                  <div className="flex flex-wrap gap-3 mt-1 text-sm">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                      Sets: {exercise.sets}
                    </span>
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                      Reps: {exercise.reps}
                    </span>
                    {exercise.weight && (
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                        Weight: {exercise.weight} kg
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  // Main render method
  return (
    <div className="w-full p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            {t.title}
          </h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {renderWorkoutList()}
        </div>
        <div>
          {renderWorkoutDetails()}
        </div>
      </div>
    </div>
  );
}