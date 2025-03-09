import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import PricingCard from '../../components/pricing/PricingCard';
import PricingFAQ from '../../components/pricing/PricingFAQ';
import PricingComparison from '../../components/pricing/PricingComparison';

// Translation content
const translations = {
  en: {
    title: "Choose Your Plan",
    subtitle: "Select the package that fits your growth journey. No credit card required for 7-day trial.",
    monthly: "Monthly",
    annually: "Annually",
    annualDiscount: "Save 20%",
    plans: [
      {
        title: "Starter",
        price: { monthly: "$9", annually: "$7" },
        period: { monthly: "/mo", annually: "/mo, billed annually" },
        description: "Perfect for individuals just beginning their personal growth journey.",
        features: [
          "Basic habit tracking",
          "Goal setting",
          "Community access",
          "Daily motivation"
        ],
        popular: false,
        buttonText: "Start Free Trial",
        color: "neutral"
      },
      {
        title: "Pro",
        price: { monthly: "$29", annually: "$23" },
        period: { monthly: "/mo", annually: "/mo, billed annually" },
        description: "Ideal for committed individuals serious about personal transformation.",
        features: [
          "All Starter features",
          "Advanced habit analytics",
          "Personalized growth plans",
          "Weekly progress reports",
          "Priority support"
        ],
        popular: true,
        buttonText: "Start Free Trial",
        color: "primary"
      },
      {
        title: "Premium",
        price: { monthly: "$49", annually: "$39" },
        period: { monthly: "/mo", annually: "/mo, billed annually" },
        description: "The ultimate package for those who want comprehensive transformation.",
        features: [
          "All Pro features",
          "1-on-1 coaching sessions",
          "Exclusive webinars",
          "Custom habit programs",
          "Early access to new features",
          "Dedicated account manager"
        ],
        popular: false,
        buttonText: "Start Free Trial",
        color: "secondary"
      }
    ],
    enterpriseTitle: "Enterprise",
    enterpriseDescription: "Need a custom solution for your organization?",
    enterpriseButtonText: "Contact Us",
    guaranteeTitle: "100% Money-Back Guarantee",
    guaranteeText: "If you're not satisfied with Growthify within the first 30 days, we'll refund your subscription no questions asked."
  },
  id: {
    title: "Pilih Paket Anda",
    subtitle: "Pilih paket yang sesuai dengan perjalanan pertumbuhan Anda. Tidak perlu kartu kredit untuk uji coba 7 hari.",
    monthly: "Bulanan",
    annually: "Tahunan",
    annualDiscount: "Hemat 20%",
    plans: [
      {
        title: "Pemula",
        price: { monthly: "Rp129.000", annually: "Rp103.000" },
        period: { monthly: "/bln", annually: "/bln, ditagih tahunan" },
        description: "Sempurna untuk individu yang baru memulai perjalanan pengembangan diri mereka.",
        features: [
          "Pelacakan kebiasaan dasar",
          "Penetapan tujuan",
          "Akses komunitas",
          "Motivasi harian"
        ],
        popular: false,
        buttonText: "Mulai Uji Coba Gratis",
        color: "neutral"
      },
      {
        title: "Pro",
        price: { monthly: "Rp429.000", annually: "Rp343.000" },
        period: { monthly: "/bln", annually: "/bln, ditagih tahunan" },
        description: "Ideal untuk individu yang serius tentang transformasi pribadi.",
        features: [
          "Semua fitur Pemula",
          "Analitik kebiasaan lanjutan",
          "Rencana pertumbuhan personal",
          "Laporan kemajuan mingguan",
          "Dukungan prioritas"
        ],
        popular: true,
        buttonText: "Mulai Uji Coba Gratis",
        color: "primary"
      },
      {
        title: "Premium",
        price: { monthly: "Rp729.000", annually: "Rp583.000" },
        period: { monthly: "/bln", annually: "/bln, ditagih tahunan" },
        description: "Paket terlengkap untuk mereka yang menginginkan transformasi komprehensif.",
        features: [
          "Semua fitur Pro",
          "Sesi coaching 1-on-1",
          "Webinar eksklusif",
          "Program kebiasaan kustom",
          "Akses awal ke fitur baru",
          "Manajer akun dedikasi"
        ],
        popular: false,
        buttonText: "Mulai Uji Coba Gratis",
        color: "secondary"
      }
    ],
    enterpriseTitle: "Enterprise",
    enterpriseDescription: "Butuh solusi khusus untuk organisasi Anda?",
    enterpriseButtonText: "Hubungi Kami",
    guaranteeTitle: "Jaminan Uang Kembali 100%",
    guaranteeText: "Jika Anda tidak puas dengan Growthify dalam 30 hari pertama, kami akan mengembalikan uang berlangganan Anda tanpa pertanyaan."
  }
};

