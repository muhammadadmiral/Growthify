// src/components/skincare/ProductDetailsModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Star, 
  AlertTriangle, 
  Info, 
  Droplet, 
  Target, 
  Smile, 
  Clock, 
  CheckCircle, 
  XCircle,
  Shield,
  Zap
} from 'lucide-react';

const ProductDetailsModal = ({ 
  isOpen, 
  product, 
  onClose, 
  isDarkMode, 
  language 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Translations
  const translations = {
    en: {
      tabs: {
        overview: 'Overview',
        ingredients: 'Ingredients',
        benefits: 'Benefits',
        howToUse: 'How to Use',
        compatibility: 'Compatibility'
      },
      details: {
        brand: 'Brand',
        size: 'Product Size',
        price: 'Price',
        matchPercentage: 'Match Percentage',
        targetConcerns: 'Target Concerns',
        suitableSkinTypes: 'Suitable Skin Types',
        ingredients: 'Ingredients List',
        keyIngredients: 'Key Ingredients',
        benefits: 'Product Benefits',
        howToUse: 'Application Instructions',
        skinTypeCompatibility: 'Skin Type Compatibility',
        precautions: 'Precautions & Warnings',
        scientificInfo: 'Scientific Breakdown'
      },
      warnings: {
        avoid: 'Avoid If',
        recommended: 'Recommended For'
      },
      close: 'Close'
    },
    id: {
      tabs: {
        overview: 'Gambaran Umum',
        ingredients: 'Bahan',
        benefits: 'Manfaat',
        howToUse: 'Cara Pakai',
        compatibility: 'Kompatibilitas'
      },
      details: {
        brand: 'Merek',
        size: 'Ukuran Produk',
        price: 'Harga',
        matchPercentage: 'Persentase Kesesuaian',
        targetConcerns: 'Masalah yang Ditangani',
        suitableSkinTypes: 'Cocok untuk Jenis Kulit',
        ingredients: 'Daftar Bahan',
        keyIngredients: 'Bahan Utama',
        benefits: 'Manfaat Produk',
        howToUse: 'Petunjuk Penggunaan',
        skinTypeCompatibility: 'Kompatibilitas Jenis Kulit',
        precautions: 'Peringatan & Tindakan Pencegahan',
        scientificInfo: 'Rincian Ilmiah'
      },
      warnings: {
        avoid: 'Hindari Jika',
        recommended: 'Direkomendasikan Untuk'
      },
      close: 'Tutup'
    }
  };

  const t = translations[language] || translations.en;

  if (!isOpen || !product) return null;

  // Render Tab Navigation
  const renderTabNavigation = () => (
    <div className="flex border-b mb-6">
      {Object.entries(t.tabs).map(([key, label]) => (
        <button
          key={key}
          onClick={() => setActiveTab(key)}
          className={`flex-1 py-3 ${
            activeTab === key
              ? isDarkMode
                ? 'border-b-2 border-primary-500 text-primary-500'
                : 'border-b-2 border-primary-600 text-primary-700'
              : isDarkMode
                ? 'text-gray-400 hover:text-gray-200'
                : 'text-neutral-500 hover:text-neutral-700'
          } transition-colors`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  // Render Content Based on Active Tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Product Summary */}
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                {t.details.brand} & {t.details.matchPercentage}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-neutral-50 border-neutral-200'
                } border`}>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
                    {t.details.brand}
                  </p>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {product.brand}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-neutral-50 border-neutral-200'
                } border`}>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
                    {t.details.matchPercentage}
                  </p>
                  <div className="flex items-center">
                    <Star className={`w-5 h-5 mr-2 ${
                      isDarkMode ? 'text-yellow-400' : 'text-yellow-500'
                    }`} />
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                      {product.matchPercentage}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Concerns */}
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                {t.details.targetConcerns}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.targetConcerns.map((concern) => (
                  <span 
                    key={concern}
                    className={`px-3 py-1 rounded-full text-xs flex items-center ${
                      isDarkMode 
                        ? 'bg-primary-900/30 text-primary-300' 
                        : 'bg-primary-100 text-primary-800'
                    }`}
                  >
                    <Target className="w-3 h-3 mr-1" />
                    {concern}
                  </span>
                ))}
              </div>
            </div>

            {/* Suitable Skin Types */}
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                {t.details.suitableSkinTypes}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.suitableSkinTypes.map((skinType) => (
                  <span 
                    key={skinType}
                    className={`px-3 py-1 rounded-full text-xs flex items-center ${
                      isDarkMode 
                        ? 'bg-green-900/30 text-green-300' 
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    <Smile className="w-3 h-3 mr-1" />
                    {skinType}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'ingredients':
        return (
          <div className="space-y-6">
            {/* Detailed Ingredients List */}
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                {t.details.ingredients}
              </h3>
              <div className={`p-4 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-neutral-50 border-neutral-200'
              } border`}>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                  {product.ingredients.join(', ')}
                </p>
              </div>
            </div>

            {/* Key Ingredients */}
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                {t.details.keyIngredients}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {product.keyIngredients.map((ingredient) => (
                  <div 
                    key={ingredient.name}
                    className={`p-4 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-white border-neutral-200'
                    }`}
                  >
                    <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                      {ingredient.name}
                    </h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                      {ingredient.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      // Continue with other tabs (benefits, how to use, etc.)
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className={`w-full max-w-2xl h-[90vh] rounded-xl ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-neutral-900'
          } shadow-2xl flex flex-col`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Modal Header */}
          <div className={`p-6 pb-0 flex justify-between items-center`}>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              {product.name}
            </h2>
            <button 
              onClick={onClose}
              className={`${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              } p-2 rounded-full transition-colors`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Product Image */}
          <div 
            className="h-48 bg-cover bg-center mx-6 my-4 rounded-xl"
            style={{ 
              backgroundImage: `url(${product.imageUrl})`,
              backgroundSize: 'cover'
            }}
          />

          {/* Tab Navigation */}
          {renderTabNavigation()}

          {/* Tab Content */}
          <div className="px-6 pb-6 overflow-y-auto">
            {renderTabContent()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailsModal