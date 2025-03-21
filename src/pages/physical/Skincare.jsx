// src/pages/physical/Skincare.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplet, 
  Smile, 
  Sun, 
  Layers, 
  Target, 
  Star, 
  Search, 
  Compass, 
  Zap,
  Lightbulb,
  Plus
} from 'lucide-react';

import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
// Import components
import SkinProfile from '../../components/skincare/SkinProfile';
import SkincareRoutine from '../../components/skincare/SkincareRoutine';
import ProductRecommendations from '../../components/skincare/ProductRecommendation';
import ProductDetailsModal from '../../components/skincare/ProductDetailsModal';

// Import services
import { skincareService } from '../../components/skincare/skincareService';

export default function Skincare() {
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  // State Management
  const [skinProfile, setSkinProfile] = useState(null);
  const [skincareRoutine, setSkincareRoutine] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Translations
  const translations = {
    en: {
      title: 'Skincare Journey',
      subtitle: 'Personalized skincare tracking and recommendations',
      sections: {
        profile: 'Skin Profile',
        routine: 'My Routine',
        recommendations: 'Recommendations'
      },
      addProfile: 'Create Profile',
      loading: 'Loading your skincare insights...',
      error: 'Failed to load skincare data'
    },
    id: {
      title: 'Perjalanan Perawatan Kulit',
      subtitle: 'Pelacakan dan rekomendasi perawatan kulit personal',
      sections: {
        profile: 'Profil Kulit',
        routine: 'Rutinitas Saya',
        recommendations: 'Rekomendasi'
      },
      addProfile: 'Buat Profil',
      loading: 'Memuat wawasan perawatan kulit...',
      error: 'Gagal memuat data perawatan kulit'
    }
  };

  const t = translations[language] || translations.en;

  // Fetch Skincare Data
  useEffect(() => {
    const fetchSkincareData = async () => {
      if (!currentUser) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch skin profile
        const profile = await skincareService.getSkinProfile(currentUser.uid);
        setSkinProfile(profile);

        // Fetch skincare routine
        const routine = await skincareService.getSkincareRoutine(currentUser.uid);
        setSkincareRoutine(routine);

        // Fetch personalized recommendations
        const recommendations = await skincareService.getPersonalizedRecommendations(currentUser.uid);
        setRecommendedProducts(recommendations);

        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching skincare data:', err);
        setError(t.error);
        setIsLoading(false);
      }
    };

    fetchSkincareData();
  }, [currentUser, t.error]);

  // Handle Profile Creation/Update
  const handleSaveProfile = async (profileData) => {
    try {
      const savedProfile = await skincareService.createSkinProfile(currentUser.uid, profileData);
      setSkinProfile(savedProfile);
      setIsProfileModalOpen(false);

      // Refresh recommendations based on new profile
      const recommendations = await skincareService.getPersonalizedRecommendations(currentUser.uid);
      setRecommendedProducts(recommendations);
    } catch (err) {
      console.error('Error saving profile:', err);
      // Handle error (show toast, etc.)
    }
  };

  // Handle Routine Step Management
  const handleAddRoutineStep = async (step) => {
    try {
      const newStep = await skincareService.addRoutineStep(currentUser.uid, step);
      setSkincareRoutine(prev => [...prev, newStep]);
    } catch (err) {
      console.error('Error adding routine step:', err);
    }
  };

  // Render Loading State
  if (isLoading) {
    return (
      <div className="w-full p-6 flex flex-col justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500"></div>
        <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
          {t.loading}
        </p>
      </div>
    );
  }

  // Render Error State
  if (error) {
    return (
      <div className="w-full p-6">
        <div className={`p-6 rounded-xl ${
          isDarkMode ? 'bg-red-900/20 border-red-900 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
        } border text-center`}>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className={`mt-4 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-red-700 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'} text-white`}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      {/* Page Header */}
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Skin Profile */}
        <div>
          {skinProfile ? (
            <SkinProfile 
              skinProfile={skinProfile}
              isDarkMode={isDarkMode}
              language={language}
              onEditProfile={() => setIsProfileModalOpen(true)}
            />
          ) : (
            <motion.div 
              className={`rounded-xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-200'} border shadow-sm overflow-hidden`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 text-center">
                <Smile className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`} />
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                  Create your skin profile to get personalized recommendations
                </p>
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className={`px-4 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-primary-500 text-white hover:bg-primary-600'
                  }`}
                >
                  {t.addProfile}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Middle Column: Skincare Routine */}
        <div>
          <SkincareRoutine 
            skincareRoutine={skincareRoutine}
            isDarkMode={isDarkMode}
            language={language}
            onAddStep={() => {/* Open add step modal */}}
            onEditStep={() => {/* Open edit step modal */}}
            onDeleteStep={() => {/* Handle step deletion */}}
          />
        </div>

        {/* Right Column: Product Recommendations */}
        <div>
          <ProductRecommendations 
            recommendedProducts={recommendedProducts}
            isDarkMode={isDarkMode}
            language={language}
            onProductDetails={(product) => setSelectedProduct(product)}
          />
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal 
          isOpen={!!selectedProduct}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isDarkMode={isDarkMode}
          language={language}
        />
      )}

      {/* Skin Profile Modal (for creating/editing profile) */}
      {/* You'll need to create this modal component */}
      {/* {isProfileModalOpen && (
        <SkinProfileModal 
          isOpen={isProfileModalOpen}
          initialProfile={skinProfile}
          onClose={() => setIsProfileModalOpen(false)}
          onSave={handleSaveProfile}
          isDarkMode={isDarkMode}
          language={language}
        />
      )} */}
    </div>
  );
}