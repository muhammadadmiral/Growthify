// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  loginWithEmailAndPassword, 
  signInWithGoogle, 
  signInWithFacebook,
} from '../config/firebase';
import InputForm from '../components/login/InputForm';
import SubmitButton from '../components/login/SubmitButton';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useTranslations } from '../hooks/useTranslations';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslations();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear specific field error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = t.auth.login.errors.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.auth.login.errors.emailInvalid;
    }
    
    if (!formData.password) {
      newErrors.password = t.auth.login.errors.passwordRequired;
    } else if (formData.password.length < 6) {
      newErrors.password = t.auth.login.errors.passwordTooShort;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset form-level errors
    setErrors({});
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Process login with Firebase
      await loginWithEmailAndPassword(
        formData.email, 
        formData.password
      );
      
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      
      // Handle specific errors from Firebase
      switch (error.code) {
        case 'auth/invalid-credential':
          setErrors({
            form: t.auth.login.errors.invalidCredentials
          });
          break;
        case 'auth/user-not-found':
          setErrors({
            form: t.auth.login.errors.userNotFound
          });
          break;
        case 'auth/wrong-password':
          setErrors({
            form: t.auth.login.errors.wrongPassword
          });
          break;
        default:
          setErrors({
            form: t.auth.login.errors.generic
          });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handlers for social logins
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign-in error:', error);
      setErrors({
        form: 'Google sign-in failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithFacebook();
      navigate('/dashboard');
    } catch (error) {
      console.error('Facebook sign-in error:', error);
      setErrors({
        form: 'Facebook sign-in failed. Please try again.'
      });
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
          {t.auth.login.title}
        </h2>
        <p className={`mt-2 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
          {t.auth.login.noAccount}{' '}
          <Link to="/register" className={`font-medium ${isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'}`}>
            {t.auth.login.registerLink}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`${isDarkMode ? 'bg-gray-800 shadow-xl' : 'bg-white shadow-elegant'} py-8 px-4 sm:rounded-lg sm:px-10`}>
          {/* General error message */}
          {errors.form && (
            <div className={`mb-4 ${isDarkMode ? 'bg-red-900/20 border-red-800 text-red-300' : 'bg-red-50 border-red-200 text-red-700'} px-4 py-3 rounded-md text-sm border`}>
              {errors.form}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                {t.auth.login.emailLabel}
                <span className="text-accent-500 ml-1">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`
                    appearance-none block w-full px-3 py-2 border 
                    ${errors.email 
                      ? isDarkMode ? 'border-red-700 bg-red-900/10' : 'border-red-300' 
                      : isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-neutral-300'} 
                    rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none ${isDarkMode ? 'focus:ring-primary-500 focus:border-primary-500' : 'focus:ring-primary-500 focus:border-primary-500'}
                    transition duration-150 ease-in-out sm:text-sm
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  `}
                />
                {errors.email && (
                  <p className={`mt-1 text-xs ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                {t.auth.login.passwordLabel}
                <span className="text-accent-500 ml-1">*</span>
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`
                    appearance-none block w-full px-3 py-2 border 
                    ${errors.password 
                      ? isDarkMode ? 'border-red-700 bg-red-900/10' : 'border-red-300' 
                      : isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-neutral-300'} 
                    rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none ${isDarkMode ? 'focus:ring-primary-500 focus:border-primary-500' : 'focus:ring-primary-500 focus:border-primary-500'}
                    transition duration-150 ease-in-out sm:text-sm
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  `}
                />
                {errors.password && (
                  <p className={`mt-1 text-xs ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className={`h-4 w-4 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-primary-500' : 'text-primary-600 border-neutral-300'} rounded focus:ring-primary-500`}
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe" className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                  {t.auth.login.rememberMe}
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className={`font-medium ${isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'}`}>
                  {t.auth.login.forgotPassword}
                </Link>
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
                    Processing...
                  </span>
                ) : (
                  t.auth.login.submitButton
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDarkMode ? 'border-gray-600' : 'border-neutral-300'}`} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-neutral-500'}`}>{t.auth.login.continueWith}</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className={`w-full inline-flex justify-center py-2 px-4 border ${isDarkMode ? 'border-gray-600 bg-gray-700 hover:bg-gray-600' : 'border-neutral-300 bg-white hover:bg-neutral-50'} rounded-md shadow-sm text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-neutral-700'} transition-colors duration-150 disabled:opacity-50`}
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545 12.151L12.545 12.151V15.255L18.6 15.255C18.24 16.375 17.505 17.251 16.44 17.865C15.75 18.265 14.865 18.52 13.95 18.62C13.365 18.69 12.765 18.715 12.165 18.675C10.875 18.57 9.63 18.12 8.595 17.385C8.1 17.055 7.65 16.665 7.245 16.215C6.195 15.06 5.55 13.575 5.43 12C5.39 11.46 5.42 10.92 5.52 10.395C5.805 8.775 6.66 7.29 7.95 6.27C8.835 5.58 9.87 5.13 10.98 4.95C11.835 4.815 12.72 4.845 13.56 5.055C14.325 5.25 15.03 5.595 15.66 6.06C15.93 6.27 16.185 6.495 16.425 6.735C16.605 6.915 16.605 7.215 16.425 7.395L14.58 9.24C14.4 9.42 14.115 9.435 13.92 9.27C13.71 9.105 13.485 8.955 13.245 8.835C12.33 8.4 11.175 8.4 10.245 8.805C9.69 9.03 9.21 9.39 8.865 9.87C8.34 10.605 8.175 11.52 8.4 12.375C8.58 13.035 8.985 13.62 9.54 14.01C10.095 14.415 10.77 14.61 11.46 14.595C12.045 14.58 12.615 14.4 13.095 14.07C13.485 13.8 13.785 13.425 13.965 12.99C14.04 12.78 14.25 12.645 14.475 12.66H14.565C15.225 12.66 15.885 12.66 16.545 12.66L16.62 12.645C16.845 12.63 17.025 12.81 17.025 13.035C17.025 13.035 17.025 13.05 17.025 13.05C16.905 12.75 16.035 12.585 12.545 12.151ZM12 5.25C13.085 5.25 14.16 5.505 15.135 6C15.615 6.225 16.065 6.51 16.485 6.84L16.59 6.93L14.955 8.565L14.85 8.49C14.55 8.265 14.235 8.07 13.905 7.905C13.29 7.605 12.615 7.455 11.94 7.455C11.25 7.455 10.575 7.62 9.975 7.92C9.36 8.235 8.82 8.7 8.415 9.27C8.04 9.825 7.815 10.464 7.749 11.133L7.74 11.25C7.74 12.045 7.995 12.825 8.475 13.455C8.895 14.01 9.465 14.43 10.125 14.67C10.71 14.865 11.325 14.91 11.94 14.805C12.555 14.7 13.125 14.43 13.575 14.01C13.65 13.935 13.695 13.875 13.77 13.8L13.8 13.77C13.83 13.74 13.845 13.695 13.875 13.665C13.92 13.59 13.965 13.5 14.01 13.425L14.145 13.185H9.945C9.525 13.185 9.18 12.84 9.18 12.42C9.18 12 9.525 11.655 9.945 11.655H15.78C16.2 11.655 16.545 12 16.545 12.42V12.645C16.545 13.38 16.365 14.1 16.035 14.76C15.585 15.75 14.82 16.575 13.845 17.115C12.72 17.73 11.43 17.97 10.155 17.805C9.075 17.655 8.04 17.235 7.17 16.605C6.15 15.855 5.37 14.805 4.95 13.605C4.605 12.615 4.545 11.55 4.755 10.53C4.98 9.36 5.535 8.28 6.345 7.41C7.1 6.6 8.04 5.985 9.09 5.625C10.02 5.325 11.01 5.205 12 5.25Z" />
                  </svg>
                </button>
              </div>
  
              <div>
                <button
                  onClick={handleFacebookSignIn}
                  disabled={isLoading}
                  className={`w-full inline-flex justify-center py-2 px-4 border ${isDarkMode ? 'border-gray-600 bg-gray-700 hover:bg-gray-600' : 'border-neutral-300 bg-white hover:bg-neutral-50'} rounded-md shadow-sm text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-neutral-700'} transition-colors duration-150 disabled:opacity-50`}
                >
                  <span className="sr-only">Sign in with Facebook</span>
                  <svg className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </button>
              </div>
              <div>
                <button
                  disabled={isLoading}
                  className={`w-full inline-flex justify-center py-2 px-4 border ${isDarkMode ? 'border-gray-600 bg-gray-700 hover:bg-gray-600' : 'border-neutral-300 bg-white hover:bg-neutral-50'} rounded-md shadow-sm text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-neutral-700'} transition-colors duration-150 disabled:opacity-50`}
                >
                  <span className="sr-only">Sign in with GitHub</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Growth Tip */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-700' : 'bg-gradient-premium from-primary-50 to-secondary-50 border-primary-100'} p-4 rounded-lg shadow-sm border`}>
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-neutral-800'}`}>💡 Growth Tip</h3>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-700'} mt-1`}>
            "Consistency is key to personal growth. Even small daily improvements compound over time."
          </p>
        </div>
      </div>
    </div>
  );
}