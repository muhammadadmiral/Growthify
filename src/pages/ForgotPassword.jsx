// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../config/firebase';
import InputForm from '../components/login/InputForm';
import SubmitButton from '../components/login/SubmitButton';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      await resetPassword(email);
      setSuccess('Password reset email sent. Check your inbox.');
      
      // Redirect ke halaman login setelah beberapa detik
      setTimeout(() => {
        navigate('/login');
      }, 3000);
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
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/">
          <h2 className="text-center text-3xl font-extrabold font-heading bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
            Growthify
          </h2>
        </Link>
        <h2 className="mt-6 text-center text-2xl font-bold text-neutral-800">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Enter your email to receive a password reset link
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-elegant sm:rounded-lg sm:px-10">
          {/* Pesan sukses */}
          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
              {success}
            </div>
          )}

          {/* Pesan error */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputForm
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />

            <SubmitButton
              text="Send Reset Link"
              isLoading={isLoading}
            />
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
      
      {/* Inspirational Banner */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gradient-premium from-primary-50 to-secondary-50 p-4 rounded-lg shadow-sm border border-primary-100">
          <h3 className="text-sm font-medium text-neutral-800">🔒 Security Tip</h3>
          <p className="text-xs text-neutral-700 mt-1">
            "Always use a strong, unique password and enable two-factor authentication when possible."
          </p>
        </div>
      </div>
    </div>
  );
}