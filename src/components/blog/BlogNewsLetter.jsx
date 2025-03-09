import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BlogNewsletter = ({ isDarkMode, newsletterData }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Simulate API call
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <motion.div 
      className={`p-6 rounded-xl ${
        isDarkMode 
          ? 'bg-gradient-to-br from-primary-900/30 to-secondary-900/30 border border-primary-800' 
          : 'bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100'
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
        {newsletterData.title}
      </h3>
      <p className={`mb-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
        {newsletterData.description}
      </p>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={newsletterData.placeholder}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-white focus:border-primary-500' 
                : 'bg-white border-neutral-200 text-neutral-900 focus:border-primary-500'
            } border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50`}
            disabled={isSubmitting || isSuccess}
          />
          
          {error && (
            <p className="absolute -bottom-5 left-0 text-xs text-red-500">
              {error}
            </p>
          )}
        </div>
        
        <button 
          type="submit" 
          className={`w-full py-2 rounded-lg font-medium ${
            isDarkMode 
              ? 'bg-primary-700 hover:bg-primary-600 text-white' 
              : 'bg-primary-500 hover:bg-primary-600 text-white'
          } transition-colors ${isSubmitting || isSuccess ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={isSubmitting || isSuccess}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : isSuccess ? (
            <span className="flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Subscribed!
            </span>
          ) : (
            newsletterData.button
          )}
        </button>
      </form>
      
      <p className={`mt-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
        {newsletterData.privacy}
      </p>
      
      {/* Decorative elements */}
      <div className="absolute -right-3 -bottom-3 w-24 h-24 opacity-10 rounded-full bg-primary-500 blur-xl"></div>
      <div className="absolute -left-6 -top-6 w-32 h-32 opacity-10 rounded-full bg-secondary-500 blur-xl"></div>
    </motion.div>
  );
};

export default BlogNewsletter;