// src/components/layout/MainLayout.jsx
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function MainLayout({ children }) {
  const { isDarkMode } = useDarkMode();
  
  // Reset body style yang mungkin menjadi masalah
  useEffect(() => {
    // Fix untuk body styling yang menyebabkan centering issues
    document.body.style.display = 'block';
    document.body.style.placeItems = 'unset';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    document.body.style.backgroundColor = isDarkMode ? '#1E293B' : '#F0F9FF'; // Background light blue or dark blue
    document.body.style.color = isDarkMode ? '#F8FAFC' : '#334155';
    
    // Reset root styling juga
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.width = '100%';
      rootElement.style.height = 'auto';
      rootElement.style.minHeight = '100vh';
      rootElement.style.maxWidth = 'none';
      rootElement.style.margin = '0';
      rootElement.style.padding = '0';
      rootElement.style.textAlign = 'left';
      rootElement.style.display = 'flex';
      rootElement.style.flexDirection = 'column';
    }
    
    return () => {
      // Cleanup jika diperlukan
      document.body.style = '';
    };
  }, [isDarkMode]);

  return (
    <div className={`flex flex-col min-h-screen w-full ${isDarkMode ? 'text-gray-200 bg-gray-900' : 'text-text-dark bg-pattern-circuit'} relative overflow-x-hidden`}>
      {/* Gradient overlay untuk memberikan nuansa warna tambahan */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/50' : 'bg-gradient-to-br from-primary-50/50 to-secondary-50/50'} pointer-events-none`}></div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow w-full">{children}</main>
        <Footer />
      </div>
    </div>
  );
}