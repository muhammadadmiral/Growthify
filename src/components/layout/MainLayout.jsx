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
    document.body.style.backgroundColor = '#FFFFFF';
    document.body.style.color = '#1A202C';
    
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
    <div className="flex flex-col min-h-screen w-full bg-white text-neutral-900 overflow-x-hidden">
      <Navbar />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
}