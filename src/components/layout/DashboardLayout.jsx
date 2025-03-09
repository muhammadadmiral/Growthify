// src/components/layout/DashboardLayout.jsx
import { useEffect } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children, isSidebarOpen, toggleSidebar, closeSidebar }) {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="app-container w-full h-screen flex overflow-hidden">
      {/* Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar with menu toggle */}
        <Navbar onMenuClick={toggleSidebar} isLoggedIn={true} />
        
        {/* Content area with proper background */}
        <div className={`flex-1 overflow-auto ${isDarkMode ? 'bg-gray-900' : 'bg-neutral-50'} p-0`}>
          {children}
        </div>
      </div>
    </div>
  );
}