// src/hooks/useTranslations.js
import { useLanguage } from '../contexts/LanguageContext';

// Main translations object with all text in both languages
const translations = {
  en: {
    // Common
    appName: 'Growthify',
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success!',
    
    // Navigation
    nav: {
      home: 'Home',
      features: 'Features',
      pricing: 'Pricing',
      testimonials: 'Testimonials',
      blog: 'Blog',
      login: 'Login',
      register: 'Register',
      getStarted: 'Get Started',
      dashboard: 'Dashboard',
      profile: 'Profile',
      settings: 'Settings',
      help: 'Help Center',
      signOut: 'Sign out'
    },

    // Footer
    footer: {
      quickLinks: 'Quick Links',
      resources: 'Resources',
      helpCenter: 'Help Center',
      guides: 'Guides',
      community: 'Community',
      events: 'Events',
      stayUpdated: 'Stay Updated',
      subscribeText: 'Subscribe to our newsletter for growth tips and updates.',
      yourEmail: 'Your email address',
      subscribe: 'Subscribe',
      privacyNotice: 'We respect your privacy. Unsubscribe at any time.',
      rightsReserved: 'All rights reserved.',
      transformationLinks: {
        mindset: 'Mindset Transformation',
        body: 'Body Transformation',
        habits: 'Habit Building',
        nutrition: 'Nutrition & Diet',
        fitness: 'Fitness Plans'
      },
      policies: {
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        cookies: 'Cookie Policy'
      },
      mode: 'Mode:',
      quote: 'The only person you should try to be better than is the person you were yesterday.'
    },

    // Auth Forms
    auth: {
      login: {
        title: 'Sign in to your account',
        emailLabel: 'Email address',
        passwordLabel: 'Password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot your password?',
        submitButton: 'Sign in',
        noAccount: 'Or',
        registerLink: 'start your growth journey today',
        continueWith: 'Or continue with',
        errors: {
          invalidCredentials: 'Invalid email or password. Please try again.',
          userNotFound: 'No account found with this email.',
          wrongPassword: 'Incorrect password. Please try again.',
          generic: 'Login failed. Please try again.'
        }
      },
      register: {
        title: 'Create your account',
        nameLabel: 'Full name',
        emailLabel: 'Email address',
        passwordLabel: 'Password',
        confirmPasswordLabel: 'Confirm password',
        agreeTerms: 'I agree to the Terms of Service and Privacy Policy',
        submitButton: 'Create account',
        haveAccount: 'Already have an account?',
        loginLink: 'Sign in',
        continueWith: 'Or continue with',
        errors: {
          nameRequired: 'Name is required',
          emailRequired: 'Email is required',
          emailInvalid: 'Email address is invalid',
          passwordRequired: 'Password is required',
          passwordTooShort: 'Password must be at least 8 characters',
          passwordsDoNotMatch: 'Passwords do not match',
          termsRequired: 'You must agree to the terms and conditions',
          emailInUse: 'Email already registered. Please use another email.',
          generic: 'Registration failed. Please try again.'
        }
      },
      forgotPassword: {
        title: 'Reset your password',
        instruction: 'Enter your email to receive a password reset link',
        emailLabel: 'Email address',
        submitButton: 'Send Reset Link',
        backToLogin: 'Back to Sign In',
        success: 'Password reset email sent. Check your inbox.',
        errors: {
          userNotFound: 'No account found with this email address',
          tooManyRequests: 'Too many reset attempts. Please try again later.',
          generic: 'Failed to send password reset email. Please try again.'
        }
      }
    },

    // Dashboard
    dashboard: {
      welcome: 'Welcome back, {name}!',
      stats: {
        streak: 'Day Streak',
        level: 'Level',
        points: 'points'
      },
      sections: {
        goalProgress: 'Goal Progress',
        addGoal: 'Add Goal',
        dailyHabits: 'Daily Habits',
        addHabit: 'Add Habit',
        upcomingActivities: 'Upcoming Activities',
        viewAll: 'View All'
      },
      categories: {
        body: 'Body',
        mindset: 'Mindset', 
        fitness: 'Fitness'
      },
      emptyStates: {
        noGoals: 'No goals created yet.',
        createFirstGoal: 'Create your first goal',
        noHabits: 'No habits added yet.',
        createFirstHabit: 'Create your first habit',
        noActivities: 'No upcoming activities.',
        scheduleActivity: 'Schedule activity'
      },
      motivation: {
        title: 'Daily Inspiration',
        quote: 'The only person you should try to be better than is the person you were yesterday.'
      }
    },

    // Home Page
    home: {
      hero: {
        title: 'Transform Your Life With Growthify',
        subtitle: 'Your personal development companion for mindset, habits, and body transformation. Expert guidance tailored to your unique journey.',
        startButton: 'Start Your Journey',
        exploreButton: 'Explore Features',
        features: {
          personalizedPlans: 'Personalized Plans',
          expertGuidance: 'Expert Guidance',
          progressTracking: 'Progress Tracking'
        }
      },
      features: {
        title: 'Transform Every Aspect of Your Life',
        subtitle: 'Growthify provides comprehensive tools and guidance to help you evolve in three key areas.',
        mindset: {
          title: 'Mindset Transformation',
          description: 'Develop a growth mindset, overcome limiting beliefs, and build emotional resilience for success in all areas of life.',
          benefits: [
            'Daily mindfulness practices',
            'Cognitive reframing techniques',
            'Guided visualization sessions'
          ]
        },
        habits: {
          title: 'Habit Building',
          description: 'Create and maintain positive habits that stick. Break negative patterns and establish routines that serve your goals.',
          benefits: [
            'Habit tracking system',
            'Micro-habit formation',
            'Accountability systems'
          ]
        },
        body: {
          title: 'Body Transformation',
          description: 'Achieve your ideal physique with personalized fitness and nutrition plans, whether you want to lose weight or build muscle.',
          benefits: [
            'Personalized workout plans',
            'Nutrition guidance & meal plans',
            'Progress tracking & analytics'
          ]
        }
      },
      testimonials: {
        title: 'Success Stories',
        subtitle: 'See how Growthify has helped people transform their lives.'
      },
      cta: {
        title: 'Ready to Transform Your Life?',
        subtitle: 'Join thousands of others who have already started their growth journey. Get access to personalized plans, expert guidance, and a supportive community.',
        primaryButton: 'Get Started Now',
        secondaryButton: 'View Pricing',
        note: 'No credit card required to start your free 7-day trial'
      }
    }
  },
  id: {
    // Common
    appName: 'Growthify',
    loading: 'Memuat...',
    error: 'Terjadi kesalahan',
    success: 'Berhasil!',
    
    // Navigation
    nav: {
      home: 'Beranda',
      features: 'Fitur',
      pricing: 'Harga',
      testimonials: 'Testimoni',
      blog: 'Blog',
      login: 'Masuk',
      register: 'Daftar',
      getStarted: 'Mulai',
      dashboard: 'Dasbor',
      profile: 'Profil',
      settings: 'Pengaturan',
      help: 'Pusat Bantuan',
      signOut: 'Keluar'
    },

    // Footer
    footer: {
      quickLinks: 'Tautan Cepat',
      resources: 'Sumber Daya',
      helpCenter: 'Pusat Bantuan',
      guides: 'Panduan',
      community: 'Komunitas',
      events: 'Acara',
      stayUpdated: 'Dapatkan Informasi Terbaru',
      subscribeText: 'Berlangganan newsletter kami untuk tips pertumbuhan dan pembaruan.',
      yourEmail: 'Alamat email Anda',
      subscribe: 'Berlangganan',
      privacyNotice: 'Kami menghormati privasi Anda. Berhenti berlangganan kapan saja.',
      rightsReserved: 'Seluruh hak cipta.',
      transformationLinks: {
        mindset: 'Transformasi Pola Pikir',
        body: 'Transformasi Tubuh',
        habits: 'Pembentukan Kebiasaan',
        nutrition: 'Nutrisi & Diet',
        fitness: 'Program Kebugaran'
      },
      policies: {
        terms: 'Ketentuan Layanan',
        privacy: 'Kebijakan Privasi',
        cookies: 'Kebijakan Cookie'
      },
      mode: 'Mode:',
      quote: 'Satu-satunya orang yang harus Anda coba untuk lebih baik adalah diri Anda kemarin.'
    },

    // Auth Forms
    auth: {
      login: {
        title: 'Masuk ke akun Anda',
        emailLabel: 'Alamat email',
        passwordLabel: 'Kata sandi',
        rememberMe: 'Ingat saya',
        forgotPassword: 'Lupa kata sandi?',
        submitButton: 'Masuk',
        noAccount: 'Atau',
        registerLink: 'mulai perjalanan pertumbuhan Anda hari ini',
        continueWith: 'Atau lanjutkan dengan',
        errors: {
          invalidCredentials: 'Email atau kata sandi tidak valid. Silakan coba lagi.',
          userNotFound: 'Tidak ada akun dengan email ini.',
          wrongPassword: 'Kata sandi salah. Silakan coba lagi.',
          generic: 'Gagal masuk. Silakan coba lagi.'
        }
      },
      register: {
        title: 'Buat akun Anda',
        nameLabel: 'Nama lengkap',
        emailLabel: 'Alamat email',
        passwordLabel: 'Kata sandi',
        confirmPasswordLabel: 'Konfirmasi kata sandi',
        agreeTerms: 'Saya menyetujui Ketentuan Layanan dan Kebijakan Privasi',
        submitButton: 'Buat akun',
        haveAccount: 'Sudah punya akun?',
        loginLink: 'Masuk',
        continueWith: 'Atau lanjutkan dengan',
        errors: {
          nameRequired: 'Nama wajib diisi',
          emailRequired: 'Email wajib diisi',
          emailInvalid: 'Alamat email tidak valid',
          passwordRequired: 'Kata sandi wajib diisi',
          passwordTooShort: 'Kata sandi minimal 8 karakter',
          passwordsDoNotMatch: 'Kata sandi tidak cocok',
          termsRequired: 'Anda harus menyetujui syarat dan ketentuan',
          emailInUse: 'Email sudah terdaftar. Gunakan email lain.',
          generic: 'Pendaftaran gagal. Silakan coba lagi.'
        }
      },
      forgotPassword: {
        title: 'Reset kata sandi Anda',
        instruction: 'Masukkan email Anda untuk menerima tautan reset kata sandi',
        emailLabel: 'Alamat email',
        submitButton: 'Kirim Tautan Reset',
        backToLogin: 'Kembali ke Masuk',
        success: 'Email reset kata sandi terkirim. Periksa kotak masuk Anda.',
        errors: {
          userNotFound: 'Tidak ada akun dengan alamat email ini',
          tooManyRequests: 'Terlalu banyak percobaan reset. Silakan coba lagi nanti.',
          generic: 'Gagal mengirim email reset kata sandi. Silakan coba lagi.'
        }
      }
    },

    // Dashboard
    dashboard: {
      welcome: 'Selamat datang kembali, {name}!',
      stats: {
        streak: 'Hari Beruntun',
        level: 'Level',
        points: 'poin'
      },
      sections: {
        goalProgress: 'Kemajuan Tujuan',
        addGoal: 'Tambah Tujuan',
        dailyHabits: 'Kebiasaan Harian',
        addHabit: 'Tambah Kebiasaan',
        upcomingActivities: 'Aktivitas Mendatang',
        viewAll: 'Lihat Semua'
      },
      categories: {
        body: 'Tubuh',
        mindset: 'Pola Pikir', 
        fitness: 'Kebugaran'
      },
      emptyStates: {
        noGoals: 'Belum ada tujuan yang dibuat.',
        createFirstGoal: 'Buat tujuan pertama Anda',
        noHabits: 'Belum ada kebiasaan yang ditambahkan.',
        createFirstHabit: 'Buat kebiasaan pertama Anda',
        noActivities: 'Tidak ada aktivitas mendatang.',
        scheduleActivity: 'Jadwalkan aktivitas'
      },
      motivation: {
        title: 'Inspirasi Harian',
        quote: 'Satu-satunya orang yang harus Anda coba untuk lebih baik adalah diri Anda kemarin.'
      }
    },
    
    // Home Page
    home: {
      hero: {
        title: 'Transformasi Hidup Anda Dengan Growthify',
        subtitle: 'Teman pengembangan diri Anda untuk transformasi pola pikir, kebiasaan, dan tubuh. Panduan ahli disesuaikan dengan perjalanan unik Anda.',
        startButton: 'Mulai Perjalanan Anda',
        exploreButton: 'Jelajahi Fitur',
        features: {
          personalizedPlans: 'Rencana Personal',
          expertGuidance: 'Panduan Ahli',
          progressTracking: 'Pelacakan Kemajuan'
        }
      },
      features: {
        title: 'Transformasi Setiap Aspek Kehidupan Anda',
        subtitle: 'Growthify menyediakan alat dan panduan komprehensif untuk membantu Anda berkembang di tiga area utama.',
        mindset: {
          title: 'Transformasi Pola Pikir',
          description: 'Kembangkan pola pikir bertumbuh, atasi keyakinan yang membatasi, dan bangun ketahanan emosional untuk sukses di semua bidang kehidupan.',
          benefits: [
            'Praktik mindfulness harian',
            'Teknik reframing kognitif',
            'Sesi visualisasi terpandu'
          ]
        },
        habits: {
          title: 'Pembentukan Kebiasaan',
          description: 'Buat dan pertahankan kebiasaan positif yang bertahan. Patahkan pola negatif dan bangun rutinitas yang mendukung tujuan Anda.',
          benefits: [
            'Sistem pelacakan kebiasaan',
            'Pembentukan micro-habit',
            'Sistem akuntabilitas'
          ]
        },
        body: {
          title: 'Transformasi Tubuh',
          description: 'Capai bentuk tubuh ideal Anda dengan rencana kebugaran dan nutrisi yang dipersonalisasi, baik Anda ingin menurunkan berat badan atau membangun otot.',
          benefits: [
            'Rencana latihan personal',
            'Panduan nutrisi & rencana makan',
            'Pelacakan kemajuan & analisis'
          ]
        }
      },
      testimonials: {
        title: 'Kisah Sukses',
        subtitle: 'Lihat bagaimana Growthify telah membantu orang-orang mengubah hidup mereka.'
      },
      cta: {
        title: 'Siap Mengubah Hidup Anda?',
        subtitle: 'Bergabunglah dengan ribuan orang lain yang telah memulai perjalanan pertumbuhan mereka. Dapatkan akses ke rencana personal, panduan ahli, dan komunitas yang mendukung.',
        primaryButton: 'Mulai Sekarang',
        secondaryButton: 'Lihat Harga',
        note: 'Tidak perlu kartu kredit untuk memulai uji coba gratis 7 hari Anda'
      }
    }
  }
};

// Custom hook to get translations based on current language
export const useTranslations = () => {
  const { language } = useLanguage();
  
  // Return the entire translations object for the current language
  const t = translations[language] || translations.en; // Fallback to English
  
  // Function to format strings with variables
  const format = (str, params) => {
    if (!str) return '';
    if (!params) return str;
    
    return Object.entries(params).reduce(
      (acc, [key, value]) => acc.replace(`{${key}}`, value),
      str
    );
  };
  
  return { t, format };
};

export default useTranslations;