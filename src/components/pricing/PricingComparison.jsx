import React from 'react';
import { motion } from 'framer-motion';

// Translation content
const translations = {
  en: {
    title: "Compare Plans",
    subtitle: "Find the plan that suits your needs",
    plans: ["Starter", "Pro", "Premium"],
    categories: [
      {
        name: "Habit Building",
        features: [
          {
            name: "Daily habit tracking",
            description: "Track your habits daily and build streaks",
            starter: true,
            pro: true,
            premium: true
          },
          {
            name: "Habit templates",
            description: "Pre-made habit templates for common goals",
            starter: true,
            pro: true,
            premium: true
          },
          {
            name: "Advanced analytics",
            description: "Detailed insights and trends about your habits",
            starter: false,
            pro: true,
            premium: true
          },
          {
            name: "Custom habit programs",
            description: "Professionally designed habit programs for specific goals",
            starter: false,
            pro: false,
            premium: true
          }
        ]
      },
      {
        name: "Mindset & Growth",
        features: [
          {
            name: "Daily motivation",
            description: "Daily quotes and motivation content",
            starter: true,
            pro: true,
            premium: true
          },
          {
            name: "Journaling prompts",
            description: "Guided journaling for personal reflection",
            starter: true,
            pro: true,
            premium: true
          },
          {
            name: "Mindfulness exercises",
            description: "Guided mindfulness and meditation sessions",
            starter: false,
            pro: true,
            premium: true
          },
          {
            name: "1-on-1 coaching",
            description: "Personal coaching sessions with experts",
            starter: false,
            pro: false,
            premium: true
          }
        ]
      },
      {
        name: "Body Transformation",
        features: [
          {
            name: "Basic progress tracking",
            description: "Track body metrics and changes",
            starter: true,
            pro: true,
            premium: true
          },
          {
            name: "Workout library",
            description: "Access to workout routines and exercises",
            starter: false,
            pro: true,
            premium: true
          },
          {
            name: "Nutrition guidance",
            description: "Meal plans and nutrition recommendations",
            starter: false,
            pro: true,
            premium: true
          },
          {
            name: "Personalized fitness plan",
            description: "Custom fitness plans based on your goals",
            starter: false,
            pro: false,
            premium: true
          }
        ]
      },
      {
        name: "Support",
        features: [
          {
            name: "Community access",
            description: "Join our supportive community",
            starter: true,
            pro: true,
            premium: true
          },
          {
            name: "Email support",
            description: "Get help via email within 48 hours",
            starter: true,
            pro: true,
            premium: true
          },
          {
            name: "Priority support",
            description: "Get help via email within 24 hours",
            starter: false,
            pro: true,
            premium: true
          },
          {
            name: "Dedicated account manager",
            description: "Personal account manager for questions and guidance",
            starter: false,
            pro: false,
            premium: true
          }
        ]
      }
    ]
  },
  id: {
    title: "Perbandingan Paket",
    subtitle: "Temukan paket yang sesuai dengan kebutuhan Anda",
    plans: ["Pemula", "Pro", "Premium"],
    categories: [
      {
        name: "Pembentukan Kebiasaan",
        features: [
          {
            name: "Pelacakan kebiasaan harian",
            description: "Lacak kebiasaan Anda setiap hari dan bangun rangkaian",
            starter: true,
            pro: true,
            premium: true
          },
          {
            name: "Template kebiasaan",
            description: "Template kebiasaan siap pakai untuk tujuan umum",
            starter: true,
            pro: true,
            premium: true
          },
          {
            name: "Analitik lanjutan",
            description: "Wawasan dan tren terperinci tentang kebiasaan Anda",
            starter: false,
            pro: true,
            premium: true
          },
          {
            name: "Program kebiasaan khusus",
            description: "Program kebiasaan yang dirancang secara profesional untuk tujuan spesifik",
            starter: false,
            pro: false,
            premium: true
          }
        ]
      },
      {
        name: "Pola Pikir & Pertumbuhan",
        features: [
          {
            name: "Motivasi harian",
            description: "Kutipan harian dan konten motivasi",
            starter: true,
            pro: true,
            premium: true
          },
          {
            name: "Petunjuk jurnal",
            description: "Jurnal terpandu untuk refleksi pribadi",
            starter: true,
            pro: true,
            premium: true
          },
          {
            name: "Latihan mindfulness",
            description: "Sesi mindfulness dan meditasi terpandu",
            starter: false,
            pro: true,
            premium: true
          },
          {
            name: "Pelatihan 1-on-1",
            description: "Sesi pelatihan pribadi dengan para ahli",
            starter: false,
            pro: false,
            premium: true
          }
        ]
      },
      {
        name: "Transformasi Tubuh",
        features: [
          {
            name: "Pelacakan kemajuan dasar",
            description: "Lacak metrik dan perubahan tubuh",
            starter: true,
            pro: true,
            premium: true
          },
          {
            name: "Perpustakaan latihan",
            description: "Akses ke rutinitas dan latihan",
            starter: false,
            pro: true,
            premium: true
          },
          {
            name: "Panduan nutrisi",
            description: "Rencana makan dan rekomendasi nutrisi",
            starter: false,
            pro: true,
            premium: true
          },
          {
            name: "Rencana kebugaran personal",
            description: "Rencana kebugaran kustom berdasarkan tujuan Anda",
            starter: false,
            pro: false,
            premium: true
          }
        ]
      },
      {
        name: "Dukungan",
        features: [
          {
            name: "Akses komunitas",
            description: "Bergabunglah dengan komunitas pendukung kami",
            starter: true,
            pro: true,
            premium: true
          },
          {
            name: "Dukungan email",
            description: "Dapatkan bantuan melalui email dalam 48 jam",
            starter: true,
            pro: true,
            premium: true
          },
          {
            name: "Dukungan prioritas",
            description: "Dapatkan bantuan melalui email dalam 24 jam",
            starter: false,
            pro: true,
            premium: true
          },
          {
            name: "Manajer akun dedikasi",
            description: "Manajer akun pribadi untuk pertanyaan dan panduan",
            starter: false,
            pro: false,
            premium: true
          }
        ]
      }
    ]
  }
};