export default function Pricing() {
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} min-h-screen`}>
      {/* Hero section with gradient background */}
      <div 
        className="relative py-20 overflow-hidden"
        style={{ 
          background: isDarkMode 
            ? 'linear-gradient(135deg, #1e3a8a10, #1e1e3a10, #1a2e3510)'
            : 'linear-gradient(135deg, #E6FFFA20, #EBF8FF20, #F0FFF420)',
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -inset-x-40 -top-40 h-[500px] w-[1000px] opacity-50 blur-3xl"
            style={{
              background: isDarkMode
                ? 'radial-gradient(circle at center, rgba(49, 151, 149, 0.1), transparent 70%)'
                : 'radial-gradient(circle at center, rgba(49, 151, 149, 0.2), transparent 70%)'
            }}
          ></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.h1 
            className={`text-4xl md:text-5xl font-bold mb-6 leading-tight font-heading ${
              isDarkMode ? 'text-white' : 'text-neutral-900'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.title}
          </motion.h1>
          
          <motion.p 
            className={`max-w-2xl mx-auto text-lg mb-10 ${
              isDarkMode ? 'text-gray-300' : 'text-neutral-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t.subtitle}
          </motion.p>
          
          {/* Billing toggle */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div 
              className={`p-1 rounded-full flex items-center ${
                isDarkMode ? 'bg-gray-800' : 'bg-neutral-100'
              }`}
            >
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  billingPeriod === 'monthly'
                    ? isDarkMode 
                      ? 'bg-primary-700 text-white shadow' 
                      : 'bg-white text-primary-600 shadow'
                    : isDarkMode
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                {t.monthly}
              </button>
              <button
                onClick={() => setBillingPeriod('annually')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  billingPeriod === 'annually'
                    ? isDarkMode 
                      ? 'bg-primary-700 text-white shadow' 
                      : 'bg-white text-primary-600 shadow'
                    : isDarkMode
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                {t.annually}
              </button>
            </div>
            
            {/* Annual discount badge */}
            <div className="relative">
              <div 
                className={`absolute -right-16 top-0 px-3 py-1 rounded-full text-xs font-medium ${
                  isDarkMode ? 'bg-secondary-900 text-secondary-400' : 'bg-secondary-100 text-secondary-800'
                }`}
              >
                {t.annualDiscount}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Pricing plans */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {t.plans.map((plan) => (
            <PricingCard 
              key={plan.title} 
              plan={plan} 
              billingPeriod={billingPeriod}
              isDarkMode={isDarkMode}
            />
          ))}
        </motion.div>
        
        {/* Enterprise plan */}
        <motion.div 
          className={`mt-16 p-8 rounded-xl ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-neutral-50 border border-neutral-200'
          } text-center`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            {t.enterpriseTitle}
          </h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
            {t.enterpriseDescription}
          </p>
          <Link
            to="/contact"
            className={`inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
              isDarkMode 
                ? 'bg-primary-700 text-white hover:bg-primary-600' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            } transition-colors`}
          >
            {t.enterpriseButtonText}
          </Link>
        </motion.div>
        
        {/* Money-back guarantee */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            {t.guaranteeTitle}
          </h3>
          <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
            {t.guaranteeText}
          </p>
        </motion.div>
      </div>
      
      {/* Feature comparison */}
      <PricingComparison isDarkMode={isDarkMode} language={language} />
      
      {/* FAQ section */}
      <PricingFAQ isDarkMode={isDarkMode} language={language} />
    </div>
  );
}