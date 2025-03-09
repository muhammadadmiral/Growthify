import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeatureCategory = ({ feature, isDarkMode }) => {
  const { title, description, icon, benefits, linkTo, color } = feature;
  
  // Map color names to tailwind classes
  const colorMap = {
    primary: {
      cardBorder: isDarkMode ? 'border-primary-700' : 'border-primary-100',
      cardHover: isDarkMode ? 'hover:border-primary-600' : 'hover:border-primary-200',
      iconBg: isDarkMode ? 'bg-primary-900/30' : 'bg-primary-50',
      textColor: 'text-primary-600',
      checkColor: isDarkMode ? 'text-primary-400' : 'text-primary-500',
      linkHover: 'hover:text-primary-700'
    },
    secondary: {
      cardBorder: isDarkMode ? 'border-secondary-700' : 'border-secondary-100',
      cardHover: isDarkMode ? 'hover:border-secondary-600' : 'hover:border-secondary-200',
      iconBg: isDarkMode ? 'bg-secondary-900/30' : 'bg-secondary-50',
      textColor: 'text-secondary-600',
      checkColor: isDarkMode ? 'text-secondary-400' : 'text-secondary-500',
      linkHover: 'hover:text-secondary-700'
    },
    accent: {
      cardBorder: isDarkMode ? 'border-accent-700' : 'border-accent-100',
      cardHover: isDarkMode ? 'hover:border-accent-600' : 'hover:border-accent-200',
      iconBg: isDarkMode ? 'bg-accent-900/30' : 'bg-accent-50',
      textColor: 'text-accent-600',
      checkColor: isDarkMode ? 'text-accent-400' : 'text-accent-500',
      linkHover: 'hover:text-accent-700'
    },
    indigo: {
      cardBorder: isDarkMode ? 'border-indigo-700' : 'border-indigo-100',
      cardHover: isDarkMode ? 'hover:border-indigo-600' : 'hover:border-indigo-200',
      iconBg: isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50',
      textColor: 'text-indigo-600',
      checkColor: isDarkMode ? 'text-indigo-400' : 'text-indigo-500',
      linkHover: 'hover:text-indigo-700'
    },
    green: {
      cardBorder: isDarkMode ? 'border-green-700' : 'border-green-100',
      cardHover: isDarkMode ? 'hover:border-green-600' : 'hover:border-green-200',
      iconBg: isDarkMode ? 'bg-green-900/30' : 'bg-green-50',
      textColor: 'text-green-600',
      checkColor: isDarkMode ? 'text-green-400' : 'text-green-500',
      linkHover: 'hover:text-green-700'
    },
    pink: {
      cardBorder: isDarkMode ? 'border-pink-700' : 'border-pink-100',
      cardHover: isDarkMode ? 'hover:border-pink-600' : 'hover:border-pink-200',
      iconBg: isDarkMode ? 'bg-pink-900/30' : 'bg-pink-50',
      textColor: 'text-pink-600',
      checkColor: isDarkMode ? 'text-pink-400' : 'text-pink-500',
      linkHover: 'hover:text-pink-700'
    }
  };
  
  const colorClass = colorMap[color] || colorMap.primary;
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      y: -5,
      boxShadow: isDarkMode 
        ? '0 15px 30px -10px rgba(0, 0, 0, 0.5)' 
        : '0 20px 30px -15px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3
      }
    }
  };
  
  return (
    <motion.div
      className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-100'} rounded-xl shadow-elegant p-6 border ${colorClass.cardBorder} ${colorClass.cardHover} transition-all duration-300 h-full`}
      variants={cardVariants}
      whileHover="hover"
    >
      <div className={`h-12 w-12 rounded-lg ${colorClass.iconBg} flex items-center justify-center mb-4`}>
        <div className={colorClass.textColor}>
          {icon}
        </div>
      </div>
      
      <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
        {title}
      </h3>
      
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'} mb-4`}>
        {description}
      </p>
      
      <ul className="space-y-2 mb-6">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <svg className={`h-5 w-5 ${colorClass.checkColor} mr-2 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>{benefit}</span>
          </li>
        ))}
      </ul>
      
      <Link
        to={linkTo}
        className={`inline-flex items-center ${colorClass.textColor} ${colorClass.linkHover} font-medium transition-colors`}
      >
        Learn more
        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </motion.div>
  );
};

export default FeatureCategory;