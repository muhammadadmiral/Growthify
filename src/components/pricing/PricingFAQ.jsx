import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Translation content
const translations = {
  en: {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions about Growthify",
    faqs: [
      {
        question: "How does the 7-day free trial work?",
        answer: "You can start using Growthify with full access to all features of your chosen plan for 7 days completely free. We don't require a credit card to start your trial. At the end of your trial, you can choose to subscribe to continue using Growthify, or your account will be automatically downgraded to the free version with limited features."
      },
      {
        question: "Can I change plans or cancel my subscription?",
        answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time. If you upgrade, the new pricing will take effect immediately. If you downgrade or cancel, the change will take effect at the end of your current billing cycle, and you'll maintain access to your current plan until then."
      },
      {
        question: "What's the difference between the plans?",
        answer: "The Starter plan includes basic habit tracking, goal setting, and community access. The Pro plan adds advanced analytics, personalized growth plans, and priority support. The Premium plan includes everything in Pro plus 1-on-1 coaching, exclusive webinars, and custom habit programs. You can view our full comparison table to see all the differences."
      },
      {
        question: "Is there a mobile app available?",
        answer: "Yes, Growthify is available on iOS and Android devices. You can download our app from the App Store or Google Play Store. Your account will sync across all your devices, so you can track your progress and habits wherever you are."
      },
      {
        question: "How does the money-back guarantee work?",
        answer: "We offer a 30-day money-back guarantee. If you're not satisfied with Growthify for any reason within the first 30 days of your paid subscription, contact our support team and we'll process a full refund of your subscription fee."
      },
      {
        question: "Can I share my account with others?",
        answer: "Each subscription is for individual use only. We offer special family plans and team/organization packages for multiple users. Contact our sales team for more information on these options."
      },
      {
        question: "Do you offer discounts for students or non-profits?",
        answer: "Yes, we offer special pricing for students, educators, and non-profit organizations. Please contact our support team with verification of your status to learn more about these options."
      }
    ]
  },
  id: {
    title: "Pertanyaan yang Sering Diajukan",
    subtitle: "Temukan jawaban atas pertanyaan umum tentang Growthify",
    faqs: [
      {
        question: "Bagaimana cara kerja uji coba gratis 7 hari?",
        answer: "Anda dapat mulai menggunakan Growthify dengan akses penuh ke semua fitur paket pilihan Anda selama 7 hari sepenuhnya gratis. Kami tidak memerlukan kartu kredit untuk memulai uji coba Anda. Pada akhir uji coba Anda, Anda dapat memilih untuk berlangganan untuk terus menggunakan Growthify, atau akun Anda akan secara otomatis diturunkan ke versi gratis dengan fitur terbatas."
      },
      {
        question: "Bisakah saya mengubah paket atau membatalkan langganan saya?",
        answer: "Ya, Anda dapat meningkatkan, menurunkan, atau membatalkan langganan Anda kapan saja. Jika Anda meningkatkan, harga baru akan berlaku segera. Jika Anda menurunkan atau membatalkan, perubahan akan berlaku pada akhir siklus penagihan Anda saat ini, dan Anda akan mempertahankan akses ke paket Anda saat ini hingga saat itu."
      },
      {
        question: "Apa perbedaan antara paket-paket tersebut?",
        answer: "Paket Pemula mencakup pelacakan kebiasaan dasar, penetapan tujuan, dan akses komunitas. Paket Pro menambahkan analitik lanjutan, rencana pertumbuhan personal, dan dukungan prioritas. Paket Premium mencakup semua yang ada di Pro plus pelatihan 1-on-1, webinar eksklusif, dan program kebiasaan kustom. Anda dapat melihat tabel perbandingan lengkap kami untuk melihat semua perbedaan."
      },
      {
        question: "Apakah ada aplikasi mobile yang tersedia?",
        answer: "Ya, Growthify tersedia di perangkat iOS dan Android. Anda dapat mengunduh aplikasi kami dari App Store atau Google Play Store. Akun Anda akan disinkronkan di semua perangkat Anda, sehingga Anda dapat melacak kemajuan dan kebiasaan Anda di mana pun Anda berada."
      },
      {
        question: "Bagaimana cara kerja jaminan uang kembali?",
        answer: "Kami menawarkan jaminan uang kembali 30 hari. Jika Anda tidak puas dengan Growthify karena alasan apa pun dalam 30 hari pertama langganan berbayar Anda, hubungi tim dukungan kami dan kami akan memproses pengembalian dana penuh biaya langganan Anda."
      },
      {
        question: "Bisakah saya berbagi akun saya dengan orang lain?",
        answer: "Setiap langganan hanya untuk penggunaan individu. Kami menawarkan paket keluarga khusus dan paket tim/organisasi untuk beberapa pengguna. Hubungi tim penjualan kami untuk informasi lebih lanjut tentang opsi ini."
      },
      {
        question: "Apakah Anda menawarkan diskon untuk pelajar atau organisasi non-profit?",
        answer: "Ya, kami menawarkan harga khusus untuk pelajar, pendidik, dan organisasi non-profit. Silakan hubungi tim dukungan kami dengan verifikasi status Anda untuk mempelajari lebih lanjut tentang opsi ini."
      }
    ]
  }
};

const PricingFAQ = ({ isDarkMode, language }) => {
  const t = translations[language] || translations.en;
  const [openIndex, setOpenIndex] = useState(null);
  
  // Toggle FAQ item
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
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
  
  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <div className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
          
          <motion.div variants={itemVariants} className="space-y-4">
            {t.faqs.map((faq, index) => (
              <div 
                key={index}
                className={`rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-white border border-neutral-200'
                } overflow-hidden transition-shadow duration-300 ${
                  openIndex === index 
                    ? isDarkMode 
                      ? 'shadow-lg shadow-black/10' 
                      : 'shadow-lg shadow-neutral-500/10'
                    : ''
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full px-6 py-5 text-left flex justify-between items-center transition-colors ${
                    openIndex === index
                      ? isDarkMode 
                        ? 'bg-primary-900/20' 
                        : 'bg-primary-50'
                      : ''
                  }`}
                  aria-expanded={openIndex === index}
                >
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {faq.question}
                  </span>
                  <svg 
                    className={`h-5 w-5 transition-transform duration-300 transform ${
                      openIndex === index ? 'rotate-180' : ''
                    } ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="px-6 pb-5"
                    >
                      <p className={`text-sm pt-4 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
          
          {/* Additional help link */}
          <motion.div variants={itemVariants} className="text-center">
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
              {language === 'en'
                ? "Still have questions? "
                : "Masih punya pertanyaan? "}
              <a 
                href="/contact" 
                className={`${isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'} font-medium`}
              >
                {language === 'en' ? "Contact our team" : "Hubungi tim kami"}
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingFAQ;