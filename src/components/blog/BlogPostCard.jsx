import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogPostCard = ({ post, language, isDarkMode, readMoreText }) => {
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
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <motion.article 
      className={`rounded-xl overflow-hidden ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-200'
      } border shadow-sm hover:shadow-md transition-shadow duration-300`}
      variants={cardVariants}
      whileHover="hover"
    >
      {/* Image */}
      <Link to={`/blog/${id}`} className="block overflow-hidden relative">
        <div 
          className="h-48 w-full relative transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
      
      <div className="p-6">
        {/* Category badge */}
        <div className="mb-4">
          <span className={`px-3 py-1 inline-block rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        </div>
        
        {/* Title */}
        <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
          <Link 
            to={`/blog/${id}`} 
            className="hover:underline decoration-2 underline-offset-2"
          >
            {title[language]}
          </Link>
        </h2>
        
        {/* Excerpt */}
        <p className={`mb-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
          {excerpt[language]}
        </p>
        
        {/* Author and metadata */}
        <div className="flex items-center justify-between pt-4 border-t border-dashed mt-4 border-t-gray-700/30">
          <div className="flex items-center">
            {author.avatar ? (
              <img 
                src={author.avatar} 
                alt={author.name} 
                className="w-8 h-8 rounded-full mr-2"
              />
            ) : (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                isDarkMode ? 'bg-primary-700' : 'bg-primary-500'
              } text-white text-xs font-medium`}>
                {author.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {author.name}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                {formattedDate} • {readTime} min read
              </p>
            </div>
          </div>
          
          {/* Read more link */}
          <Link 
            to={`/blog/${id}`}
            className={`text-xs font-medium ${
              isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
            } hover:underline`}
          >
            {readMoreText} →
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPostCard;