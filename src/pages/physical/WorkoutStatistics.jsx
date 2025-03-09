import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Activity, 
  Clock, 
  Flame, 
  Target, 
  BarChart2, 
  PieChart as PieChartIcon 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';

import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';

// Mock data (to be replaced with actual Firebase data)
const mockWorkoutData = {
  monthlyWorkouts: [
    { month: 'Jan', workouts: 12 },
    { month: 'Feb', workouts: 15 },
    { month: 'Mar', workouts: 18 },
    { month: 'Apr', workouts: 16 },
    { month: 'May', workouts: 20 },
    { month: 'Jun', workouts: 22 }
  ],
  workoutTypeDistribution: [
    { name: 'Strength', value: 40, color: '#3B82F6' },
    { name: 'Cardio', value: 30, color: '#10B981' },
    { name: 'Flexibility', value: 20, color: '#F43F5E' },
    { name: 'Other', value: 10, color: '#8B5CF6' }
  ],
  progressMetrics: {
    totalWorkouts: 120,
    totalDuration: 3600, // minutes
    averageIntensity: 7.5,
    caloriesBurned: 45000
  }
};

export default function WorkoutStatistics() {
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  // State Management
  const [workoutData] = useState(mockWorkoutData);

  // Translations
  const translations = {
    en: {
      title: 'Workout Statistics',
      subtitle: 'Analyze your fitness performance and progress',
      monthlyWorkouts: 'Monthly Workout Frequency',
      workoutTypeDistribution: 'Workout Type Distribution',
      progressMetrics: {
        totalWorkouts: 'Total Workouts',
        totalDuration: 'Total Duration',
        averageIntensity: 'Avg. Workout Intensity',
        caloriesBurned: 'Total Calories Burned'
      },
      insights: 'Key Insights'
    },
    id: {
      title: 'Statistik Latihan',
      subtitle: 'Analisis kinerja dan kemajuan kebugaran Anda',
      monthlyWorkouts: 'Frekuensi Latihan Bulanan',
      workoutTypeDistribution: 'Distribusi Jenis Latihan',
      progressMetrics: {
        totalWorkouts: 'Total Latihan',
        totalDuration: 'Total Durasi',
        averageIntensity: 'Intensitas Latihan Rata-rata',
        caloriesBurned: 'Total Kalori Terbakar'
      },
      insights: 'Wawasan Utama'
    }
  };

  const t = translations[language] || translations.en;

  // Render Monthly Workouts Bar Chart
  const renderMonthlyWorkoutsChart = () => (
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
          {t.monthlyWorkouts}
        </h2>
        <BarChart2 className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`} />
      </div>
      
      <div className="p-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={workoutData.monthlyWorkouts}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDarkMode ? '#374151' : '#E5E7EB'}
            />
            <XAxis 
              dataKey="month" 
              tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280' }}
            />
            <YAxis 
              tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                color: isDarkMode ? '#FFFFFF' : '#000000',
                borderRadius: '0.75rem'
              }}
            />
            <Bar 
              dataKey="workouts" 
              fill={isDarkMode ? '#3B82F6' : '#1E40AF'}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );

  // Render Workout Type Distribution Pie Chart
  const renderWorkoutTypeChart = () => (
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
          {t.workoutTypeDistribution}
        </h2>
        <PieChartIcon className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`} />
      </div>
      
      <div className="p-6 h-64 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={workoutData.workoutTypeDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {workoutData.workoutTypeDistribution.map((entry) => (
                <Cell 
                  key={`cell-${entry.name}`} 
                  fill={entry.color} 
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                color: isDarkMode ? '#FFFFFF' : '#000000',
                borderRadius: '0.75rem'
              }}
            />
            <Legend 
              iconType="circle"
              align="center"
              verticalAlign="bottom"
              wrapperStyle={{ 
                color: isDarkMode ? '#9CA3AF' : '#6B7280',
                fontSize: '0.75rem'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );

  // Render Progress Metrics
  const renderProgressMetrics = () => (
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
          {t.insights}
        </h2>
        <TrendingUp className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`} />
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6">
        {Object.entries(t.progressMetrics).map(([key, label]) => (
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
              {key === 'totalDuration' 
                ? `${Math.floor(workoutData.progressMetrics[key] / 60)} hrs`
                : key === 'caloriesBurned'
                  ? `${(workoutData.progressMetrics[key] / 1000).toFixed(1)}k`
                  : workoutData.progressMetrics[key]}
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
          {/* Monthly Workouts Chart */}
          {renderMonthlyWorkoutsChart()}
        </div>
        
        <div className="space-y-6">
          {/* Workout Type Distribution Chart */}
          {renderWorkoutTypeChart()}
        </div>

        <div className="lg:col-span-full">
          {/* Progress Metrics */}
          {renderProgressMetrics()}
        </div>
      </div>
    </div>
  );
}