// src/translations/auth.js
const authTranslations = {
    en: {
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
          emailRequired: 'Email is required',
          emailInvalid: 'Please enter a valid email address',
          passwordRequired: 'Password is required',
          passwordTooShort: 'Password must be at least 8 characters',
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
        whyJoin: '🚀 Why join Growthify?',
        benefits: [
          'Personalized growth plans for mind, body, and habits',
          'Expert-led courses and community support',
          'Track your progress and celebrate milestones'
        ],
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
        securityTip: '🔒 Security Tip',
        securityTipText: 'Always use a strong, unique password and enable two-factor authentication when possible.',
        errors: {
          emailRequired: 'Email is required',
          emailInvalid: 'Please enter a valid email address',
          userNotFound: 'No account found with this email address',
          tooManyRequests: 'Too many reset attempts. Please try again later.',
          generic: 'Failed to send password reset email. Please try again.'
        }
      },
      passwordResetSent: {
        title: 'Check Your Email',
        instruction: 'We\'ve sent a password reset link to ',
        nextSteps: 'Next steps:',
        steps: [
          'Check your inbox for an email from Growthify',
          'Click the "Reset Password" link in the email',
          'Follow the instructions to set a new password'
        ],
        noEmail: 'Didn\'t receive the email? Check your spam folder or:',
        resendButton: 'Resend Reset Link',
        resendAvailable: 'Resend available in',
        backToLogin: 'Back to Sign In',
        needHelp: 'Need help?',
        contactSupport: 'Contact our support team'
      },
      resetPassword: {
        title: 'Reset Your Password',
        newPassword: 'New Password',
        confirmPassword: 'Confirm Password',
        submitButton: 'Reset Password',
        backToLogin: 'Back to Sign In',
        passwordTips: 'Password Tips:',
        tips: [
          'Use at least 8 characters',
          'Include uppercase and lowercase letters',
          'Add numbers and special characters (!@#$%^&*)',
          'Avoid using personal information or common words',
          'Don\'t reuse passwords from other sites'
        ],
        passwordStrength: {
          veryWeak: 'Very weak',
          weak: 'Weak',
          fair: 'Fair',
          good: 'Good',
          strong: 'Strong',
          veryStrong: 'Very strong'
        },
        success: {
          title: 'Password Reset Successful',
          message: 'Your password has been successfully reset. You can now sign in with your new password.',
          redirecting: 'Redirecting you to the login page...',
          loginButton: 'Sign In Now'
        },
        errors: {
          passwordRequired: 'Password is required',
          passwordTooShort: 'Password must be at least 8 characters',
          passwordsDoNotMatch: 'Passwords do not match',
          weakPassword: 'Please use a stronger password with a mix of letters, numbers, and symbols',
          invalidLink: 'This password reset link is invalid or has expired. Please request a new one.',
          generic: 'Failed to reset password. Please try again or request a new reset link.'
        }
      },
      emailVerification: {
        title: 'Verify Your Email',
        instruction: 'We\'ve sent a verification link to ',
        checkInbox: 'Please check your email and click the verification link.',
        alreadyVerified: 'I\'ve Already Verified',
        resendButton: 'Resend Verification Email',
        resendAvailable: 'Resend in',
        backToLogin: 'Return to Login',
        needHelp: 'Need help?',
        contactSupport: 'Contact Support',
        errors: {
          generic: 'Failed to verify email. Please try again.',
          notVerified: 'Email not yet verified. Please check your email inbox.'
        },
        success: 'Email verification sent successfully.'
      },
      completeProfile: {
        title: 'Complete Your Profile',
        subtitle: 'Let\'s set up your profile to personalize your growth journey',
        steps: {
          basics: 'Basics',
          personal: 'Personal',
          interests: 'Interests',
          goals: 'Goals'
        },
        basics: {
          title: 'Basic Information',
          profilePicture: 'Profile Picture',
          addPicture: 'Add a profile picture (optional)',
          pictureFormat: 'JPG, PNG or GIF, max 5MB',
          fullName: 'Full Name',
          emailAddress: 'Email Address',
          emailNonEditable: 'Email address cannot be changed',
          phoneNumber: 'Phone Number',
          phoneFormat: 'Include country code (e.g., +1 for US)'
        },
        personal: {
          title: 'Personal Information',
          birthDate: 'Birth Date',
          gender: 'Gender',
          genderOptions: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
          occupation: 'Occupation',
          occupationPlaceholder: 'e.g., Software Engineer, Teacher, Student...',
          location: 'Location',
          locationPlaceholder: 'City, Country'
        },
        interests: {
          title: 'Your Interests',
          subtitle: 'Select areas that interest you. This helps us personalize your growth journey.'
        },
        goals: {
          title: 'Set Your Growth Goals',
          subtitle: 'Define the goals you want to achieve. These help us customize your dashboard and recommendations.',
          fitnessGoal: 'Fitness Goal',
          fitnessOptions: [
            'Select a fitness goal',
            'Build Muscle',
            'Lose Weight',
            'Increase Endurance',
            'Improve Flexibility',
            'Maintain Current Fitness'
          ],
          weightGoal: 'Weight Goal',
          weightOptions: [
            'Select a weight goal',
            'Lose Weight',
            'Gain Weight',
            'Maintain Current Weight'
          ],
          mindsetGoal: 'Mindset Goal',
          mindsetOptions: [
            'Select a mindset goal',
            'Reduce Stress',
            'Increase Focus',
            'Improve Sleep',
            'Build Confidence',
            'Overcome Negative Thinking'
          ],
          habitGoal: 'Habit Goal',
          habitOptions: [
            'Select a habit goal',
            'Build a Morning Routine',
            'Break a Bad Habit',
            'Exercise Consistently',
            'Develop Healthy Eating Habits',
            'Reduce Screen Time',
            'Daily Meditation Practice'
          ]
        },
        buttons: {
          previous: 'Previous',
          next: 'Next',
          completeSetup: 'Complete Setup',
          processing: 'Processing...'
        },
        helperText: 'You can always update your profile information later in your account settings.',
        errors: {
          nameRequired: 'Name is required',
          phoneRequired: 'Phone number is required',
          phoneInvalid: 'Please enter a valid phone number',
          birthDateRequired: 'Birth date is required',
          genderRequired: 'Please select your gender',
          interestsRequired: 'Please select at least one interest',
          goalsRequired: 'Please set at least one goal',
          generic: 'Failed to update profile. Please try again.'
        }
      },
      phoneAuth: {
        title: 'Sign in with Phone',
        verifyTitle: 'Verify Phone Number',
        phoneLabel: 'Phone Number',
        phonePlaceholder: '+1 234 567 8900',
        phoneNote: 'Include country code (e.g., +1 for US, +44 for UK)',
        sendCodeButton: 'Send Verification Code',
        sendingCode: 'Sending Code...',
        codeSent: 'We\'ve sent a 6-digit verification code to',
        codeLabel: 'Verification Code',
        changePhone: 'Change Phone Number',
        resendCode: 'Resend Code',
        resendIn: 'Resend in',
        verifyButton: 'Verify and Sign In',
        verifying: 'Verifying...',
        errors: {
          phoneRequired: 'Please enter a valid phone number',
          codeRequired: 'Please enter the 6-digit verification code',
          invalidCode: 'Invalid verification code. Please try again.',
          tooManyRequests: 'Too many attempts. Please try again later.',
          generic: 'Failed to verify. Please try again.'
        }
      }
    },
    id: {
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
          emailRequired: 'Email wajib diisi',
          emailInvalid: 'Masukkan alamat email yang valid',
          passwordRequired: 'Kata sandi wajib diisi',
          passwordTooShort: 'Kata sandi minimal 8 karakter',
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
        whyJoin: '🚀 Mengapa bergabung dengan Growthify?',
        benefits: [
          'Rencana pertumbuhan personal untuk pikiran, tubuh, dan kebiasaan',
          'Kursus yang dipimpin ahli dan dukungan komunitas',
          'Lacak kemajuan Anda dan rayakan pencapaian'
        ],
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
        securityTip: '🔒 Tips Keamanan',
        securityTipText: 'Selalu gunakan kata sandi yang kuat dan unik serta aktifkan otentikasi dua faktor jika memungkinkan.',
        errors: {
          emailRequired: 'Email wajib diisi',
          emailInvalid: 'Masukkan alamat email yang valid',
          userNotFound: 'Tidak ada akun dengan alamat email ini',
          tooManyRequests: 'Terlalu banyak percobaan reset. Silakan coba lagi nanti.',
          generic: 'Gagal mengirim email reset kata sandi. Silakan coba lagi.'
        }
      },
      passwordResetSent: {
        title: 'Periksa Email Anda',
        instruction: 'Kami telah mengirim tautan reset kata sandi ke ',
        nextSteps: 'Langkah selanjutnya:',
        steps: [
          'Periksa kotak masuk Anda untuk email dari Growthify',
          'Klik tautan "Reset Kata Sandi" di email',
          'Ikuti petunjuk untuk mengatur kata sandi baru'
        ],
        noEmail: 'Tidak menerima email? Periksa folder spam atau:',
        resendButton: 'Kirim Ulang Tautan Reset',
        resendAvailable: 'Kirim ulang tersedia dalam',
        backToLogin: 'Kembali ke Masuk',
        needHelp: 'Butuh bantuan?',
        contactSupport: 'Hubungi tim dukungan kami'
      },
      resetPassword: {
        title: 'Reset Kata Sandi Anda',
        newPassword: 'Kata Sandi Baru',
        confirmPassword: 'Konfirmasi Kata Sandi',
        submitButton: 'Reset Kata Sandi',
        backToLogin: 'Kembali ke Masuk',
        passwordTips: 'Tips Kata Sandi:',
        tips: [
          'Gunakan minimal 8 karakter',
          'Sertakan huruf besar dan kecil',
          'Tambahkan angka dan karakter khusus (!@#$%^&*)',
          'Hindari menggunakan informasi pribadi atau kata-kata umum',
          'Jangan gunakan kembali kata sandi dari situs lain'
        ],
        passwordStrength: {
          veryWeak: 'Sangat lemah',
          weak: 'Lemah',
          fair: 'Cukup',
          good: 'Baik',
          strong: 'Kuat',
          veryStrong: 'Sangat kuat'
        },
        success: {
          title: 'Reset Kata Sandi Berhasil',
          message: 'Kata sandi Anda telah berhasil direset. Anda sekarang dapat masuk dengan kata sandi baru Anda.',
          redirecting: 'Mengalihkan Anda ke halaman login...',
          loginButton: 'Masuk Sekarang'
        },
        errors: {
          passwordRequired: 'Kata sandi wajib diisi',
          passwordTooShort: 'Kata sandi minimal 8 karakter',
          passwordsDoNotMatch: 'Kata sandi tidak cocok',
          weakPassword: 'Silakan gunakan kata sandi yang lebih kuat dengan kombinasi huruf, angka, dan simbol',
          invalidLink: 'Tautan reset kata sandi ini tidak valid atau telah kedaluwarsa. Silakan minta yang baru.',
          generic: 'Gagal mereset kata sandi. Silakan coba lagi atau minta tautan reset baru.'
        }
      },
      emailVerification: {
        title: 'Verifikasi Email Anda',
        instruction: 'Kami telah mengirim tautan verifikasi ke ',
        checkInbox: 'Silakan periksa email Anda dan klik tautan verifikasi.',
        alreadyVerified: 'Saya Sudah Melakukan Verifikasi',
        resendButton: 'Kirim Ulang Email Verifikasi',
        resendAvailable: 'Kirim ulang dalam',
        backToLogin: 'Kembali ke Masuk',
        needHelp: 'Butuh bantuan?',
        contactSupport: 'Hubungi Dukungan',
        errors: {
          generic: 'Gagal memverifikasi email. Silakan coba lagi.',
          notVerified: 'Email belum diverifikasi. Silakan periksa kotak masuk email Anda.'
        },
        success: 'Email verifikasi berhasil dikirim.'
      },
      completeProfile: {
        title: 'Lengkapi Profil Anda',
        subtitle: 'Mari siapkan profil Anda untuk mempersonalisasi perjalanan pertumbuhan Anda',
        steps: {
          basics: 'Dasar',
          personal: 'Pribadi',
          interests: 'Minat',
          goals: 'Tujuan'
        },
        basics: {
          title: 'Informasi Dasar',
          profilePicture: 'Foto Profil',
          addPicture: 'Tambahkan foto profil (opsional)',
          pictureFormat: 'JPG, PNG atau GIF, maks 5MB',
          fullName: 'Nama Lengkap',
          emailAddress: 'Alamat Email',
          emailNonEditable: 'Alamat email tidak dapat diubah',
          phoneNumber: 'Nomor Telepon',
          phoneFormat: 'Sertakan kode negara (mis., +62 untuk Indonesia)'
        },
        personal: {
          title: 'Informasi Pribadi',
          birthDate: 'Tanggal Lahir',
          gender: 'Jenis Kelamin',
          genderOptions: ['Laki-laki', 'Perempuan', 'Non-biner', 'Lebih suka tidak memberi tahu'],
          occupation: 'Pekerjaan',
          occupationPlaceholder: 'mis., Insinyur Perangkat Lunak, Guru, Mahasiswa...',
          location: 'Lokasi',
          locationPlaceholder: 'Kota, Negara'
        },
        interests: {
          title: 'Minat Anda',
          subtitle: 'Pilih bidang yang menarik bagi Anda. Ini membantu kami mempersonalisasi perjalanan pertumbuhan Anda.'
        },
        goals: {
          title: 'Tetapkan Tujuan Pertumbuhan Anda',
          subtitle: 'Tentukan tujuan yang ingin Anda capai. Ini membantu kami menyesuaikan dasbor dan rekomendasi Anda.',
          fitnessGoal: 'Tujuan Kebugaran',
          fitnessOptions: [
            'Pilih tujuan kebugaran',
            'Membangun Otot',
            'Menurunkan Berat Badan',
            'Meningkatkan Daya Tahan',
            'Meningkatkan Fleksibilitas',
            'Mempertahankan Kebugaran Saat Ini'
          ],
          weightGoal: 'Tujuan Berat Badan',
          weightOptions: [
            'Pilih tujuan berat badan',
            'Menurunkan Berat Badan',
            'Menambah Berat Badan',
            'Mempertahankan Berat Badan Saat Ini'
          ],
          mindsetGoal: 'Tujuan Pola Pikir',
          mindsetOptions: [
            'Pilih tujuan pola pikir',
            'Mengurangi Stres',
            'Meningkatkan Fokus',
            'Meningkatkan Kualitas Tidur',
            'Membangun Kepercayaan Diri',
            'Mengatasi Pemikiran Negatif'
          ],
          habitGoal: 'Tujuan Kebiasaan',
          habitOptions: [
            'Pilih tujuan kebiasaan',
            'Membangun Rutinitas Pagi',
            'Menghilangkan Kebiasaan Buruk',
            'Berolahraga Secara Konsisten',
            'Mengembangkan Kebiasaan Makan Sehat',
            'Mengurangi Waktu di Depan Layar',
            'Praktik Meditasi Harian'
          ]
        },
        buttons: {
          previous: 'Sebelumnya',
          next: 'Selanjutnya',
          completeSetup: 'Selesaikan Pengaturan',
          processing: 'Memproses...'
        },
        helperText: 'Anda selalu dapat memperbarui informasi profil Anda nanti di pengaturan akun.',
        errors: {
          nameRequired: 'Nama wajib diisi',
          phoneRequired: 'Nomor telepon wajib diisi',
          phoneInvalid: 'Masukkan nomor telepon yang valid',
          birthDateRequired: 'Tanggal lahir wajib diisi',
          genderRequired: 'Pilih jenis kelamin Anda',
          interestsRequired: 'Pilih minimal satu minat',
          goalsRequired: 'Tetapkan minimal satu tujuan',
          generic: 'Gagal memperbarui profil. Silakan coba lagi.'
        }
      },
      phoneAuth: {
        title: 'Masuk dengan Telepon',
        verifyTitle: 'Verifikasi Nomor Telepon',
        phoneLabel: 'Nomor Telepon',
        phonePlaceholder: '+62 812 3456 7890',
        phoneNote: 'Sertakan kode negara (mis., +62 untuk Indonesia, +1 untuk AS)',
        sendCodeButton: 'Kirim Kode Verifikasi',
        sendingCode: 'Mengirim Kode...',
        codeSent: 'Kami telah mengirim kode verifikasi 6 digit ke',
        codeLabel: 'Kode Verifikasi',
        changePhone: 'Ubah Nomor Telepon',
        resendCode: 'Kirim Ulang Kode',
        resendIn: 'Kirim ulang dalam',
        verifyButton: 'Verifikasi dan Masuk',
        verifying: 'Memverifikasi...',
        errors: {
          phoneRequired: 'Masukkan nomor telepon yang valid',
          codeRequired: 'Masukkan kode verifikasi 6 digit',
          invalidCode: 'Kode verifikasi tidak valid. Silakan coba lagi.',
          tooManyRequests: 'Terlalu banyak percobaan. Silakan coba lagi nanti.',
          generic: 'Gagal memverifikasi. Silakan coba lagi.'
        }
      }
    }
  };
  
  export default authTranslations;