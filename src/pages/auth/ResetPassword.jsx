// src/pages/ResetPassword.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { verifyPasswordResetCode, confirmPasswordReset } from '../../config/firebase';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oobCode, setOobCode] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract oobCode (action code) from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('oobCode');
    
    if (!code) {
      setError('Invalid password reset link. Please request a new one.');
      setIsVerifying(false);
      return;
    }
    
    setOobCode(code);
    
    // Verify the reset code
    const verifyCode = async () => {
      setIsVerifying(true);
      try {
        const email = await verifyPasswordResetCode(code);
        setEmail(email);
        setIsVerifying(false);
      } catch (error) {
        console.error('Error verifying reset code:', error);
        setError('This password reset link is invalid or has expired. Please request a new one.');
        setIsVerifying(false);
      }
    };
    
    verifyCode();
  }, [location]);

  // Check password strength
  const checkPasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error
    setError('');
    
    // Validate password
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    // Validate password strength
    if (passwordStrength < 3) {
      setError('Please use a stronger password with a mix of letters, numbers, and symbols');
      return;
    }
    
    // Match passwords
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await confirmPasswordReset(oobCode, password);
      setSuccess(true);
      
      // Auto redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Failed to reset password. Please try again or request a new reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isVerifying) {
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
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                Verifying your reset link...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
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
            <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-green-100">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
              Password Reset Successful
            </h2>
            
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
            
            <div className="space-y-4">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                Redirecting you to the login page...
              </p>
              
              <Link 
                to="/login" 
                className={`block w-full py-2 px-4 rounded-md text-center text-sm font-medium ${
                  isDarkMode 
                    ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                } transition-colors`}
              >
                Sign In Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-neutral-50'} flex flex-col justify-center py-12 sm:px-6 lg:px-8`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/">
          <h2 className="text-center text-3xl font-extrabold font-heading bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
            Growthify
          </h2>
        </Link>
        <h2 className={`mt-6 text-center text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
          Reset Your Password
        </h2>
        {email && (
          <p className={`mt-2 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
            Create a new password for <span className="font-medium">{email}</span>
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-8 px-4 shadow-elegant sm:rounded-lg sm:px-10`}>
          {error && (
            <div className={`mb-4 ${
              isDarkMode ? 'bg-red-900/20 border-red-800 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
            } px-4 py-3 rounded-md text-sm border`}>
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}
              >
                New Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`
                    appearance-none block w-full px-3 py-2 border 
                    ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-neutral-300 bg-white text-neutral-900'} 
                    rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:ring-primary-500 focus:border-primary-500
                    transition duration-150 ease-in-out sm:text-sm
                  `}
                  required
                />
                
                {/* Password strength meter */}
                {password && (
                  <div className="mt-2">
                    <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`flex flex-col justify-center rounded-full ${
                          passwordStrength === 0 ? 'bg-red-500' :
                          passwordStrength === 1 ? 'bg-red-500' :
                          passwordStrength === 2 ? 'bg-yellow-500' :
                          passwordStrength === 3 ? 'bg-yellow-500' :
                          passwordStrength === 4 ? 'bg-green-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${passwordStrength * 20}%` }}
                      ></div>
                    </div>
                    <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                      {passwordStrength === 0 && 'Very weak'}
                      {passwordStrength === 1 && 'Weak'}
                      {passwordStrength === 2 && 'Fair'}
                      {passwordStrength === 3 && 'Good'}
                      {passwordStrength === 4 && 'Strong'}
                      {passwordStrength === 5 && 'Very strong'}
                    </p>
                  </div>
                )}
                
                <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                  Must be at least 8 characters with a mix of letters, numbers, and symbols
                </p>
              </div>
            </div>

            <div>
              <label 
                htmlFor="confirmPassword" 
                className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`
                    appearance-none block w-full px-3 py-2 border 
                    ${
                      confirmPassword && password !== confirmPassword
                        ? isDarkMode ? 'border-red-700 bg-red-900/10' : 'border-red-300 bg-red-50'
                        : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-neutral-300 bg-white text-neutral-900'
                    } 
                    rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:ring-primary-500 focus:border-primary-500
                    transition duration-150 ease-in-out sm:text-sm
                  `}
                  required
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className={`mt-1 text-xs ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>
                    Passwords do not match
                  </p>
                )}
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
                    Resetting Password...
                  </span>
                ) : 'Reset Password'}
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
      
      {/* Password Tips */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-200'
        } p-4 rounded-lg shadow-sm border`}>
          <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-neutral-800'}`}>
            Password Tips:
          </h3>
          <ul className={`list-disc list-inside text-xs space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
            <li>Use at least 8 characters</li>
            <li>Include uppercase and lowercase letters</li>
            <li>Add numbers and special characters (!@#$%^&*)</li>
            <li>Avoid using personal information or common words</li>
            <li>Don't reuse passwords from other sites</li>
          </ul>
        </div>
      </div>
    </div>
  );
}