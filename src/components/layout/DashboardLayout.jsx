// src/components/layout/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import { useDarkMode } from '../../contexts/DarkModeContext';

const DashboardLayout = ({ children, isSidebarOpen: externalSidebarOpen, toggleSidebar, closeSidebar }) => {
  // Initialize sidebar state based on screen size
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return window.innerWidth >= 1024;
  });
  
  const { isDarkMode } = useDarkMode();
  const location = useLocation();

  // Sync with external state if provided
  useEffect(() => {
    if (externalSidebarOpen !== undefined) {
      setIsSidebarOpen(externalSidebarOpen);
    }
  }, [externalSidebarOpen]);

  // Close sidebar on route change for small screens
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  // Handle window resize to manage sidebar visibility
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle toggling sidebar
  const handleToggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
    if (toggleSidebar) toggleSidebar();
  };

  // Handle closing sidebar
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    if (closeSidebar) closeSidebar();
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <Navbar onMenuClick={handleToggleSidebar} />
      </div>
      
      {/* Main Layout (Sidebar + Content) */}
      <div className="flex flex-1 pt-16 sm:pt-20">
        {/* Sidebar - Fixed on large screens, absolute on mobile */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden lg:block'} lg:w-64 flex-shrink-0`}>
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={handleCloseSidebar} 
          />
        </div>
        
        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
              {children}
            </div>
          </main>
          
          {/* Footer */}
          <Footer isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;