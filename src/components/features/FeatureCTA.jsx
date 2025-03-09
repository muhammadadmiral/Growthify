import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Translation content
const translations = {
  en: {
    title: "Ready to Transform Your Life?",
    subtitle: "Join thousands of others who have already started their growth journey. Get access to personalized plans, expert guidance, and a supportive community.",
    primaryButton: "Get Started Now",
    secondaryButton: "View Pricing",
    note: "No credit card required to start your free 7-day trial"
  },
  id: {
    title: "Siap Mengubah Hidup Anda?",
    subtitle: "Bergabunglah dengan ribuan orang lain yang telah memulai perjalanan pertumbuhan mereka. Dapatkan akses ke rencana personal, panduan ahli, dan komunitas yang mendukung.",
    primaryButton: "Mulai Sekarang",
    secondaryButton: "Lihat Harga",
    note: "Tidak perlu kartu kredit untuk memulai uji coba gratis 7 hari Anda"
  }
};

const FeatureCTA = ({ isDarkMode, language }) => {
  const t = translations[language] || translations.en;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: isDarkMode
          ? 'linear-gradient(135deg, rgba(49, 151, 149, 0.2), rgba(49, 130, 206, 0.2))'
          : 'linear-gradient(135deg, #E6FFFA, #EBF8FF)'
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-20"
          style={{
            background: isDarkMode
              ? 'radial-gradient(circle at center, rgba(49, 151, 149, 0.4), transparent 70%)'
              : 'radial-gradient(circle at center, rgba(49, 151, 149, 0.3), transparent 70%)'
          }}
        ></div>
        <div 
          className="absolute -left-20 -bottom-40 h-[300px] w-[300px] rounded-full opacity-20"
          style={{
            background: isDarkMode
              ? 'radial-gradient(circle at center, rgba(49, 130, 206, 0.4), transparent 70%)'
              : 'radial-gradient(circle at center, rgba(49, 130, 206, 0.3), transparent 70%)'
          }}
        ></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className={`text-3xl font-bold font-heading mb-6 ${
              isDarkMode ? 'text-white' : 'text-neutral-900'
            }`}
            variants={itemVariants}
          >
            {t.title}
          </motion.h2>
          
          <motion.p 
            className={`max-w-2xl mx-auto text-lg mb-10 ${
              isDarkMode ? 'text-gray-300' : 'text-neutral-600'
            }`}
            variants={itemVariants}
          >
            {t.subtitle}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            {/* Primary action button with glow effect */}
            <Link
              to="/register"
              className="relative group overflow-hidden"
            >
              {/* Animated glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 rounded-lg opacity-30 group-hover:opacity-70 blur-md group-hover:blur-lg transition-all duration-500 animate-gradient-shift"></div>
              
              {/* Button with hover and press effects */}
              <div 
                className={`relative flex items-center justify-center px-8 py-3 rounded-md ${
                  isDarkMode
                    ? 'bg-primary-700 text-white hover:bg-primary-600' 
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                } font-medium shadow-lg hover:shadow-primary-500/30 transition-all duration-300 group-hover:translate-y-[1px]`}
              >
                {/* Subtle inner shimmer effect */}
                <span className="absolute inset-0 rounded-md overflow-hidden">
                  <span className="absolute -inset-[100%] top-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine"></span>
                </span>
                
                <span className="relative">{t.primaryButton}</span>
              </div>
            </Link>
            
            {/* Secondary action button */}
            <Link
              to="/pricing"
              className={`px-8 py-3 rounded-md ${
                isDarkMode
                  ? 'border border-white text-white hover:bg-white/10' 
                  : 'border border-primary-200 text-primary-700 hover:bg-primary-50'
              } font-medium transition-all duration-150`}
            >
              {t.secondaryButton}
            </Link>
          </motion.div>
          
          <motion.p 
            className={`mt-6 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-neutral-600'
            }`}
            variants={itemVariants}
          >
            {t.note}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCTA;