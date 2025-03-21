    // src/components/skincare/ProductRecommendations.jsx
    import React, { useState } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { 
    Search, 
    Filter, 
    Star, 
    Compass 
    } from 'lucide-react';

    const ProductRecommendations = ({ 
    recommendedProducts, 
    isDarkMode, 
    language,
    onProductDetails 
    }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // Translations
    const translations = {
        en: {
        title: 'Product Recommendations',
        search: 'Search products...',
        filters: {
            all: 'All',
            hydration: 'Hydration',
            acneControl: 'Acne Control',
            antiAging: 'Anti-Aging'
        },
        matchLabel: 'Match',
        viewDetails: 'View Details'
        },
        id: {
        title: 'Rekomendasi Produk',
        search: 'Cari produk...',
        filters: {
            all: 'Semua',
            hydration: 'Hidrasi',
            acneControl: 'Kontrol Jerawat',
            antiAging: 'Anti Penuaan'
        },
        matchLabel: 'Kesesuaian',
        viewDetails: 'Lihat Detail'
        }
    };

    const t = translations[language] || translations.en;

    // Filter and search products
    const filteredProducts = recommendedProducts.filter(product => 
        (activeFilter === 'all' || 
        product.targetConcerns.some(concern => 
        concern.toLowerCase().replace(' ', '') === activeFilter
        )) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <div className="flex items-center space-x-2">
            <div className="relative">
                <input 
                type="text"
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pr-8 pl-3 py-1.5 rounded-lg text-sm border ${
                    isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500'
                }`}
                />
                <Search 
                className={`absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                }`} 
                />
            </div>
            </div>
        </div>
        
        
        {/* Filters */}
        <div className={`px-6 py-3 border-b flex space-x-2 overflow-x-auto ${
            isDarkMode ? 'border-gray-700' : 'border-neutral-200'
        }`}>
            {Object.entries(t.filters).map(([key, label]) => (
            <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap ${
                activeFilter === key
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
        
        {/* Product Grid */}
        <div className="p-6">
            {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <AnimatePresence>
                {filteredProducts.map((product) => (
                    <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-xl border overflow-hidden ${
                        isDarkMode 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-white border-neutral-200'
                    } shadow-sm`}
                    >
                    {/* Product Image */}
                    <div 
                        className="h-48 bg-cover bg-center"
                        style={{ 
                        backgroundImage: `url(${product.imageUrl})`,
                        backgroundSize: 'cover'
                        }}
                    />
                    
                    {/* Product Details */}
                    <div className="p-4">
                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                        {product.name}
                        </h3>
                        <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                        {product.brand}
                        </p>
                        
                        {/* Match Percentage */}
                        <div className="flex items-center mb-3">
                        <Star className={`w-4 h-4 mr-2 ${
                            isDarkMode ? 'text-yellow-400' : 'text-yellow-500'
                        }`} />
                        <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                            {t.matchLabel}: {product.matchPercentage}%
                        </span>
                        </div>
                        
                        {/* Target Concerns */}
                        <div className="flex flex-wrap gap-2 mb-3">
                        {product.targetConcerns.map((concern) => (
                            <span 
                            key={concern}
                            className={`px-2 py-1 rounded-full text-xs ${
                                isDarkMode 
                                ? 'bg-primary-900/30 text-primary-300' 
                                : 'bg-primary-100 text-primary-800'
                            }`}
                            >
                            {concern}
                            </span>
                        ))}
                        </div>
                        
                        {/* View Details Button */}
                        <button
                        onClick={() => onProductDetails(product)}
                        className={`w-full py-2 rounded-lg ${
                            isDarkMode 
                            ? 'bg-primary-700 text-white hover:bg-primary-600'
                            : 'bg-primary-500 text-white hover:bg-primary-600'
                        }`}
                        >
                        {t.viewDetails}
                        </button>
                    </div>
                    </motion.div>
                ))}
                </AnimatePresence>
            </div>
            ) : (
            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                <Compass className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No products found matching your filters</p>
            </div>
            )}
        </div>
        </motion.div>
    );
    };

    export default ProductRecommendations;