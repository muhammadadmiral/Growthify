// src/pages/PasswordResetSent.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function PasswordResetSent() {
  const location = useLocation();
  const { isDarkMode } = useDarkMode();
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  // Get email from location state or default to a generic message
  const email = location.state?.email || 'your email';
  
  // Add obfuscation to the email for privacy
  const obfuscateEmail = (email) => {
    if (!email || email === 'your email') return 'your email';
    
    const parts = email.split('@');
    if (parts.length !== 2) return email;
    
    const [name, domain] = parts;
    const obfuscatedName = name.length <= 3 
      ? name.charAt(0) + '***'
      : name.charAt(0) + '***' + name.charAt(name.length - 1);
    
    return `${obfuscatedName}@${domain}`;
  };
  
  // Handle countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);
  
  // If we don't have an email in the state, redirect to forgot password
  if (!location.state?.email) {
    return <Navigate to="/forgot-password" replace />;
  }
  
  // Handle resend
  const handleResend = () => {
    // In a real implementation, this would call the password reset API again
    setCountdown(60);
    setCanResend(false);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-neutral-50'} flex flex-col justify-center py-12 sm:px-6 lg:px-8`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/">
          <h2 className="text-center text-3xl font-extrabold font-heading bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
            Growthify
          </h2>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-8 px-4 shadow-elegant sm:rounded-lg sm:px-10 text-center`}>
          {/* Email icon */}
          <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-primary-100">
            <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
            Check Your Email
          </h2>
          
          <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
            We've sent a password reset link to <strong>{obfuscateEmail(email)}</strong>
          </p>
          
          <div className={`p-4 mb-6 text-left rounded-md ${
            isDarkMode ? 'bg-gray-700' : 'bg-neutral-50'
          }`}>
            <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
              Next steps:
            </h3>
            <ol className={`list-decimal list-inside text-sm space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
              <li>Check your inbox for an email from Growthify</li>
              <li>Click the "Reset Password" link in the email</li>
              <li>Follow the instructions to set a new password</li>
            </ol>
          </div>
          
          <div className="space-y-4">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
              Didn't receive the email? Check your spam folder or:
            </p>
            
            <button
              onClick={handleResend}
              disabled={!canResend}
              className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                canResend 
                  ? isDarkMode 
                    ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
              }`}
            >
              {canResend ? 'Resend Reset Link' : `Resend available in ${countdown}s`}
            </button>
            
            <div className="pt-4 border-t border-gray-200">
              <Link 
                to="/login" 
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'
                }`}
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Need help box */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-200'
        } p-4 rounded-lg shadow-sm border text-center`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
            Need help? <Link to="/contact" className={`font-medium ${
              isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'
            }`}>Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  );
}