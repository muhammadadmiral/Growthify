// src/components/skincare/SkinProfile.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Smile, 
  Target, 
  AlertTriangle 
} from 'lucide-react';

const SkinProfile = ({ 
  skinProfile, 
  isDarkMode, 
  language,
  onEditProfile 
}) => {
  // Translations
  const translations = {
    en: {
      title: 'Skin Profile',
      skinType: 'Skin Type',
      concerns: 'Skin Concerns',
      sensitivities: 'Sensitivities',
      editProfile: 'Edit Profile'
    },
    id: {
      title: 'Profil Kulit',
      skinType: 'Jenis Kulit',
      concerns: 'Masalah Kulit',
      sensitivities: 'Sensitifitas',
      editProfile: 'Edit Profil'
    }
  };

  const t = translations[language] || translations.en;

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
          onClick={onEditProfile}
          className={`px-3 py-1.5 rounded-lg text-sm ${
            isDarkMode 
              ? 'bg-primary-700 text-white hover:bg-primary-600'
              : 'bg-primary-100 text-primary-800 hover:bg-primary-200'
          }`}
        >
          {t.editProfile}
        </button>
      </div>
      
      <div className="p-6 space-y-4">
        {/* Skin Type */}
        <div className="flex items-center">
          <Smile className={`w-6 h-6 mr-3 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`} />
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
              {t.skinType}
            </p>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              {skinProfile.skinType}
            </p>
          </div>
        </div>

        {/* Skin Concerns */}
        <div className="flex items-center">
          <Target className={`w-6 h-6 mr-3 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
              {t.concerns}
            </p>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              {skinProfile.concerns.join(', ')}
            </p>
          </div>
        </div>

        {/* Sensitivities */}
        <div className="flex items-center">
          <AlertTriangle className={`w-6 h-6 mr-3 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
              {t.sensitivities}
            </p>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              {skinProfile.sensitivities.length > 0 
                ? skinProfile.sensitivities.join(', ') 
                : 'None'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkinProfile;