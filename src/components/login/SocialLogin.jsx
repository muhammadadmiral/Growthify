// src/components/login/SocialLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithGoogle, 
  signInWithFacebook,
  signInWithApple,
  initiatePhoneAuth
} from '../../config/firebase';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function SocialLogin({ onPhoneAuthClick }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      const user = await signInWithGoogle();
      // Redirect to complete profile page if profile not completed
      navigate('/dashboard', { 
        state: { 
          email: user.email, 
          name: user.displayName 
        } 
      });
    } catch (error) {
      console.error('Google sign-up error:', error);
      // Handle error (optional: show toast or error message)
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignUp = async () => {
    setIsLoading(true);
    try {
      const user = await signInWithFacebook();
      // Redirect to complete profile page
      navigate('/dashboard', { 
        state: { 
          email: user.email, 
          name: user.displayName 
        } 
      });
    } catch (error) {
      console.error('Facebook sign-up error:', error);
      // Handle error (optional: show toast or error message)
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignUp = async () => {
    setIsLoading(true);
    try {
      const user = await signInWithApple();
      // Redirect to complete profile page
      navigate('/dashboard', { 
        state: { 
          email: user.email, 
          name: user.displayName 
        } 
      });
    } catch (error) {
      console.error('Apple sign-up error:', error);
      // Handle error (optional: show toast or error message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-4 gap-3">
        {/* Google button */}
        <div>
          <button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className={`w-full inline-flex justify-center py-2 px-4 border ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-700 hover:bg-gray-600' 
                : 'border-neutral-300 bg-white hover:bg-neutral-50'
            } rounded-md shadow-sm text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-neutral-700'
            } transition-colors duration-150 disabled:opacity-50`}
            aria-label="Sign up with Google"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.545 12.151L12.545 12.151V15.255L18.6 15.255C18.24 16.375 17.505 17.251 16.44 17.865C15.75 18.265 14.865 18.52 13.95 18.62C13.365 18.69 12.765 18.715 12.165 18.675C10.875 18.57 9.63 18.12 8.595 17.385C8.1 17.055 7.65 16.665 7.245 16.215C6.195 15.06 5.55 13.575 5.43 12C5.39 11.46 5.42 10.92 5.52 10.395C5.805 8.775 6.66 7.29 7.95 6.27C8.835 5.58 9.87 5.13 10.98 4.95C11.835 4.815 12.72 4.845 13.56 5.055C14.325 5.25 15.03 5.595 15.66 6.06C15.93 6.27 16.185 6.495 16.425 6.735C16.605 6.915 16.605 7.215 16.425 7.395L14.58 9.24C14.4 9.42 14.115 9.435 13.92 9.27C13.71 9.105 13.485 8.955 13.245 8.835C12.33 8.4 11.175 8.4 10.245 8.805C9.69 9.03 9.21 9.39 8.865 9.87C8.34 10.605 8.175 11.52 8.4 12.375C8.58 13.035 8.985 13.62 9.54 14.01C10.095 14.415 10.77 14.61 11.46 14.595C12.045 14.58 12.615 14.4 13.095 14.07C13.485 13.8 13.785 13.425 13.965 12.99C14.04 12.78 14.25 12.645 14.475 12.66H14.565C15.225 12.66 15.885 12.66 16.545 12.66L16.62 12.645C16.845 12.63 17.025 12.81 17.025 13.035C17.025 13.035 17.025 13.05 17.025 13.05C16.905 12.75 16.035 12.585 12.545 12.151ZM12 5.25C13.085 5.25 14.16 5.505 15.135 6C15.615 6.225 16.065 6.51 16.485 6.84L16.59 6.93L14.955 8.565L14.85 8.49C14.55 8.265 14.235 8.07 13.905 7.905C13.29 7.605 12.615 7.455 11.94 7.455C11.25 7.455 10.575 7.62 9.975 7.92C9.36 8.235 8.82 8.7 8.415 9.27C8.04 9.825 7.815 10.464 7.749 11.133L7.74 11.25C7.74 12.045 7.995 12.825 8.475 13.455C8.895 14.01 9.465 14.43 10.125 14.67C10.71 14.865 11.325 14.91 11.94 14.805C12.555 14.7 13.125 14.43 13.575 14.01C13.65 13.935 13.695 13.875 13.77 13.8L13.8 13.77C13.83 13.74 13.845 13.695 13.875 13.665C13.92 13.59 13.965 13.5 14.01 13.425L14.145 13.185H9.945C9.525 13.185 9.18 12.84 9.18 12.42C9.18 12 9.525 11.655 9.945 11.655H15.78C16.2 11.655 16.545 12 16.545 12.42V12.645C16.545 13.38 16.365 14.1 16.035 14.76C15.585 15.75 14.82 16.575 13.845 17.115C12.72 17.73 11.43 17.97 10.155 17.805C9.075 17.655 8.04 17.235 7.17 16.605C6.15 15.855 5.37 14.805 4.95 13.605C4.605 12.615 4.545 11.55 4.755 10.53C4.98 9.36 5.535 8.28 6.345 7.41C7.1 6.6 8.04 5.985 9.09 5.625C10.02 5.325 11.01 5.205 12 5.25Z" />
            </svg>
          </button>
        </div>

        {/* Facebook button */}
        <div>
          <button
            onClick={handleFacebookSignUp}
            disabled={isLoading}
            className={`w-full inline-flex justify-center py-2 px-4 border ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-700 hover:bg-gray-600' 
                : 'border-neutral-300 bg-white hover:bg-neutral-50'
            } rounded-md shadow-sm text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-neutral-700'
            } transition-colors duration-150 disabled:opacity-50`}
            aria-label="Sign up with Facebook"
          >
            <svg className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </button>
        </div>

        {/* Apple button */}
        <div>
          <button
            onClick={handleAppleSignUp}
            disabled={isLoading}
            className={`w-full inline-flex justify-center py-2 px-4 border ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-700 hover:bg-gray-600' 
                : 'border-neutral-300 bg-white hover:bg-neutral-50'
            } rounded-md shadow-sm text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-neutral-700'
            } transition-colors duration-150 disabled:opacity-50`}
            aria-label="Sign up with Apple"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.913 1.183-4.962 3.007-2.12 3.675-.54 9.127 1.52 12.11 1 1.46 2.2 3.085 3.77 3.035 1.52-.053 2.09-.974 3.91-.974 1.81 0 2.35.974 3.93.947 1.63-.026 2.66-1.47 3.65-2.947 1.16-1.67 1.63-3.293 1.65-3.37-.04-.014-3.15-1.204-3.18-4.783-.02-2.993 2.45-4.42 2.56-4.5-1.4-2.06-3.59-2.29-4.36-2.34-1.97-.15-3.62 1.07-4.56 1.07z" />
              <path d="M15.62 3.655c-.833 1.04-2.178 1.846-3.497 1.737-.177-1.424.518-2.905 1.327-3.83.833-1.023 2.243-1.777 3.397-1.82.157 1.467-.431 2.87-1.227 3.914z" />
            </svg>
          </button>
        </div>

        {/* Phone button */}
        <div>
          <button
            onClick={onPhoneAuthClick}
            disabled={isLoading}
            className={`w-full inline-flex justify-center py-2 px-4 border ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-700 hover:bg-gray-600' 
                : 'border-neutral-300 bg-white hover:bg-neutral-50'
            } rounded-md shadow-sm text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-neutral-700'
            } transition-colors duration-150 disabled:opacity-50`}
            aria-label="Sign up with Phone"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}