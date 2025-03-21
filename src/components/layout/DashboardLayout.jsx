// src/components/layout/DashboardLayout.jsx
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to closed
  const { isDarkMode } = useDarkMode();
  const location = useLocation();
  const initialRender = useRef(true);
  
  // Function to toggle sidebar - direct DOM manipulation for reliability
  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    
    // Direct DOM manipulation - this ensures the sidebar actually moves
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      if (newState) {
        sidebar.classList.remove('hidden-sidebar');
        sidebar.classList.add('visible-sidebar');
        
        // Show overlay on mobile
        if (window.innerWidth < 1024) {
          let overlay = document.getElementById('sidebar-overlay');
          if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'sidebar-overlay';
            overlay.className = 'fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 lg:hidden';
            overlay.onclick = () => toggleSidebar();
            document.body.appendChild(overlay);
          } else {
            overlay.style.display = 'block';
          }
        }
      } else {
        sidebar.classList.remove('visible-sidebar');
        sidebar.classList.add('hidden-sidebar');
        
        // Hide overlay
        const overlay = document.getElementById('sidebar-overlay');
        if (overlay) {
          overlay.style.display = 'none';
        }
      }
    }
  };
  
  // Handle sidebar close from child component
  const handleCloseSidebar = () => {
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };
  
  // On route change, close sidebar on mobile
  useEffect(() => {
    if (window.innerWidth < 1024 && isSidebarOpen) {
      setIsSidebarOpen(false);
      
      // Direct DOM manipulation
      const sidebar = document.getElementById('sidebar');
      if (sidebar) {
        sidebar.classList.remove('visible-sidebar');
        sidebar.classList.add('hidden-sidebar');
      }
      
      // Hide overlay
      const overlay = document.getElementById('sidebar-overlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
    }
  }, [location.pathname, isSidebarOpen]);
  
  // Initialize sidebar state properly and handle window resize
  useEffect(() => {
    // Set initial sidebar state based on screen size
    const isDesktop = window.innerWidth >= 1024;
    setIsSidebarOpen(isDesktop);
    
    // Initialize sidebar visibility on mount
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      if (isDesktop) {
        sidebar.classList.remove('hidden-sidebar');
        sidebar.classList.add('visible-sidebar');
      } else {
        sidebar.classList.remove('visible-sidebar');
        sidebar.classList.add('hidden-sidebar');
      }
    }
    
    // Handle window resize
    const handleResize = () => {
      const isDesktopNow = window.innerWidth >= 1024;
      setIsSidebarOpen(isDesktopNow);
      
      // Update sidebar visibility on resize
      const sidebar = document.getElementById('sidebar');
      if (sidebar) {
        if (isDesktopNow) {
          sidebar.classList.remove('hidden-sidebar');
          sidebar.classList.add('visible-sidebar');
        } else {
          sidebar.classList.remove('visible-sidebar');
          sidebar.classList.add('hidden-sidebar');
        }
      }
      
      // Handle overlay on resize
      if (isDesktopNow) {
        const overlay = document.getElementById('sidebar-overlay');
        if (overlay) {
          overlay.style.display = 'none';
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Add global styles for sidebar visibility states
  useEffect(() => {
    // Create style element if it doesn't exist
    let styleElement = document.getElementById('dashboard-layout-styles');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'dashboard-layout-styles';
      styleElement.innerHTML = `
        /* Base sidebar styles */
        #sidebar {
          transition: transform 0.3s ease-in-out;
        }
        
        /* Hidden state */
        .hidden-sidebar {
          transform: translateX(-100%);
        }
        
        /* Visible state */
        .visible-sidebar {
          transform: translateX(0);
        }
        
        /* Always show on desktop */
        @media (min-width: 1024px) {
          .visible-sidebar {
            transform: translateX(0) !important;
          }
        }
      `;
      document.head.appendChild(styleElement);
    }
    
    return () => {
      // Clean up on unmount
      const styleToRemove = document.getElementById('dashboard-layout-styles');
      if (styleToRemove) {
        document.head.removeChild(styleToRemove);
      }
    };
  }, []);
  
  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-950 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
      {/* Navbar */}
      <Navbar 
        onMenuClick={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      
      {/* Main container */}
      <div className="flex flex-1 pt-16 sm:pt-20">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={handleCloseSidebar}
        />
        
        {/* Main content area */}
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
          <div className="container mx-auto px-4 sm:px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}