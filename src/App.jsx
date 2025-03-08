// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedRoute from './route/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

function App() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Fix untuk body styling
  useEffect(() => {
    // Reset default styling
    document.body.style.display = 'block';
    document.body.style.placeItems = 'unset';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    document.body.style.backgroundColor = '#FFFFFF';
    document.body.style.color = '#1A202C';
    
    // Reset root styling
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.width = '100%';
      rootElement.style.minHeight = '100vh';
      rootElement.style.maxWidth = 'none';
      rootElement.style.margin = '0';
      rootElement.style.padding = '0';
      rootElement.style.textAlign = 'left';
      rootElement.style.display = 'flex';
      rootElement.style.flexDirection = 'column';
    }
    
    // Reset App.css container styles
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.style.width = '100%';
      appContainer.style.maxWidth = 'none';
      appContainer.style.margin = '0';
      appContainer.style.padding = '0';
      appContainer.style.textAlign = 'left';
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isDashboardRoute = location.pathname.startsWith('/dashboard') || 
                           location.pathname.startsWith('/profile') || 
                           location.pathname.startsWith('/physical') || 
                           location.pathname.startsWith('/mindset') || 
                           location.pathname.startsWith('/habits') || 
                           location.pathname.startsWith('/communities');
  
  // Layout untuk halaman dashboard
  if (isDashboardRoute) {
    return (
      <div className="app-container w-full h-screen flex overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar onMenuClick={toggleSidebar} isLoggedIn={true} />
          <div className="flex-1 overflow-auto bg-neutral-50 p-0">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/physical" element={<div className="p-6">Physical Goals Content</div>} />
              <Route path="/mindset" element={<div className="p-6">Mindset Content</div>} />
              <Route path="/habits" element={<div className="p-6">Habits Content</div>} />
              <Route path="/communities" element={<div className="p-6">Communities Content</div>} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }

  // Layout untuk halaman auth (login/register)
  if (location.pathname === '/login' || location.pathname === '/register') {
    return (
      <div className="app-container w-full">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    );
  }

  // Layout default dengan MainLayout
  return (
    <div className="app-container w-full">
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;