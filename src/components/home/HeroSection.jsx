// src/components/Home/HeroSection.jsx
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useAuth } from '../../hooks/useAuth';
import { useTranslations } from '../../hooks/useTranslations';

export default function HeroSection() {
  const { isDarkMode } = useDarkMode();     
  const { t } = useTranslations();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: -10, // Only using two values (initial and animate)
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        type: "tween" // Explicitly set to tween
      }
    }
  };

  const pulseAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: 1.05, // Only using two values
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        type: "tween" // Explicitly set to tween
      }
    }
  };

  const glowingBorder = {
    initial: { boxShadow: '0 0 0 rgba(49, 151, 149, 0.2)' },
    animate: {
      boxShadow: '0 0 10px rgba(49, 151, 149, 0.8)', // Only using two values
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        type: "tween" // Explicitly set to tween
      }
    }
  };

  // Set visibility after a small delay for better entrance effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Handle primary button click based on authentication
  const handlePrimaryButtonClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div ref={heroRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Enhanced Hero Background with parallax effect */}
      <div 
        className="absolute inset-0 transform skewY(-6deg) origin-top-right -translate-y-36 z-0"
        style={{ 
          background: isDarkMode 
            ? 'linear-gradient(135deg, #1e3a8a, #1e1e3a, #1a2e35)'
            : 'linear-gradient(135deg, #E6FFFA, #EBF8FF, #F0FFF4)',
          boxShadow: isDarkMode
            ? 'inset 0 0 30px rgba(49, 151, 149, 0.05)'
            : 'inset 0 0 30px rgba(49, 151, 149, 0.1)',
          transform: `skewY(-6deg) translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10 - 36}px)`
        }}
      >
        {/* Enhanced animated geometric shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* Animated circles */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                background: isDarkMode
                  ? `rgba(${49 + Math.random() * 30}, ${151 + Math.random() * 30}, ${149 + Math.random() * 30}, 0.15)`
                  : `rgba(${49 + Math.random() * 30}, ${151 + Math.random() * 30}, ${149 + Math.random() * 30}, 0.2)`,
                opacity: 0.7,
                filter: 'blur(2px)'
              }}
              animate={{
                y: -40, // Changed from [0, -40, 0] to just -40
                opacity: 0.6, // Changed from [0.2, 0.6, 0.2] to just 0.6
                scale: 1.1 // Changed from [1, 1.1, 1] to just 1.1
              }}
              transition={{
                duration: 4 + Math.random() * 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.5,
                type: "tween" // Explicitly set to tween
              }}
            />
          ))}
          
          {/* Add geometric shapes */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${30 + Math.random() * 20}px`,
                height: `${30 + Math.random() * 20}px`,
                background: 'transparent',
                border: isDarkMode
                  ? `1px solid rgba(${49 + Math.random() * 30}, ${151 + Math.random() * 30}, ${149 + Math.random() * 30}, 0.2)`
                  : `1px solid rgba(${49 + Math.random() * 30}, ${151 + Math.random() * 30}, ${149 + Math.random() * 30}, 0.3)`,
                borderRadius: i % 2 === 0 ? '0' : '50%',
                transform: `rotate(${Math.random() * 45}deg)`
              }}
              animate={{
                rotate: 45, // Changed from [0, 45, 0] to just 45
                scale: 1.2, // Changed from [1, 1.2, 1] to just 1.2
                opacity: 0.6 // Changed from [0.3, 0.6, 0.3] to just 0.6
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.7,
                type: "tween" // Explicitly set to tween
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content with enhanced animations */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.h1 
          className={`text-4xl md:text-6xl font-bold mb-6 leading-tight font-heading ${
            isDarkMode ? 'text-gray-100' : 'text-text-dark'
          }`}
          variants={fadeInUp}
        >
          {t.home.hero.title.split(' With ')[0]}{' '}
          <span className="gradient-text relative inline-block">
            With
            <motion.span 
              className="absolute -bottom-1 left-0 h-1 bg-primary-500 w-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 1 }}
            />
          </span>{' '}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {t.home.hero.title.split(' With ')[1]}
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className={`max-w-2xl mx-auto text-lg md:text-xl mb-10 ${
            isDarkMode ? 'text-gray-300' : 'text-text'
          }`}
          variants={fadeInUp}
        >
          {t.home.hero.subtitle}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={fadeInUp}
        >
          <motion.button
            onClick={handlePrimaryButtonClick}
            className={`px-8 py-3 rounded-md relative overflow-hidden ${
              isDarkMode 
                ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                : 'bg-primary-500 text-white hover:bg-primary-600'
            } font-medium shadow-lg transform transition-all duration-200`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            variants={glowingBorder}
            animate="animate"
            initial="initial"
          >
            {/* Animated glow effect behind button */}
            <motion.span 
              className="absolute inset-0 w-full h-full bg-primary-400 rounded-md opacity-30"
              animate={{
                scale: 1.1, // Changed from [1, 1.1, 1] to just 1.1
                opacity: 0.4 // Changed from [0.2, 0.4, 0.2] to just 0.4
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                type: "tween" // Explicitly set to tween
              }}
            />
            <span className="relative z-10">
              {isAuthenticated ? t.home.hero.continueButton || 'Continue Journey' : t.home.hero.startButton}
            </span>
          </motion.button>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/features"
              className={`px-8 py-3 rounded-md inline-block ${
                isDarkMode 
                  ? 'border border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700'
                  : 'border border-secondary-300 bg-white text-secondary-700 hover:bg-secondary-50'
              } font-medium transition-all duration-200`}
            >
              {t.home.hero.exploreButton}
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Feature checkmarks with enhanced animation */}
        <motion.div 
          className={`mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm md:text-base ${
            isDarkMode ? 'text-gray-300' : 'text-text'
          }`}
          variants={fadeInUp}
        >
          {[
            t.home.hero.features.personalizedPlans,
            t.home.hero.features.expertGuidance,
            t.home.hero.features.progressTracking
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + (index * 0.2) }}
            >
              <motion.div 
                className={`${isDarkMode ? 'bg-primary-800' : 'bg-primary-100'} rounded-full p-1 mr-2`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 + (index * 0.2), type: "spring" }}
              >
                <motion.span 
                  className={`${isDarkMode ? 'text-primary-400' : 'text-primary-500'} flex text-lg items-center justify-center`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 10 }} // Changed from [0, 10, 0] to just 10
                  transition={{ 
                    delay: 1 + (index * 0.2), 
                    type: "spring",
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration:.5 // Added duration for the animation
                  }}
                >
                  ✓
                </motion.span>
              </motion.div>
              <span>{feature}</span>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced floating decorative elements */}
        <motion.div 
          className="absolute bottom-0 right-0 w-64 h-64 opacity-20 rounded-full blur-sm" 
          style={{ 
            background: isDarkMode
              ? 'radial-gradient(circle, #2C7A7B, transparent)'
              : 'radial-gradient(circle, #38B2AC, transparent)',
            transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)`
          }}
          variants={floatingAnimation}
          animate="animate"
          initial="initial"
        />
        <motion.div 
          className="absolute top-40 left-10 w-32 h-32 opacity-20 rounded-full hidden md:block blur-sm" 
          style={{ 
            background: isDarkMode
              ? 'radial-gradient(circle, #2B6CB0, transparent)'
              : 'radial-gradient(circle, #4299E1, transparent)',
            transform: `translateX(${mousePosition.x * -15}px) translateY(${mousePosition.y * -15}px)`
          }}
          variants={floatingAnimation}
          animate="animate"
          initial="initial"
        />
        
        {/* New decorative element with parallax effect */}
        <motion.div 
          className="absolute top-20 right-10 w-20 h-20 opacity-20 rounded-full hidden lg:block blur-sm" 
          style={{ 
            background: isDarkMode
              ? 'radial-gradient(circle, #9C4668, transparent)'
              : 'radial-gradient(circle, #ED64A6, transparent)',
            transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px)`
          }}
          variants={floatingAnimation}
          animate="animate"
          initial="initial"
        />
        
        {/* Animated badge or highlight element */}
        <motion.div
          className="absolute top-0 right-0 md:right-10 lg:right-20 hidden md:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div 
            className={`rounded-full p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg flex items-center`}
            animate={{
              y: -5, // Changed from [0, -5, 0] to just -5
              rotate: 5 // Changed from [0, 5, 0] to just 5
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              type: "tween" // Explicitly set to tween
            }}
          >
            <motion.div 
              className="rounded-full bg-green-500 w-3 h-3 mr-2"
              animate={{ scale: 1.2 }} // Changed from [1, 1.2, 1] to just 1.2
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                type: "tween" // Explicitly set to tween
              }}
            />
            <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              New Features
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Enhanced social proof section */}
      <motion.div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.p 
          className="text-sm uppercase tracking-wider mb-4 opacity-70"
          animate={{ y: -5 }} // Changed from [0, -5, 0] to just -5
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            repeatType: "reverse",
            type: "tween" // Explicitly set to tween
          }}
        >
          Trusted by thousands on their journey
        </motion.p>
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 opacity-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span 
              className={`text-2xl mr-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`}
              animate={{ rotate: 10 }} // Changed from [0, 10, 0] to just 10
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse",
                type: "tween" // Explicitly set to tween
              }}
            >
              ★
            </motion.span>
            <span className="font-semibold">4.9/5</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="font-semibold">5,000+</span> Active Users
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="font-semibold">120,000+</span> Goals Achieved
          </motion.div>
        </motion.div>
        
        {/* Added a call-to-action badge */}
        <motion.div 
          className="mt-10 inline-block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div 
            className={`py-2 px-4 rounded-full text-sm ${
              isDarkMode 
                ? 'bg-gray-800 text-primary-400 border border-gray-700' 
                : 'bg-primary-50 text-primary-700 border border-primary-100'
            }`}
            animate={{ 
              boxShadow: '0 0 10px rgba(49, 151, 149, 0.3)' // Changed from array to single value
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatType: "reverse",
              type: "tween" // Explicitly set to tween
            }}
          >
            Join today and transform yourself step by step
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}