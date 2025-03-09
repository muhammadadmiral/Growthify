import React from 'react';
import { motion } from 'framer-motion';

// Translation content
const translations = {
  en: {
    title: "Seamless Integration Across All Devices",
    subtitle: "Track your progress, create habits, and transform your mindset wherever you are",
    features: [
      {
        title: "Progress Dashboard",
        description: "View your personal growth metrics and track improvements over time with our intuitive dashboard."
      },
      {
        title: "Habit Tracking",
        description: "Build consistency with daily habit tracking, streaks, and reminders tailored to your schedule."
      },
      {
        title: "Goal Setting",
        description: "Set SMART goals with milestone tracking and celebrate your achievements along the way."
      },
      {
        title: "Community Support",
        description: "Connect with like-minded individuals, share your journey, and get support from our community."
      }
    ]
  },
  id: {
    title: "Integrasi Mulus di Semua Perangkat",
    subtitle: "Lacak kemajuan Anda, ciptakan kebiasaan, dan transformasikan pola pikir Anda di mana pun Anda berada",
    features: [
      {
        title: "Dasbor Kemajuan",
        description: "Lihat metrik pertumbuhan pribadi Anda dan lacak peningkatan dari waktu ke waktu dengan dasbor intuitif kami."
      },
      {
        title: "Pelacakan Kebiasaan",
        description: "Bangun konsistensi dengan pelacakan kebiasaan harian, rangkaian kemenangan, dan pengingat yang disesuaikan dengan jadwal Anda."
      },
      {
        title: "Penetapan Tujuan",
        description: "Tetapkan tujuan SMART dengan pelacakan tonggak dan rayakan pencapaian Anda sepanjang jalan."
      },
      {
        title: "Dukungan Komunitas",
        description: "Terhubung dengan individu yang berpikiran sama, bagikan perjalanan Anda, dan dapatkan dukungan dari komunitas kami."
      }
    ]
  }
};

const FeatureShowcase = ({ isDarkMode, language }) => {
  const t = translations[language] || translations.en;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div 
      className={`py-20 ${isDarkMode ? 'bg-gray-800/50' : 'bg-neutral-50'}`}
      style={{
        background: isDarkMode 
          ? `linear-gradient(135deg, rgba(49, 151, 149, 0.05), rgba(49, 130, 206, 0.05))`
          : `linear-gradient(135deg, rgba(230, 255, 250, 0.5), rgba(235, 248, 255, 0.5))`,
        backgroundSize: '200% 200%',
        animation: 'gradientAnimation 15s ease infinite'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column: Device mockup */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative mx-auto max-w-md">
              {/* Background glow effect */}
              <div 
                className="absolute -inset-4 rounded-xl opacity-50 blur-xl"
                style={{
                  background: isDarkMode
                    ? 'linear-gradient(135deg, rgba(49, 151, 149, 0.2), rgba(49, 130, 206, 0.2))'
                    : 'linear-gradient(135deg, rgba(49, 151, 149, 0.3), rgba(49, 130, 206, 0.3))'
                }}
              ></div>
              
              {/* Device frame */}
              <div 
                className={`relative overflow-hidden rounded-xl ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-neutral-200'
                } border-2 shadow-2xl`}
                style={{ aspectRatio: '9/16', maxHeight: '600px' }}
              >
                {/* App mockup - replace with your actual app screenshot */}
                <div 
                  className={`w-full h-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
                  style={{
                    backgroundImage: `url('/dashboard-mockup-${isDarkMode ? 'dark' : 'light'}.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Fallback when image not available */}
                  <div className={`p-4 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                    <div className={`h-8 rounded-full w-32 ${isDarkMode ? 'bg-gray-700' : 'bg-neutral-200'} mb-4`}></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className={`h-24 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-neutral-200'}`}></div>
                      <div className={`h-24 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-neutral-200'}`}></div>
                      <div className={`h-24 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-neutral-200'}`}></div>
                      <div className={`h-24 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-neutral-200'}`}></div>
                    </div>
                    <div className={`h-40 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-neutral-200'} mt-4`}></div>
                  </div>
                </div>
                
                {/* Status bar */}
                <div className="absolute top-0 inset-x-0 h-7 flex items-center justify-between px-4">
                  <div className="text-xs font-semibold">9:41</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3M16 5V3a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                      </svg>
                    </div>
                    <div className="w-4 h-4">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Home indicator bar for modern phones */}
                <div className="absolute bottom-1 inset-x-0 flex justify-center">
                  <div className={`w-1/3 h-1 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-neutral-300'}`}></div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column: Feature list */}
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <motion.div variants={itemVariants}>
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                  {t.title}
                </h2>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'} mb-8`}>
                  {t.subtitle}
                </p>
              </motion.div>
              
              <div className="space-y-8">
                {t.features.map((feature, index) => (
                  <motion.div key={index} variants={itemVariants} className="relative">
                    {/* Feature card with hover effects */}
                    <div 
                      className={`relative p-6 rounded-lg ${
                        isDarkMode 
                          ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600' 
                          : 'bg-white hover:bg-neutral-50 border border-neutral-200'
                      } transition-all duration-300 cursor-default group`}
                    >
                      {/* Subtle glow effect on hover */}
                      <div 
                        className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: isDarkMode
                            ? 'linear-gradient(135deg, rgba(49, 151, 149, 0.1), rgba(49, 130, 206, 0.1))'
                            : 'linear-gradient(135deg, rgba(49, 151, 149, 0.05), rgba(49, 130, 206, 0.05))'
                        }}
                      ></div>
                      
                      <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                        {feature.title}
                      </h3>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                        {feature.description}
                      </p>
                    </div>
                    
                    {/* Feature number */}
                    <div 
                      className={`absolute -left-3 -top-3 w-8 h-8 rounded-full flex items-center justify-center ${
                        isDarkMode
                          ? 'bg-primary-700 text-white'
                          : 'bg-primary-500 text-white'
                      } font-bold text-sm shadow-md`}
                    >
                      {index + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;