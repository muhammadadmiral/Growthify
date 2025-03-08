// src/pages/EmailVerification.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { 
  sendEmailVerification, 
  reload, 
  checkActionCode 
} from 'firebase/auth';

export default function EmailVerification() {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    // Redirect jika tidak ada user
    if (!user) {
      navigate('/login');
      return;
    }

    // Timer untuk countdown resend
    const timer = countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000);
    
    // Reset countdown ketika mencapai 0
    if (countdown === 0) {
      setCanResend(true);
    }

    return () => clearTimeout(timer);
  }, [countdown, navigate, user]);

  const handleResendVerification = async () => {
    if (!user) return;

    try {
      await sendEmailVerification(user);
      setSuccess('Email verifikasi baru telah dikirim');
      setError('');
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      setError(error.message || 'Gagal mengirim ulang email verifikasi');
    }
  };

  const handleVerificationCheck = async () => {
    if (!user) return;

    try {
      // Reload user untuk memperbarui status verifikasi
      await reload(user);
      
      if (user.emailVerified) {
        // Redirect ke halaman complete profile
        navigate('/complete-profile');
      } else {
        setError('Email belum diverifikasi. Silakan periksa email Anda.');
      }
    } catch (error) {
      setError('Gagal memeriksa verifikasi email');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-neutral-900">
          Verifikasi Email
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Kami telah mengirim email verifikasi ke <strong>{user.email}</strong>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-elegant sm:rounded-lg sm:px-10">
          {/* Pesan Error */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Pesan Sukses */}
          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <p className="text-neutral-700 text-sm text-center">
              Silakan periksa email Anda dan klik tautan verifikasi.
            </p>

            <div className="flex flex-col space-y-3">
              <button
                onClick={handleVerificationCheck}
                className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                Saya Sudah Verifikasi
              </button>

              <button
                onClick={handleResendVerification}
                disabled={!canResend}
                className={`
                  w-full py-2 rounded-md transition-colors
                  ${canResend 
                    ? 'bg-neutral-600 text-white hover:bg-neutral-700' 
                    : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'}
                `}
              >
                {canResend 
                  ? 'Kirim Ulang Email Verifikasi' 
                  : `Kirim Ulang (${countdown})`}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md text-center">
        <p className="text-sm text-neutral-600">
          Tidak menerima email?{' '}
          <Link 
            to="/contact" 
            className="text-primary-600 hover:text-primary-500"
          >
            Hubungi Dukungan
          </Link>
        </p>
      </div>
    </div>
  );
}