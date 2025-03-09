import React from 'react';
import { motion } from 'framer-motion';

// Translation content
const translations = {
  en: {
    title: "What Our Users Say",
    subtitle: "Join thousands of others who have transformed their lives with Growthify",
    testimonials: [
      {
        quote: "Growthify's habit building system completely changed my life. I've gone from procrastinating daily to having a productive morning routine I never miss.",
        name: "James Davis",
        role: "Marketing Executive",
        avatar: "/avatars/james.jpg",
        initials: "JD",
        color: "primary"
      },
      {
        quote: "I've lost 30 pounds and gained so much confidence using Growthify's body transformation program. The personalized approach made all the difference.",
        name: "Sarah Lee",
        role: "Software Engineer",
        avatar: "/avatars/sarah.jpg",
        initials: "SL",
        color: "secondary"
      },
      {
        quote: "As an entrepreneur, I struggled with balancing work and personal growth. Growthify helped me create systems that prioritize my wellbeing while growing my business.",
        name: "Michael Renner",
        role: "Startup Founder",
        avatar: "/avatars/michael.jpg",
        initials: "MR",
        color: "accent"
      }
    ]
  },
  id: {
    title: "Apa Kata Pengguna Kami",
    subtitle: "Bergabunglah dengan ribuan orang lain yang telah mengubah hidup mereka dengan Growthify",
    testimonials: [
      {
        quote: "Sistem pembentukan kebiasaan Growthify benar-benar mengubah hidup saya. Saya telah berubah dari menunda-nunda setiap hari menjadi memiliki rutinitas pagi yang produktif yang tidak pernah saya lewatkan.",
        name: "James Davis",
        role: "Eksekutif Pemasaran",
        avatar: "/avatars/james.jpg",
        initials: "JD",
        color: "primary"
      },
      {
        quote: "Saya telah menurunkan 13 kg dan mendapatkan banyak kepercayaan diri menggunakan program transformasi tubuh Growthify. Pendekatan yang dipersonalisasi membuat perbedaan besar.",
        name: "Sarah Lee",
        role: "Insinyur Perangkat Lunak",
        avatar: "/avatars/sarah.jpg",
        initials: "SL",
        color: "secondary"
      },
      {
        quote: "Sebagai seorang wirausaha, saya kesulitan menyeimbangkan pekerjaan dan pertumbuhan pribadi. Growthify membantu saya menciptakan sistem yang memprioritaskan kesejahteraan saya sambil mengembangkan bisnis.",
        name: "Michael Renner",
        role: "Pendiri Startup",
        avatar: "/avatars/michael.jpg",
        initials: "MR",
        color: "accent"
      }
    ]
  }
};

const FeatureTestimonial = ({ isDarkMode, language }) => {
  const t = translations[language] || translations.en;
  
  // Color mapping
  const colorMap = {
    primary: {
      bg: isDarkMode ? 'bg-primary-500' : 'bg-primary-500',
      gradient: 'from-primary-500 to-primary-600'
    },
    secondary: {
      bg: isDarkMode ? 'bg-secondary-500' : 'bg-secondary-500',
      gradient: 'from-secondary-500 to-secondary-600'
    },
    accent: {
      bg: isDarkMode ? 'bg-accent-500' : 'bg-accent-500',
      gradient: 'from-accent-500 to-accent-600'
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <div className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className={`text-3xl font-bold font-heading mb-4 ${
              isDarkMode ? 'text-white' : 'text-neutral-900'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.title}
          </motion.h2>
          
          <motion.p 
            className={`max-w-2xl mx-auto text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-neutral-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t.subtitle}
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {t.testimonials.map((testimonial, index) => {
            const colorClass = colorMap[testimonial.color] || colorMap.primary;
            
            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                className={`${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-100'
                } rounded-xl shadow-elegant p-6 relative border`}
                whileHover={{ 
                  y: -10,
                  boxShadow: isDarkMode 
                    ? '0 20px 30px -15px rgba(0, 0, 0, 0.3)' 
                    : '0 20px 30px -15px rgba(0, 0, 0, 0.1)'
                }}
                transition={{ duration: 0.2 }}
              >
                <div 
                  className={`absolute -top-4 left-6 h-8 w-8 ${colorClass.bg} rounded-full flex items-center justify-center`}
                >
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                </div>
                
                <div className="pt-4">
                  <p className={`${
                    isDarkMode ? 'text-gray-300' : 'text-neutral-700'
                  } italic mb-6 text-sm md:text-base`}>
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center">
                    {testimonial.avatar ? (
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md"
                      />
                    ) : (
                      <div 
                        className={`h-10 w-10 rounded-full bg-gradient-to-br ${colorClass.gradient} flex items-center justify-center text-white font-medium shadow-md`}
                      >
                        {testimonial.initials}
                      </div>
                    )}
                    
                    <div className="ml-3">
                      <h4 className={`text-sm font-semibold ${
                        isDarkMode ? 'text-white' : 'text-neutral-900'
                      }`}>
                        {testimonial.name}
                      </h4>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                      }`}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default FeatureTestimonial;