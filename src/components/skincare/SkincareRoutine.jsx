// src/components/skincare/SkincareRoutine.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Sun, 
  Moon, 
  Droplet 
} from 'lucide-react';

const SkincareRoutine = ({ 
  skincareRoutine, 
  isDarkMode, 
  language,
  onAddStep,
  onEditStep,
  onDeleteStep
}) => {
  // Translations
  const translations = {
    en: {
      title: 'My Skincare Routine',
      morning: 'Morning Routine',
      evening: 'Evening Routine',
      addStep: 'Add Step',
      ingredients: 'Ingredients'
    },
    id: {
      title: 'Rutinitas Perawatan Kulit',
      morning: 'Rutinitas Pagi',
      evening: 'Rutinitas Malam',
      addStep: 'Tambah Langkah',
      ingredients: 'Bahan'
    }
  };

  const t = translations[language] || translations.en;

  // Group routine by time
  const groupedRoutine = skincareRoutine.reduce((acc, step) => {
    if (!acc[step.time]) acc[step.time] = [];
    acc[step.time].push(step);
    return acc;
  }, {});

  const renderRoutineSection = (time, steps) => (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        {time === 'Morning' ? (
          <Sun className={`w-6 h-6 mr-3 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
        ) : (
          <Moon className={`w-6 h-6 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />
        )}
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
          {time === 'Morning' ? t.morning : t.evening}
        </h3>
      </div>
      
      <AnimatePresence>
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-lg border mb-3 flex justify-between items-center ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-neutral-50 border-neutral-200'
            }`}
          >
            <div>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                {step.type} - {step.product.name}
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                {step.product.brand}
              </p>
              <div className="mt-2">
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                  {t.ingredients}: {step.product.ingredients.join(', ')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => onEditStep(step)}
                className={`p-1.5 rounded-full ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-600' 
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onDeleteStep(step.id)}
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
      </AnimatePresence>
    </div>
  );

  return (
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
        <button 
          onClick={onAddStep}
          className={`p-1.5 rounded-full ${
            isDarkMode 
              ? 'text-gray-300 hover:bg-gray-700' 
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-6">
        {Object.entries(groupedRoutine).map(([time, steps]) => 
          renderRoutineSection(time, steps)
        )}
      </div>
    </motion.div>
  );
};

export default SkincareRoutine;