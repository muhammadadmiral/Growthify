// components/login/InputForm.jsx
import { useState } from 'react';

export default function InputForm({ 
  label, 
  id, 
  name, 
  type, 
  autoComplete, 
  required, 
  value, 
  onChange, 
  error 
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const isPasswordField = type === 'password';
  const actualType = isPasswordField && showPassword ? 'text' : type;
  
  return (
    <div>
      <div className="flex justify-between items-baseline">
        <label htmlFor={id} className="block text-sm font-medium text-neutral-700">
          {label}
          {required && <span className="text-accent-500 ml-1">*</span>}
        </label>
        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>
      <div className="mt-1 relative">
        <input
          id={id}
          name={name}
          type={actualType}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            appearance-none block w-full px-3 py-2 border 
            ${error ? 'border-red-300' : focused ? 'border-primary-300' : 'border-neutral-300'} 
            rounded-md shadow-sm placeholder-neutral-400 
            focus:outline-none focus:ring-primary-500 focus:border-primary-500
            transition duration-150 ease-in-out sm:text-sm
          `}
        />
        {isPasswordField && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {isPasswordField && !error && (
        <p className="mt-1 text-xs text-neutral-500">
          Must be at least 8 characters
        </p>
      )}
    </div>
  );
}