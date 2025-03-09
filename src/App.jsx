// src/App.jsx
import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './route/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Eager load auth-related pages for better UX
import Login from './pages/Login';
import Register from './pages/Register';
import CompleteProfile from './pages/CompleteProfile';
import ForgotPassword from './pages/ForgotPassword';
import EmailVerification from './pages/EmailVerification';

// Lazy load other pages
const Home = lazy(() => import('./pages/Home'));
const Features = lazy(() => import('./pages/Features'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Blog = lazy(() => import('./pages/Blog'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500"></div>
  </div>
);

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

  // Determine if we're on a dashboard route
  const isDashboardRoute = location.pathname.startsWith('/dashboard') || 
                           location.pathname.startsWith('/profile') || 
                           location.pathname.startsWith('/physical') || 
                           location.pathname.startsWith('/mindset') || 
                           location.pathname.startsWith('/habits') || 
                           location.pathname.startsWith('/communities');
  
  // Determine if we're on an auth route
  const isAuthRoute = location.pathname === '/login' || 
                      location.pathname === '/register' ||
                      location.pathname === '/complete-profile' ||
                      location.pathname === '/forgot-password' ||
                      location.pathname === '/email-verification';
  
  // Wrap everything in our providers
  return (
    <DarkModeProvider>
      <LanguageProvider>
        <Suspense fallback={<LoadingFallback />}>
          {/* Dashboard layout */}
          {isDashboardRoute && (
            <div className="app-container w-full h-screen flex overflow-hidden">
              <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar onMenuClick={toggleSidebar} isLoggedIn={true} />
                <div className="flex-1 overflow-auto bg-neutral-50 dark:bg-gray-900 p-0">
                  <Routes>
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="/physical" element={
                      <ProtectedRoute>
                        <div className="p-6 dark:text-gray-200">Physical Goals Content</div>
                      </ProtectedRoute>
                    } />
                    <Route path="/mindset" element={
                      <ProtectedRoute>
                        <div className="p-6 dark:text-gray-200">Mindset Content</div>
                      </ProtectedRoute>
                    } />
                    <Route path="/habits" element={
                      <ProtectedRoute>
                        <div className="p-6 dark:text-gray-200">Habits Content</div>
                      </ProtectedRoute>
                    } />
                    <Route path="/communities" element={
                      <ProtectedRoute>
                        <div className="p-6 dark:text-gray-200">Communities Content</div>
                      </ProtectedRoute>
                    } />
                  </Routes>
                </div>
              </div>
            </div>
          )}

          {/* Auth layout - no header/footer */}
          {isAuthRoute && (
            <div className="app-container w-full">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/complete-profile" element={<CompleteProfile />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/email-verification" element={<EmailVerification />} />
              </Routes>
            </div>
          )}

          {/* Main layout with header/footer for public pages */}
          {!isDashboardRoute && !isAuthRoute && (
            <div className="app-container w-full">
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<Blog />} />
                  <Route path="/blog/tag/:tag" element={<Blog />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>
            </div>
          )}
        </Suspense>
      </LanguageProvider>
    </DarkModeProvider>
  );
}

export default App;