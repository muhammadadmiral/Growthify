import React from 'react';
import { motion } from 'framer-motion';

const BlogCategories = ({ categories, selectedCategory, setSelectedCategory, isDarkMode }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <motion.div 
      className="mb-8 overflow-x-auto scrollbar-hide"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex space-x-2 pb-2">
        {Object.entries(categories).map(([key, label]) => (
          <motion.button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              selectedCategory === key
                ? isDarkMode 
                  ? 'bg-primary-700 text-white shadow-sm shadow-primary-900/20' 
                  : 'bg-primary-500 text-white shadow-sm shadow-primary-500/20'
                : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
            variants={itemVariants}
          >
            {label}
          </motion.button>
        ))}
      </div>
      
      {/* Gradient fade for overflow indication */}
      <div className="relative">
        <div 
          className={`absolute right-0 top-0 bottom-0 w-12 pointer-events-none ${
            isDarkMode 
              ? 'bg-gradient-to-l from-gray-900 to-transparent' 
              : 'bg-gradient-to-l from-white to-transparent'
          }`}
        ></div>
      </div>
    </motion.div>
  );
};

export default BlogCategories;