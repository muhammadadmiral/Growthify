// src/components/login/PhoneAuthModal.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPhoneVerificationCode, verifyPhoneCode } from '../../config/firebase';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function PhoneAuthModal({ isOpen, onClose }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [step, setStep] = useState(1); // 1: Phone input, 2: Code verification
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    // Reset on open
    if (isOpen) {
      setPhoneNumber('');
      setVerificationCode('');
      setVerificationId('');
      setStep(1);
      setError('');
      setCountdown(0);
    }
  }, [isOpen]);

  useEffect(() => {
    // Countdown for resend
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate phone number
      if (!phoneNumber.trim() || phoneNumber.length < 10) {
        throw new Error('Please enter a valid phone number');
      }

      // Format phone number if needed
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      
      // Send verification code
      const verificationId = await sendPhoneVerificationCode(formattedPhone);
      setVerificationId(verificationId);
      setStep(2);
      setCountdown(60); // 60 second countdown for resend
    } catch (error) {
      console.error('Error sending verification code:', error);
      setError(error.message || 'Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate verification code
      if (!verificationCode.trim() || verificationCode.length < 6) {
        throw new Error('Please enter the 6-digit verification code');
      }

      // Verify code
      const user = await verifyPhoneCode(verificationId, verificationCode);
      
      // Check if profile completed and navigate accordingly
      if (user) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setError(error.message || 'Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    
    setError('');
    setIsLoading(true);
    try {
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      const newVerificationId = await sendPhoneVerificationCode(formattedPhone);
      setVerificationId(newVerificationId);
      setCountdown(60);
    } catch (error) {
      console.error('Error resending verification code:', error);
      setError(error.message || 'Failed to resend verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 ${isDarkMode ? 'bg-black/70' : 'bg-black/50'} transition-opacity`} 
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className={`relative ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-neutral-900'
          } rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all`}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className={`absolute top-4 right-4 ${
              isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-neutral-500 hover:text-neutral-700'
            } transition-colors`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h2 className="text-xl font-bold mb-4 pr-8">
            {step === 1 ? 'Sign in with Phone' : 'Verify Phone Number'}
          </h2>
          
          {/* Error message */}
          {error && (
            <div className={`mb-4 ${
              isDarkMode ? 'bg-red-900/20 border-red-800 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
            } px-4 py-3 rounded-md text-sm border`}>
              {error}
            </div>
          )}
          
          {/* Step 1: Phone number input */}
          {step === 1 && (
            <form onSubmit={handleSendCode}>
              <div className="mb-4">
                <label 
                  htmlFor="phoneNumber" 
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-neutral-700'
                  }`}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 234 567 8900"
                  className={`w-full px-3 py-2 border rounded-md ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-neutral-300 text-neutral-900'
                  } focus:outline-none focus:ring-2 ${
                    isDarkMode ? 'focus:ring-primary-500' : 'focus:ring-primary-500'
                  } focus:border-transparent`}
                  required
                />
                <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                  Include country code (e.g., +1 for US, +44 for UK)
                </p>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  isLoading 
                    ? isDarkMode ? 'bg-primary-700' : 'bg-primary-400' 
                    : isDarkMode ? 'bg-primary-600 hover:bg-primary-700' : 'bg-primary-600 hover:bg-primary-700'
                } transition-colors`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Code...
                  </span>
                ) : 'Send Verification Code'}
              </button>
            </form>
          )}
          
          {/* Step 2: Verification code input */}
          {step === 2 && (
            <form onSubmit={handleVerifyCode}>
              <div className="mb-4">
                <p className={`mb-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
                  We've sent a 6-digit verification code to <strong>{phoneNumber}</strong>
                </p>
                
                <label 
                  htmlFor="verificationCode" 
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-neutral-700'
                  }`}
                >
                  Verification Code
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="123456"
                  maxLength={6}
                  className={`w-full px-3 py-2 border rounded-md ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-neutral-300 text-neutral-900'
                  } focus:outline-none focus:ring-2 ${
                    isDarkMode ? 'focus:ring-primary-500' : 'focus:ring-primary-500'
                  } focus:border-transparent`}
                  required
                />
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-800'
                  } transition-colors`}
                >
                  Change Phone Number
                </button>
                
                <button 
                  type="button"
                  onClick={handleResendCode}
                  disabled={countdown > 0 || isLoading}
                  className={`text-sm font-medium ${
                    countdown > 0 || isLoading
                      ? isDarkMode ? 'text-gray-500' : 'text-neutral-400'
                      : isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
                  } transition-colors`}
                >
                  {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
                </button>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  isLoading 
                    ? isDarkMode ? 'bg-primary-700' : 'bg-primary-400' 
                    : isDarkMode ? 'bg-primary-600 hover:bg-primary-700' : 'bg-primary-600 hover:bg-primary-700'
                } transition-colors`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : 'Verify and Sign In'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}