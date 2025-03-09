// src/components/skincare/SkinProfileModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Smile, 
  Target, 
  AlertTriangle 
} from 'lucide-react';

const SkinProfileModal = ({ 
  isOpen, 
  initialProfile, 
  onClose, 
  onSave, 
  isDarkMode, 
  language 
}) => {
  // Initial state with fallback to empty values
  const [skinProfile, setSkinProfile] = useState({
    skinType: initialProfile?.skinType || '',
    concerns: initialProfile?.concerns || [],
    sensitivities: initialProfile?.sensitivities || []
  });

  // Predefined options
  const skinTypeOptions = {
    en: ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'],
    id: ['Normal', 'Kering', 'Berminyak', 'Kombinasi', 'Sensitif']
  };

  const concernOptions = {
    en: [
      'Acne', 
      'Hydration', 
      'Aging', 
      'Uneven Skin Tone', 
      'Dark Spots', 
      'Fine Lines', 
      'Redness'
    ],
    id: [
      'Jerawat', 
      'Hidrasi', 
      'Penuaan', 
      'Warna Kulit Tidak Merata', 
      'Bercak Gelap', 
      'Garis Halus', 
      'Kemerahan'
    ]
  };

  const sensitivityOptions = {
    en: [
      'Fragrance', 
      'Alcohol', 
      'Essential Oils', 
      'Certain Preservatives', 
      'Sulfates'
    ],
    id: [
      'Wewangian', 
      'Alkohol', 
      'Minyak Esensial', 
      'Bahan Pengawet Tertentu', 
      'Sulfat'
    ]
  };

  // Translations
  const translations = {
    en: {
      title: 'Skin Profile',
      skinType: 'Skin Type',
      skinConcerns: 'Skin Concerns',
      sensitivities: 'Sensitivities',
      save: 'Save Profile',
      cancel: 'Cancel',
      selectPlaceholder: 'Select...'
    },
    id: {
      title: 'Profil Kulit',
      skinType: 'Jenis Kulit',
      skinConcerns: 'Masalah Kulit',
      sensitivities: 'Sensitifitas',
      save: 'Simpan Profil',
      cancel: 'Batal',
      selectPlaceholder: 'Pilih...'
    }
  };

  const t = translations[language] || translations.en;
  const currentOptions = {
    skinTypes: skinTypeOptions[language] || skinTypeOptions.en,
    concerns: concernOptions[language] || concernOptions.en,
    sensitivities: sensitivityOptions[language] || sensitivityOptions.en
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setSkinProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle multi-select toggle
  const toggleMultiSelect = (field, value) => {
    setSkinProfile(prev => {
      const currentValues = prev[field] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  // Render multi-select input
  const renderMultiSelect = (field, options) => (
    <div className="flex flex-wrap gap-2">
      {options.map(option => (
        <button
          key={option}
          type="button"
          onClick={() => toggleMultiSelect(field, option)}
          className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
            skinProfile[field]?.includes(option)
              ? isDarkMode
                ? 'bg-primary-700 text-white'
                : 'bg-primary-100 text-primary-800'
              : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );

  // Continuation of SkinProfileModal.jsx
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const errors = {};
    
    if (!skinProfile.skinType) {
      errors.skinType = 'Skin type is required';
    }
    
    if (skinProfile.concerns.length === 0) {
      errors.concerns = 'Please select at least one skin concern';
    }
    
    // If there are errors, you might want to set them in state
    if (Object.keys(errors).length > 0) {
      // Optionally, set error state to display validation messages
      return;
    }
    
    // Call the onSave prop with the completed skin profile
    onSave(skinProfile);
  };

  // If modal is not open, return null
  if (!isOpen) return null;

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
          {/* Modal Header */}
          <div className={`px-6 py-4 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-neutral-200'
          } flex justify-between items-center`}>
            <h2 className="text-xl font-bold">
              {t.title}
            </h2>
            <button 
              onClick={onClose}
              className={`p-2 rounded-full ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Skin Type Selection */}
            <div>
              <label className={`block mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-neutral-700'
              }`}>
                {t.skinType}
              </label>
              <select
                value={skinProfile.skinType}
                onChange={(e) => handleChange('skinType', e.target.value)}
                className={`w-full p-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-neutral-300 text-neutral-900'
                }`}
              >
                <option value="">{t.selectPlaceholder}</option>
                {currentOptions.skinTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Skin Concerns Multi-Select */}
            <div>
              <label className={`block mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-neutral-700'
              }`}>
                {t.skinConcerns}
              </label>
              {renderMultiSelect('concerns', currentOptions.concerns)}
            </div>

            {/* Sensitivities Multi-Select */}
            <div>
              <label className={`block mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-neutral-700'
              }`}>
                {t.sensitivities}
              </label>
              {renderMultiSelect('sensitivities', currentOptions.sensitivities)}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                }`}
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className={`flex-1 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
              >
                {t.save}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SkinProfileModal;