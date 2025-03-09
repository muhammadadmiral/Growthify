import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogFeatured = ({ post, language, isDarkMode, readMoreText, featuredLabel }) => {
  const { id, title, excerpt, author, category, publishDate, readTime, imageUrl } = post;
  
  // Format date with user's locale
  const formattedDate = new Date(publishDate).toLocaleDateString(
    language === 'id' ? 'id-ID' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
  
  // Category badge style
  const getCategoryColor = (category) => {
    const colorMap = {
      mindset: {
        bg: isDarkMode ? 'bg-primary-900/30 text-primary-400' : 'bg-primary-100 text-primary-800',
      },
      habits: {
        bg: isDarkMode ? 'bg-secondary-900/30 text-secondary-400' : 'bg-secondary-100 text-secondary-800',
      },
      body: {
        bg: isDarkMode ? 'bg-accent-900/30 text-accent-400' : 'bg-accent-100 text-accent-800',
      },
      nutrition: {
        bg: isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800',
      },
      productivity: {
        bg: isDarkMode ? 'bg-indigo-900/30 text-indigo-400' : 'bg-indigo-100 text-indigo-800',
      }
    };
    
    return colorMap[category]?.bg || (isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-neutral-100 text-neutral-800');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <motion.article 
      className={`rounded-xl overflow-hidden relative ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-200'
      } border shadow-lg`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Featured badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isDarkMode ? 'bg-primary-900/80 text-primary-300' : 'bg-primary-500 text-white'
        } flex items-center`}>
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z" clipRule="evenodd" />
          </svg>
          {featuredLabel}
        </div>
      </div>
      
      <div className="md:flex">
        {/* Image */}
        <div className="md:w-1/2">
          <Link to={`/blog/${id}`} className="block overflow-hidden h-full">
            <div 
              className="h-64 md:h-full w-full relative transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Overlay gradient for better text readability on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>
        </div>
        
        {/* Content */}
        <div className="md:w-1/2 p-8">
          {/* Category badge */}
          <div className="mb-4">
            <span className={`px-3 py-1 inline-block rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </div>
          
          {/* Title */}
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            <Link 
              to={`/blog/${id}`} 
              className="hover:underline decoration-2 underline-offset-2"
            >
              {title[language]}
            </Link>
          </h2>
          
          {/* Excerpt */}
          <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
            {excerpt[language]}
          </p>
          
          {/* Author and metadata */}
          <div className="flex items-center justify-between pt-4 border-t border-dashed mt-6 border-t-gray-700/30">
            <div className="flex items-center">
              {author.avatar ? (
                <img 
                  src={author.avatar} 
                  alt={author.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
              ) : (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  isDarkMode ? 'bg-primary-700' : 'bg-primary-500'
                } text-white font-medium`}>
                  {author.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                  {author.name}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                  {formattedDate} • {readTime} min read
                </p>
              </div>
            </div>
            
            {/* Read more link */}
            <Link 
              to={`/blog/${id}`}
              className={`px-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-primary-700 hover:bg-primary-600 text-white' 
                  : 'bg-primary-500 hover:bg-primary-600 text-white'
              } text-sm font-medium transition-colors`}
            >
              {readMoreText}
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogFeatured;