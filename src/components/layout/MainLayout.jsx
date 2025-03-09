// src/components/layout/MainLayout.jsx
import { useEffect } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }) {
  const { isDarkMode } = useDarkMode();
  
  // Reset body styles that might be problematic
  useEffect(() => {
    // Fix for body styling issues
    document.body.style.display = 'block';
    document.body.style.placeItems = 'unset';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    document.body.style.backgroundColor = isDarkMode ? '#111827' : '#FFFFFF';
    document.body.style.color = isDarkMode ? '#F1F5F9' : '#1A202C';
    
    // Reset root styling
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
      // Cleanup if needed
      document.body.style = '';
    };
  }, [isDarkMode]);

  return (
    <div className={`flex flex-col min-h-screen w-full ${
      isDarkMode 
        ? 'text-gray-200 bg-gray-900' 
        : 'text-text-dark bg-white'
    } relative overflow-x-hidden`}>
      {/* Subtle gradient overlay for visual polish */}
      {isDarkMode ? (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 pointer-events-none"></div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 pointer-events-none"></div>
      )}
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow w-full">{children}</main>
        <Footer />
      </div>
    </div>
  );
}