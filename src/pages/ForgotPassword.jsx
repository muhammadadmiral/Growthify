// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetWithRedirect } from '../config/firebase';
import InputForm from '../components/login/InputForm';
import SubmitButton from '../components/login/SubmitButton';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useTranslations } from '../hooks/useTranslations';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslations();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status
    setError('');
    setSuccess('');
    
    // Validasi email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // The URL where user will be redirected after clicking the reset link
      const redirectUrl = `${window.location.origin}/reset-password`;
      
      await sendPasswordResetWithRedirect(email, redirectUrl);
      setSuccess('Password reset email sent. Check your inbox.');
      
      // Navigate to confirmation page
      navigate('/password-reset-sent', { state: { email } });
    } catch (error) {
      console.error('Password reset error:', error);
      
      // Handle error spesifik
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address');
          break;
        case 'auth/too-many-requests':
          setError('Too many reset attempts. Please try again later.');
          break;
        default:
          setError('Failed to send password reset email. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-neutral-50'} flex flex-col justify-center py-12 sm:px-6 lg:px-8`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/">
          <h2 className="text-center text-3xl font-extrabold font-heading bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
            Growthify
          </h2>
        </Link>
        <h2 className={`mt-6 text-center text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
          Reset your password
        </h2>
        <p className={`mt-2 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
          Enter your email to receive a password reset link
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-8 px-4 shadow-elegant sm:rounded-lg sm:px-10`}>
          {/* Success message */}
          {success && (
            <div className={`mb-4 ${
              isDarkMode ? 'bg-green-900/20 border-green-800 text-green-300' : 'bg-green-50 border-green-200 text-green-700'
            } px-4 py-3 rounded-md text-sm border`}>
              {success}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className={`mb-4 ${
              isDarkMode ? 'bg-red-900/20 border-red-800 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
            } px-4 py-3 rounded-md text-sm border`}>
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                Email address
                <span className="text-accent-500 ml-1">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`
                    appearance-none block w-full px-3 py-2 border 
                    ${error 
                      ? isDarkMode ? 'border-red-700 bg-red-900/10' : 'border-red-300' 
                      : isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-neutral-300'} 
                    rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none ${isDarkMode ? 'focus:ring-primary-500 focus:border-primary-500' : 'focus:ring-primary-500 focus:border-primary-500'}
                    transition duration-150 ease-in-out sm:text-sm
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  `}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full flex justify-center py-2 px-4 border border-transparent 
                  rounded-md shadow-sm text-sm font-medium text-white 
                  ${isLoading 
                    ? isDarkMode ? 'bg-primary-700' : 'bg-primary-400' 
                    : isDarkMode ? 'bg-primary-600 hover:bg-primary-700' : 'bg-primary-600 hover:bg-primary-700'}
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                  transition-colors duration-150 ease-in-out
                `}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : 'Send Reset Link'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
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
      
      {/* Security Tip */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-premium from-primary-50 to-secondary-50 border-primary-100'
        } p-4 rounded-lg shadow-sm border`}>
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-neutral-800'}`}>🔒 Security Tip</h3>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-700'} mt-1`}>
            "Always use a strong, unique password and enable two-factor authentication when possible."
          </p>
        </div>
      </div>
    </div>
  );
}