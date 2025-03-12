// src/pages/auth/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginWithEmailAndPassword } from '../../config/firebase';
import InputForm from '../../components/login/InputForm';
import SubmitButton from '../../components/login/SubmitButton';
import SocialLogin from '../../components/login/SocialLogin';
import PhoneAuthModal from '../../components/login/PhoneAuthModal';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useTranslations } from '../../hooks/useTranslations';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    } else if (formData.password.length < 8) {
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

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Open phone auth modal
  const handlePhoneAuth = () => {
    setIsPhoneModalOpen(true);
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
                  type={showPassword ? "text" : "password"}
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
                    pr-10
                  `}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
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

            {/* Social Login Component with Phone Auth */}
            <SocialLogin onPhoneAuthClick={handlePhoneAuth} />
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

      {/* Hidden reCAPTCHA container for phone auth */}
      <div id="recaptcha-container"></div>
      
      {/* Phone Authentication Modal */}
      <PhoneAuthModal 
        isOpen={isPhoneModalOpen} 
        onClose={() => setIsPhoneModalOpen(false)} 
      />
    </div>
  );
}