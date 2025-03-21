// src/pages/mental/GoalSetting.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Flag 
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

// Goal Categories
const goalCategories = {
  en: [
    'Personal Development',
    'Career',
    'Health & Wellness',
    'Relationships',
    'Financial',
    'Learning',
    'Creativity'
  ],
  id: [
    'Pengembangan Diri',
    'Karier',
    'Kesehatan & Kesejahteraan',
    'Hubungan',
    'Keuangan',
    'Pembelajaran',
    'Kreativitas'
  ]
};

// Goal Difficulty Levels
const goalDifficulties = {
  en: ['Easy', 'Medium', 'Challenging', 'Ambitious'],
  id: ['Mudah', 'Sedang', 'Menantang', 'Ambisius']
};

export default function GoalSetting() {
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  // State Management
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Translations
  const translations = {
    en: {
      title: 'Goal Setting',
      subtitle: 'Define, track, and achieve your personal goals',
      noGoals: 'No goals set yet. Start your journey!',
      addGoal: 'Add New Goal',
      editGoal: 'Edit Goal',
      categories: 'Categories',
      difficulty: 'Difficulty',
      dueDate: 'Due Date',
      progress: 'Progress',
      status: {
        notStarted: 'Not Started',
        inProgress: 'In Progress',
        completed: 'Completed'
      },
      modal: {
        titlePlaceholder: 'Enter goal title',
        descriptionPlaceholder: 'Describe your goal',
        save: 'Save Goal',
        cancel: 'Cancel'
      }
    },
    id: {
      title: 'Penetapan Tujuan',
      subtitle: 'Tentukan, lacak, dan capai tujuan pribadi Anda',
      noGoals: 'Belum ada tujuan yang ditetapkan. Mulai perjalanan Anda!',
      addGoal: 'Tambah Tujuan Baru',
      editGoal: 'Edit Tujuan',
      categories: 'Kategori',
      difficulty: 'Tingkat Kesulitan',
      dueDate: 'Tanggal Jatuh Tempo',
      progress: 'Kemajuan',
      status: {
        notStarted: 'Belum Dimulai',
        inProgress: 'Sedang Berlangsung',
        completed: 'Selesai'
      },
      modal: {
        titlePlaceholder: 'Masukkan judul tujuan',
        descriptionPlaceholder: 'Jelaskan tujuan Anda',
        save: 'Simpan Tujuan',
        cancel: 'Batal'
      }
    }
  };

  const t = translations[language] || translations.en;
  const categories = goalCategories[language] || goalCategories.en;
  const difficulties = goalDifficulties[language] || goalDifficulties.en;

  // Fetch Goals
  useEffect(() => {
    const fetchGoals = async () => {
      if (!currentUser) return;

      try {
        const goalsRef = collection(db, 'users', currentUser.uid, 'mentalHealth', 'goals');
        const q = query(goalsRef, where('userId', '==', currentUser.uid));
        
        const querySnapshot = await getDocs(q);
        const fetchedGoals = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setGoals(fetchedGoals);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching goals:', err);
        setError('Failed to load goals');
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, [currentUser]);

  // Add/Edit Goal
  const handleSaveGoal = async (goalData) => {
    try {
      if (selectedGoal) {
        // Update existing goal
        const goalRef = doc(db, 'users', currentUser.uid, 'mentalHealth', 'goals', selectedGoal.id);
        await updateDoc(goalRef, {
          ...goalData,
          updatedAt: serverTimestamp()
        });
        
        // Update local state
        setGoals(prev => prev.map(goal => 
          goal.id === selectedGoal.id 
            ? { ...goal, ...goalData } 
            : goal
        ));
      } else {
        // Add new goal
        const goalsRef = collection(db, 'users', currentUser.uid, 'mentalHealth', 'goals');
        const newGoalRef = await addDoc(goalsRef, {
          ...goalData,
          userId: currentUser.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          status: 'notStarted'
        });

        // Update local state
        setGoals(prev => [...prev, { 
          id: newGoalRef.id, 
          ...goalData,
          status: 'notStarted'
        }]);
      }

      // Close modal and reset selected goal
      setIsModalOpen(false);
      setSelectedGoal(null);
    } catch (err) {
      console.error('Error saving goal:', err);
      // TODO: Add error handling (e.g., toast notification)
    }
  };

  // Delete Goal
  const handleDeleteGoal = async (goalId) => {
    try {
      const goalRef = doc(db, 'users', currentUser.uid, 'mentalHealth', 'goals', goalId);
      await deleteDoc(goalRef);

      // Update local state
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
    } catch (err) {
      console.error('Error deleting goal:', err);
      // TODO: Add error handling
    }
  };

  // Render Goal Card
  const renderGoalCard = (goal) => {
    // Calculate progress percentage
    const progressPercentage = goal.progress || 0;

    return (
      <motion.div
        key={goal.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-neutral-200'
        } shadow-sm overflow-hidden`}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-neutral-900'
              }`}>
                {goal.title}
              </h3>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-gray-300' : 'text-neutral-600'
              }`}>
                {goal.description}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => {
                  setSelectedGoal(goal);
                  setIsModalOpen(true);
                }}
                className={`p-1.5 rounded-full ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDeleteGoal(goal.id)}
                className={`p-1.5 rounded-full ${
                  isDarkMode 
                    ? 'text-red-400 hover:bg-red-900/20' 
                    : 'text-red-600 hover:bg-red-50'
                }`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Goal Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className={`p-3 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700' 
                : 'bg-neutral-50'
            }`}>
              <p className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-neutral-500'
              }`}>
                {t.categories}
              </p>
              <p className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-neutral-900'
              }`}>
                {goal.category}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700' 
                : 'bg-neutral-50'
            }`}>
              <p className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-neutral-500'
              }`}>
                {t.difficulty}
              </p>
              <p className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-neutral-900'
              }`}>
                {goal.difficulty}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700' 
                : 'bg-neutral-50'
            }`}>
              <p className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-neutral-500'
              }`}>
                {t.dueDate}
              </p>
              <p className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-neutral-900'
              }`}>
                {new Date(goal.dueDate).toLocaleDateString()}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700' 
                : 'bg-neutral-50'
            }`}>
              <p className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-neutral-500'
              }`}>
                {t.progress}
              </p>
              <p className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-neutral-900'
              }`}>
                {progressPercentage}%
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className={`h-2.5 rounded-full ${
                progressPercentage < 33 
                  ? 'bg-red-500' 
                  : progressPercentage < 66 
                    ? 'bg-yellow-500' 
                    : 'bg-green-500'
              }`} 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Render Content
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className={`animate-spin rounded-full h-12 w-12 border-t-2 ${
            isDarkMode ? 'border-primary-400' : 'border-primary-500'
          }`}></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={`text-center p-6 ${
          isDarkMode ? 'text-red-300' : 'text-red-600'
        }`}>
          {error}
        </div>
      );
    }

    if (goals.length === 0) {
      return (
        <div className="text-center py-12">
          <Target className={`w-16 h-16 mx-auto mb-4 ${
            isDarkMode ? 'text-primary-400' : 'text-primary-500'
          }`} />
          <p className={`${
            isDarkMode ? 'text-gray-300' : 'text-neutral-600'
          }`}>
            {t.noGoals}
          </p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(renderGoalCard)}
      </div>
    );
  };

  // Goal Modal (to be implemented)
  const renderGoalModal = () => {
    if (!isModalOpen) return null;

    return (
      <AnimatePresence>
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={`w-full max-w-md rounded-xl ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-neutral-900'
            } shadow-2xl`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            // Add this code at the end of your file:

<div className={`px-6 py-4 border-b ${
  isDarkMode ? 'border-gray-700' : 'border-neutral-200'
} flex justify-between items-center`}>
  <h2 className="text-xl font-bold">
    {selectedGoal ? t.editGoal : t.addGoal}
  </h2>
  <button 
    onClick={() => {
      setIsModalOpen(false);
      setSelectedGoal(null);
    }}
    className={`p-1.5 rounded-full ${
      isDarkMode 
        ? 'hover:bg-gray-700' 
        : 'hover:bg-neutral-100'
    }`}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </button>
</div>

{/* Form Content */}
<div className="p-6 space-y-4">
  {/* Goal Title */}
  <div>
    <label className={`block text-sm font-medium mb-1 ${
      isDarkMode ? 'text-gray-300' : 'text-neutral-700'
    }`}>
      Title
    </label>
    <input
      type="text"
      placeholder={t.modal.titlePlaceholder}
      className={`w-full px-3 py-2 rounded-lg border ${
        isDarkMode 
          ? 'bg-gray-700 border-gray-600 text-white' 
          : 'bg-white border-neutral-300 text-neutral-900'
      } focus:outline-none focus:ring-2 focus:ring-primary-500`}
      value={selectedGoal?.title || ''}
      onChange={(e) => setSelectedGoal({
        ...selectedGoal || {},
        title: e.target.value
      })}
    />
  </div>

  {/* Goal Description */}
  <div>
    <label className={`block text-sm font-medium mb-1 ${
      isDarkMode ? 'text-gray-300' : 'text-neutral-700'
    }`}>
      Description
    </label>
    <textarea
      placeholder={t.modal.descriptionPlaceholder}
      rows="3"
      className={`w-full px-3 py-2 rounded-lg border ${
        isDarkMode 
          ? 'bg-gray-700 border-gray-600 text-white' 
          : 'bg-white border-neutral-300 text-neutral-900'
      } focus:outline-none focus:ring-2 focus:ring-primary-500`}
      value={selectedGoal?.description || ''}
      onChange={(e) => setSelectedGoal({
        ...selectedGoal || {},
        description: e.target.value
      })}
    />
  </div>

  {/* Goal Category */}
  <div>
    <label className={`block text-sm font-medium mb-1 ${
      isDarkMode ? 'text-gray-300' : 'text-neutral-700'
    }`}>
      Category
    </label>
    <select
      className={`w-full px-3 py-2 rounded-lg border ${
        isDarkMode 
          ? 'bg-gray-700 border-gray-600 text-white' 
          : 'bg-white border-neutral-300 text-neutral-900'
      } focus:outline-none focus:ring-2 focus:ring-primary-500`}
      value={selectedGoal?.category || ''}
      onChange={(e) => setSelectedGoal({
        ...selectedGoal || {},
        category: e.target.value
      })}
    >
      <option value="">Select Category</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>{category}</option>
      ))}
    </select>
  </div>

  {/* Goal Difficulty */}
  <div>
    <label className={`block text-sm font-medium mb-1 ${
      isDarkMode ? 'text-gray-300' : 'text-neutral-700'
    }`}>
      Difficulty
    </label>
    <select
      className={`w-full px-3 py-2 rounded-lg border ${
        isDarkMode 
          ? 'bg-gray-700 border-gray-600 text-white' 
          : 'bg-white border-neutral-300 text-neutral-900'
      } focus:outline-none focus:ring-2 focus:ring-primary-500`}
      value={selectedGoal?.difficulty || ''}
      onChange={(e) => setSelectedGoal({
        ...selectedGoal || {},
        difficulty: e.target.value
      })}
    >
      <option value="">Select Difficulty</option>
      {difficulties.map((difficulty, index) => (
        <option key={index} value={difficulty}>{difficulty}</option>
      ))}
    </select>
  </div>

  {/* Due Date */}
  <div>
    <label className={`block text-sm font-medium mb-1 ${
      isDarkMode ? 'text-gray-300' : 'text-neutral-700'
    }`}>
      Due Date
    </label>
    <input
      type="date"
      className={`w-full px-3 py-2 rounded-lg border ${
        isDarkMode 
          ? 'bg-gray-700 border-gray-600 text-white' 
          : 'bg-white border-neutral-300 text-neutral-900'
      } focus:outline-none focus:ring-2 focus:ring-primary-500`}
      value={selectedGoal?.dueDate || ''}
      onChange={(e) => setSelectedGoal({
        ...selectedGoal || {},
        dueDate: e.target.value
      })}
    />
  </div>

  {/* Progress (only for editing) */}
  {selectedGoal && (
    <div>
      <label className={`block text-sm font-medium mb-1 ${
        isDarkMode ? 'text-gray-300' : 'text-neutral-700'
      }`}>
        Progress (%)
      </label>
      <input
        type="range"
        min="0"
        max="100"
        step="5"
        className="w-full"
        value={selectedGoal?.progress || 0}
        onChange={(e) => setSelectedGoal({
          ...selectedGoal,
          progress: parseInt(e.target.value)
        })}
      />
      <div className="flex justify-between text-xs">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  )}
</div>

{/* Form Actions */}
<div className={`px-6 py-4 border-t ${
  isDarkMode ? 'border-gray-700' : 'border-neutral-200'
} flex justify-end space-x-3`}>
  <button
    onClick={() => {
      setIsModalOpen(false);
      setSelectedGoal(null);
    }}
    className={`px-4 py-2 rounded-lg ${
      isDarkMode 
        ? 'bg-gray-700 text-white hover:bg-gray-600' 
        : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'
    }`}
  >
    {t.modal.cancel}
  </button>
  <button
    onClick={() => handleSaveGoal(selectedGoal)}
    className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600"
  >
    {t.modal.save}
  </button>
</div>
</motion.div>
</motion.div>
</AnimatePresence>
);
};

return (
<div className={`px-6 py-8 ${
isDarkMode ? 'bg-gray-900 text-white' : 'bg-neutral-50 text-neutral-900'
} min-h-screen`}>
<div className="container mx-auto">
<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
<div>
<h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
<p className={isDarkMode ? 'text-gray-300' : 'text-neutral-600'}>{t.subtitle}</p>
</div>
<button
onClick={() => {
  setSelectedGoal(null);
  setIsModalOpen(true);
}}
className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
>
<Plus className="w-5 h-5" />
{t.addGoal}
</button>
</div>

{renderContent()}
{renderGoalModal()}
</div>
</div>
);
}