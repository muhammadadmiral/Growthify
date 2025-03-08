// src/components/layout/MainLayout.jsx
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }) {
  // Reset body style yang mungkin menjadi masalah
  useEffect(() => {
    // Fix untuk body styling yang menyebabkan centering issues
    document.body.style.display = 'block';
    document.body.style.placeItems = 'unset';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    document.body.style.backgroundColor = '#F0F9FF'; // Background light blue
    document.body.style.color = '#334155';
    
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
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full text-text-dark overflow-x-hidden bg-pattern-circuit relative">
      {/* Gradient overlay untuk memberikan nuansa warna tambahan */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 pointer-events-none"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow w-full">{children}</main>
        <Footer />
      </div>
    </div>
  );
}