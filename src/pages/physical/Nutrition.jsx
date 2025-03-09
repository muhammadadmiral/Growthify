import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Apple, 
  HeartPulse, 
  Activity, 
  Water, 
  Clock, 
  Utensils, 
  ChevronDown, 
  Search 
} from 'lucide-react';

import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';

import { 
  doc, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../config/firebase';

// Translations
const translations = {
  en: {
    title: "Nutrition Tracker",
    subtitle: "Track your meals, macros, and nutritional goals",
    dailyIntake: "Daily Intake",
    mealPlan: "Meal Plan",
    nutritionGoals: "Nutrition Goals",
    addMeal: "Add Meal",
    addFood: "Add Food",
    quickAdd: "Quick Add",
    noMeals: "No meals logged today",
    statsLabels: {
      calories: "Calories",
      protein: "Protein",
      carbs: "Carbs",
      fat: "Fat"
    },
    nutritionGoals: {
      totalCalories: "Total Calories",
      proteinIntake: "Protein Intake",
      waterIntake: "Water Intake"
    },
    mealTypes: {
      breakfast: "Breakfast",
      lunch: "Lunch", 
      dinner: "Dinner",
      snacks: "Snacks"
    }
  },
  id: {
    title: "Pelacak Nutrisi",
    subtitle: "Lacak makanan, makro, dan tujuan nutrisi Anda",
    dailyIntake: "Asupan Harian",
    mealPlan: "Rencana Makanan",
    nutritionGoals: "Tujuan Nutrisi",
    addMeal: "Tambah Makanan",
    addFood: "Tambah Bahan Makanan",
    quickAdd: "Tambah Cepat",
    noMeals: "Tidak ada makanan yang dicatat hari ini",
    statsLabels: {
      calories: "Kalori",
      protein: "Protein",
      carbs: "Karbohidrat",
      fat: "Lemak"
    },
    nutritionGoals: {
      totalCalories: "Total Kalori",
      proteinIntake: "Asupan Protein",
      waterIntake: "Asupan Air"
    },
    mealTypes: {
      breakfast: "Sarapan",
      lunch: "Makan Siang", 
      dinner: "Makan Malam",
      snacks: "Camilan"
    }
  }
};

// Mock food database (replace with actual API or database)
const foodDatabase = [
  { id: 'food1', name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 'food2', name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8 },
  { id: 'food3', name: 'Salmon', calories: 208, protein: 22, carbs: 0, fat: 13 },
  { id: 'food4', name: 'Broccoli', calories: 55, protein: 4, carbs: 11, fat: 0.6 },
];

export default function Nutrition() {
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const t = translations[language] || translations.en;

  // State Management
  const [dailyIntake, setDailyIntake] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  const [meals, setMeals] = useState([]);
  const [nutritionGoals, setNutritionGoals] = useState({
    totalCalories: 2000,
    proteinIntake: 150,
    waterIntake: 2000 // ml
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('meal'); // 'meal', 'goal', 'food'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('breakfast');

  // Computed Nutritional Progress
  const nutritionalProgress = useMemo(() => {
    return {
      calories: (dailyIntake.calories / nutritionGoals.totalCalories) * 100,
      protein: (dailyIntake.protein / nutritionGoals.proteinIntake) * 100,
      water: 0 // Implement water tracking logic
    };
  }, [dailyIntake, nutritionGoals]);

  // Filtered food database for search
  const filteredFoods = useMemo(() => {
    return foodDatabase.filter(food => 
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Render Nutrition Stats
  const renderNutritionStats = () => (
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
          {t.dailyIntake}
        </h2>
        <button 
          onClick={() => {
            setModalType('meal');
            setIsModalOpen(true);
          }}
          className={`p-1.5 rounded-full ${
            isDarkMode 
              ? 'text-gray-300 hover:bg-gray-700' 
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6">
        {Object.entries(t.statsLabels).map(([key, label]) => (
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
              {dailyIntake[key.toLowerCase()]} g
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Render Nutrition Goals
  const renderNutritionGoals = () => (
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
          {t.nutritionGoals}
        </h2>
        <button 
          onClick={() => {
            setModalType('goal');
            setIsModalOpen(true);
          }}
          className={`p-1.5 rounded-full ${
            isDarkMode 
              ? 'text-gray-300 hover:bg-gray-700' 
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Edit2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
        {Object.entries(t.nutritionGoals).map(([key, label]) => {
          const progress = nutritionalProgress[key.toLowerCase()] || 0;
          
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
                <Utensils className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`} />
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
                    {key === 'waterIntake' 
                      ? `${dailyIntake[key.toLowerCase()] || 0} ml` 
                      : `${dailyIntake[key.toLowerCase()] || 0} g`}
                  </span>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
                    {key === 'waterIntake' 
                      ? `${nutritionGoals[key]} ml` 
                      : `${nutritionGoals[key]} g`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  // Render Meal List
  const renderMealList = () => (
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
          {t.mealPlan}
        </h2>
      </div>
      
      <div className="p-6">
        {meals.length > 0 ? (
          <div className="space-y-4">
            {Object.entries(t.mealTypes).map(([key, label]) => {
              const mealsOfType = meals.filter(meal => meal.type === key);
              
              return mealsOfType.length > 0 ? (
                <div key={key}>
                  <h3 className={`mb-2 font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                    {label}
                  </h3>
                  {mealsOfType.map((meal, index) => (
                    <motion.div
                      key={meal.id}
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
                        <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                          {meal.name}
                        </h4>
                        <div className="flex flex-wrap gap-3 mt-1 text-sm">
                          <span className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                            {meal.calories} cal
                          </span>
                          <span className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                            {meal.protein}g protein
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => {
                            // Edit meal logic
                          }}
                          className={`p-1.5 rounded-full ${
                            isDarkMode 
                              ? 'text-gray-300 hover:bg-gray-600' 
                              : 'text-neutral-600 hover:bg-neutral-100'
                          }`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            // Delete meal logic
                          }}
                          className={`p-1.5 rounded-full ${
                            isDarkMode 
                              ? 'text-red-400 hover:bg-red-900/20' 
                              : 'text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : null;
            })}
          </div>
        ) : (
          <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
            <Utensils className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{t.noMeals}</p>
          </div>
        )}
      </div>
    </motion.div>
  );

  // Render Add Meal Modal
  const renderAddMealModal = () => (
    <AnimatePresence>
      {isModalOpen && modalType === 'meal' && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={`w-full max-w-md rounded-xl p-6 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-neutral-900'
            } shadow-2xl`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-xl font-bold mb-4">{t.addMeal}</h2>
            
            {/* Meal Type Selector */}
            <div className="mb-4">
              <label className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                Meal Type
              </label>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(t.mealTypes).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedMealType(key)}
                    className={`py-2 rounded-lg text-xs ${
                      selectedMealType === key
                        ? isDarkMode
                          ? 'bg-primary-700 text-white'
                          : 'bg-primary-100 text-primary-800'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Food Search */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`} />
              </div>
              <input
                type="text"
                placeholder={t.addFood}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 p-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-neutral-300 text-neutral-900'
                }`}
              />
            </div>

            {/* Food List */}
            {searchTerm && (
              <div className={`max-h-40 overflow-y-auto rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-neutral-300'
              }`}>
                {filteredFoods.map((food) => (
                  <button
                    key={food.id}
                    className={`w-full text-left p-3 hover:bg-opacity-10 flex justify-between items-center ${
                      isDarkMode 
                        ? 'hover:bg-white/10' 
                        : 'hover:bg-neutral-100'
                    }`}
                  >
                    <div>
                      <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                        {food.name}
                      </h4>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
                        {food.calories} cal, {food.protein}g protein
                      </p>
                    </div>
                    <Plus className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Quantity Input */}
            <div className="mt-4">
              <label className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                Quantity (grams)
              </label>
              <input
                type="number"
                min="1"
                className={`w-full p-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-neutral-300 text-neutral-900'
                }`}
              />
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`flex-1 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Save meal logic
                  setIsModalOpen(false);
                }}
                className={`flex-1 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
              >
                Add Meal
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render Nutrition Goals Modal
  const renderNutritionGoalsModal = () => (
    <AnimatePresence>
      {isModalOpen && modalType === 'goal' && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={`w-full max-w-md rounded-xl p-6 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-neutral-900'
            } shadow-2xl`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-xl font-bold mb-4">{t.nutritionGoals}</h2>
            
            <div className="space-y-4">
              {Object.entries(t.nutritionGoals).map(([key, label]) => (
                <div key={key}>
                  <label className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                    {label}
                  </label>
                  <input
                    type="number"
                    value={nutritionGoals[key] || ''}
                    onChange={(e) => setNutritionGoals(prev => ({
                      ...prev,
                      [key]: parseFloat(e.target.value)
                    }))}
                    className={`w-full p-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-neutral-300 text-neutral-900'
                    }`}
                  />
                </div>
              ))}
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`flex-1 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Save goals logic
                  setIsModalOpen(false);
                }}
                className={`flex-1 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
          {/* Nutrition Stats */}
          {renderNutritionStats()}
          
          {/* Meal List */}
          {renderMealList()}
        </div>
        
        <div>
          {/* Nutrition Goals */}
          {renderNutritionGoals()}
        </div>
      </div>

      {/* Modals */}
      {renderAddMealModal()}
      {renderNutritionGoalsModal()}
    </div>
  );
}