const PricingComparison = ({ isDarkMode, language }) => {
  const t = translations[language] || translations.en;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
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
  
  // Check icon component
  const CheckIcon = ({ available, color = "primary" }) => {
    const colorMap = {
      primary: isDarkMode ? 'text-primary-400' : 'text-primary-600',
      negative: isDarkMode ? 'text-gray-600' : 'text-neutral-300'
    };
    
    return available ? (
      <svg className={`h-5 w-5 ${colorMap.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      <svg className={`h-5 w-5 ${colorMap.negative}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  };
  
  return (
    <div className={`py-20 ${isDarkMode ? 'bg-gray-800/50' : 'bg-neutral-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              {t.title}
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
              {t.subtitle}
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="overflow-x-auto"
          >
            <div className="min-w-max">
              <table className={`w-full border-collapse ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                <thead>
                  <tr>
                    <th className="py-4 px-6 text-left"></th>
                    {t.plans.map((plan, planIndex) => (
                      <th 
                        key={plan} 
                        className={`py-4 px-6 text-center ${
                          planIndex === 1 ? (isDarkMode ? 'text-primary-400' : 'text-primary-600') : ''
                        }`}
                      >
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                          {plan}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.categories.map((category, catIndex) => (
                    <React.Fragment key={category.name}>
                      {/* Category header */}
                      <tr>
                        <td 
                          colSpan={4} 
                          className={`py-4 px-6 text-lg font-semibold ${
                            isDarkMode ? 'bg-gray-900 text-white' : 'bg-neutral-100 text-neutral-900'
                          }`}
                        >
                          {category.name}
                        </td>
                      </tr>
                      
                      {/* Features */}
                      {category.features.map((feature, featIndex) => (
                        <tr 
                          key={`${catIndex}-${featIndex}`}
                          className={`${
                            isDarkMode 
                              ? 'border-b border-gray-700 hover:bg-gray-700/30' 
                              : 'border-b border-neutral-200 hover:bg-neutral-100/50'
                          } transition-colors`}
                        >
                          <td className="py-4 px-6">
                            <div className="flex flex-col">
                              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                                {feature.name}
                              </span>
                              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                                {feature.description}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex justify-center">
                              <CheckIcon available={feature.starter} />
                            </div>
                          </td>
                          <td className={`py-4 px-6 text-center ${
                            // Fixed: Removed reference to undefined 'index' variable
                            isDarkMode ? 'bg-primary-900/10' : 'bg-primary-50/50'
                          }`}>
                            <div className="flex justify-center">
                              <CheckIcon available={feature.pro} />
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex justify-center">
                              <CheckIcon available={feature.premium} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingComparison;