// src/components/layout/DashboardLayout.jsx
import { useState, useEffect } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children, isSidebarOpen, toggleSidebar, closeSidebar }) {
  const { isDarkMode } = useDarkMode();
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Detect mobile screens
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 1024 && !isCollapsed) {
        setIsCollapsed(true);
      } else if (window.innerWidth >= 1024 && isCollapsed) {
        setIsCollapsed(false);
      }
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, [isCollapsed]);

  // Toggle sidebar collapsed state
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar with animation */}
      <div 
        className={`
          transition-all duration-300 ease-in-out
          ${isMobile ? 'fixed inset-y-0 left-0 z-40' : 'relative'}
          ${isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}
          ${!isMobile && isCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        <Sidebar
          isOpen={isMobile ? isSidebarOpen : true}
          onClose={closeSidebar}
        />
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Main content area including navbar and content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out`}>
        {/* Navbar */}
        <div className="sticky top-0 z-20">
          <Navbar 
            onMenuClick={toggleSidebar}
          />
        </div>
        
        {/* Content area with top padding to prevent navbar overlap */}
        <main 
          className={`
            flex-1 overflow-y-auto transition-all duration-300
            ${isDarkMode ? 'bg-gray-900' : 'bg-neutral-50'}
          `}
          style={{ paddingTop: '4rem' }}
        >
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}