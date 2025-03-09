// src/components/common/LoadingFallback.jsx
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function LoadingFallback() {
  const { isDarkMode } = useDarkMode();
  
  return (
    <div className={`flex justify-center items-center min-h-screen ${
      isDarkMode ? 'bg-gray-900' : 'bg-neutral-50'
    }`}>
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 ${
          isDarkMode ? 'border-primary-400' : 'border-primary-500'
        }`}></div>
        
        {/* Loading text */}
        <p className={`text-sm font-medium ${
          isDarkMode ? 'text-gray-300' : 'text-neutral-600'
        }`}>
          Loading...
        </p>
      </div>
    </div>
  );
}