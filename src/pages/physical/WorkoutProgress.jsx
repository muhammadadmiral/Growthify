import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, 
  TrendingUp, 
  Target, 
  Award, 
  Clock, 
  Activity 
} from 'lucide-react';

import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

// Mock data (to be replaced with actual Firebase data)
const mockWorkoutHistory = [
  {
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
  },
  // More mock entries...
];

const mockProgressGoals = {
  weightLifted: {
    current: 500,
    target: 1000,
    unit: 'kg'
  },
  workoutFrequency: {
    current: 12,
    target: 16,
    unit: 'sessions/month'
  },
  caloriesBurned: {
    current: 4200,
    target: 6000,
    unit: 'calories/month'
  }
};

export default function WorkoutProgress() {
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  // State Management
  const [workoutHistory, setWorkoutHistory] = useState(mockWorkoutHistory);
  const [progressGoals, setProgressGoals] = useState(mockProgressGoals);
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');

  // Translations
  const translations = {
    en: {
      title: 'Workout Progress',
      subtitle: 'Track and analyze your fitness journey',
      timeframes: {
        weekly: 'Weekly',
        monthly: 'Monthly',
        yearly: 'Yearly'
      },
      stats: {
        totalWorkouts: 'Total Workouts',
        totalDuration: 'Total Duration',
        caloriesBurned: 'Calories Burned',
        avgIntensity: 'Avg. Intensity'
      },
      progressGoals: {
        weightLifted: 'Total Weight Lifted',
        workoutFrequency: 'Workout Frequency',
        caloriesBurned: 'Monthly Calories Burned'
      }
    },
    id: {
      title: 'Progres Latihan',
      subtitle: 'Lacak dan analisis perjalanan kebugaran Anda',
      timeframes: {
        weekly: 'Mingguan',
        monthly: 'Bulanan',
        yearly: 'Tahunan'
      },
      stats: {
        totalWorkouts: 'Total Latihan',
        totalDuration: 'Total Durasi',
        caloriesBurned: 'Kalori Terbakar',
        avgIntensity: 'Intensitas Rata-rata'
      },
      progressGoals: {
        weightLifted: 'Total Berat Angkat',
        workoutFrequency: 'Frekuensi Latihan',
        caloriesBurned: 'Kalori Terbakar per Bulan'
      }
    }
  };

  const t = translations[language] || translations.en;

  // Computed Workout Statistics
  const workoutStats = useMemo(() => {
    return {
      totalWorkouts: workoutHistory.length,
      totalDuration: workoutHistory.reduce((sum, workout) => sum + workout.duration, 0),
      caloriesBurned: workoutHistory.reduce((sum, workout) => sum + workout.caloriesBurned, 0),
      avgIntensity: workoutHistory.reduce((sum, workout) => 
        sum + (workout.intensity === 'High' ? 3 : workout.intensity === 'Medium' ? 2 : 1), 0
      ) / workoutHistory.length
    };
  }, [workoutHistory]);

  // Render Progress Goals Section
  const renderProgressGoals = () => (
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
          Progress Goals
        </h2>
        <Target className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
        {Object.entries(t.progressGoals).map(([key, label]) => {
          const goal = progressGoals[key];
          const progress = (goal.current / goal.target) * 100;
          
          return (
            <div 
              key={key}
              className={`p-4 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-neutral-50 border-neutral-200'
              } border`}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                  {label}
                </h3>
                <Award className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`} />
              </div>
              
              <div className="relative pt-1">
                <div className={`overflow-hidden h-2 mb-2 rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-600' 
                    : 'bg-neutral-200'
                }`}>
                  <div 
                    style={{ width: `${progress}%` }}
                    className={`h-full ${
                      progress < 50 
                        ? 'bg-red-500' 
                        : progress < 75 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                    } rounded-full`}
                  ></div>
                </div>
                <div className="flex justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
                    {goal.current} {goal.unit}
                  </span>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
                    {goal.target} {goal.unit}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  // Render Workout History Section
  const renderWorkoutHistory = () => (
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
          Workout History
        </h2>
        <div className="flex space-x-2">
          {Object.entries(t.timeframes).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedTimeframe(key)}
              className={`px-3 py-1 rounded-lg text-xs ${
                selectedTimeframe === key
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
        {workoutHistory.length > 0 ? (
          <div className="space-y-4">
            {workoutHistory.map((workout, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg border flex justify-between items-center ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                <div>
                  <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                    {workout.workoutPlan}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-1 text-sm">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                      {workout.date}
                    </span>
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                      {workout.duration} min
                    </span>
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
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
            <p>No workout history available</p>
          </div>
        )}
      </div>
    </motion.div>
  );

  // Render Workout Statistics Section
  const renderWorkoutStats = () => (
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
          Workout Stats
        </h2>
        <Activity className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`} />
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6">
        {Object.entries(t.stats).map(([key, label]) => (
          <div 
            key={key}
            className={`p-4 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-neutral-50 border-neutral-200'
            } border text-center`}
          >
            <div className={`mb-2 ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
              {label}
            </div>
            <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              {key === 'avgIntensity' 
                ? workoutStats[key].toFixed(1) 
                : workoutStats[key]}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

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
        <div className="lg:col-span-2 space-y-6">
          {/* Workout History */}
          {renderWorkoutHistory()}
        </div>
        <div className="lg:col-span-2 space-y-6">
          {/* Workout History */}
          {renderWorkoutHistory()}
        </div>
        
        <div className="space-y-6">
          {/* Progress Goals */}
          {renderProgressGoals()}
          
          {/* Workout Stats */}
          {renderWorkoutStats()}
        </div>
      </div>
    </div>
  );
}