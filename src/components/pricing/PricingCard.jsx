import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PricingCard = ({ plan, billingPeriod, isDarkMode }) => {
  const { title, price, period, description, features, popular, buttonText, color } = plan;
  
  // Color mapping
  const colorMap = {
    primary: {
      button: isDarkMode ? 'bg-primary-600 hover:bg-primary-500' : 'bg-primary-500 hover:bg-primary-600',
      border: isDarkMode ? 'border-primary-600' : 'border-primary-200',
      highlight: isDarkMode ? 'border-primary-500' : 'border-primary-500',
      badge: isDarkMode ? 'bg-primary-900 text-primary-400' : 'bg-primary-100 text-primary-800',
      check: isDarkMode ? 'text-primary-400' : 'text-primary-600'
    },
    secondary: {
      button: isDarkMode ? 'bg-secondary-600 hover:bg-secondary-500' : 'bg-secondary-500 hover:bg-secondary-600',
      border: isDarkMode ? 'border-secondary-600' : 'border-secondary-200',
      highlight: isDarkMode ? 'border-secondary-500' : 'border-secondary-500',
      badge: isDarkMode ? 'bg-secondary-900 text-secondary-400' : 'bg-secondary-100 text-secondary-800',
      check: isDarkMode ? 'text-secondary-400' : 'text-secondary-600'
    },
    neutral: {
      button: isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-neutral-600 hover:bg-neutral-700',
      border: isDarkMode ? 'border-gray-700' : 'border-neutral-200',
      highlight: isDarkMode ? 'border-gray-600' : 'border-neutral-300',
      badge: isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-neutral-100 text-neutral-800',
      check: isDarkMode ? 'text-gray-400' : 'text-neutral-600'
    }
  };
  
  const colorClass = colorMap[color] || colorMap.neutral;
  
  // Card animation variants
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
      y: -10,
      boxShadow: isDarkMode 
        ? '0 20px 30px -15px rgba(0, 0, 0, 0.3)' 
        : '0 20px 30px -15px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3
      }
    }
  };
  
  return (
    <motion.div
      className={`relative rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } overflow-hidden shadow-elegant border ${
        popular ? colorClass.highlight : colorClass.border
      } ${popular ? 'ring-1 ring-offset-2' : ''} ${
        popular && isDarkMode ? 'ring-primary-600 ring-offset-gray-900' : popular ? 'ring-primary-500 ring-offset-white' : ''
      }`}
      style={{
        transform: popular ? 'scale(1.05)' : 'scale(1)',
        zIndex: popular ? 10 : 1
      }}
      variants={cardVariants}
      whileHover="hover"
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute top-0 left-0 right-0">
          <div className="relative">
            <div 
              className={`${
                isDarkMode ? 'bg-primary-700' : 'bg-primary-500'
              } text-white text-xs font-semibold py-1 text-center`}
            >
              Most Popular
            </div>
            {/* Triangle decoration */}
            <div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-solid border-x-8 border-t-8"
              style={{ 
                borderColor: `${isDarkMode ? '#065f60' : '#0e7490'} transparent transparent transparent`,
                borderWidth: '8px 8px 0 8px'
              }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="p-8">
        {/* Plan title */}
        <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
          {title}
        </h3>
        
        {/* Plan price */}
        <div className={`flex items-baseline mt-4 mb-6 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
          <span className="text-5xl font-extrabold tracking-tight">
            {price[billingPeriod]}
          </span>
          <span className={`ml-1 text-xl font-medium ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
            {period[billingPeriod]}
          </span>
        </div>
        
        {/* Plan description */}
        <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
          {description}
        </p>
        
        {/* Action button */}
        <Link 
          to="/register"
          className={`block w-full py-2 px-4 rounded-md shadow-sm text-center text-white font-medium ${colorClass.button} transition-colors duration-200`}
        >
          {buttonText}
        </Link>
      </div>
      
      {/* Plan features */}
      <div 
        className={`px-8 py-6 ${
          isDarkMode ? 'bg-gray-900 border-t border-gray-700' : 'bg-neutral-50 border-t border-neutral-100'
        }`}
      >
        <h4 className={`text-sm font-semibold mb-4 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
          What's included:
        </h4>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg 
                className={`h-5 w-5 ${colorClass.check} mr-2 mt-0.5 flex-shrink-0`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default PricingCard;