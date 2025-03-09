import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import AuthLayout from './components/layout/AuthLayout';
import LoadingFallback from './components/common/LoadingFallback';

// Eager load auth-related pages for better UX
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CompleteProfile from './pages/auth/CompleteProfile';
import ForgotPassword from './pages/auth/ForgotPassword';
import EmailVerification from './pages/auth/EmailVerification';
import PasswordResetSent from './pages/auth/PasswordResetSent';
import ResetPassword from './pages/auth/ResetPassword';

// Lazy load other pages
const Home = lazy(() => import('./pages/public/Home'));
const Features = lazy(() => import('./pages/public/Features'));
const Pricing = lazy(() => import('./pages/public/Pricing'));
const Blog = lazy(() => import('./pages/blog/Blog'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost'));
const BlogTag = lazy(() => import('./pages/blog/BlogTag'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Profile = lazy(() => import('./pages/user/Profile'));
const PhysicalGoals = lazy(() => import('./pages/dashboard/PhysicalGoals'));
const MindsetGoals = lazy(() => import('./pages/dashboard/MindsetGoals'));
const HabitTracker = lazy(() => import('./pages/dashboard/HabitTracker'));
const Communities = lazy(() => import('./pages/dashboard/Communities'));
const NotFound = lazy(() => import('./pages/public/NotFound'));

// Protected route component
import ProtectedRoute from './route/ProtectedRoute'; // Corrected path

function App() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fix body styling issues
  useEffect(() => {
    document.body.style.display = 'block';
    document.body.style.placeItems = 'unset';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    
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
  }, []);

  // Determine which layout to use based on the current route
  const isDashboardRoute = location.pathname.startsWith('/dashboard') || 
                           location.pathname.startsWith('/profile') || 
                           location.pathname.startsWith('/physical') || 
                           location.pathname.startsWith('/mindset') || 
                           location.pathname.startsWith('/habits') || 
                           location.pathname.startsWith('/communities');
  
  const isAuthRoute = location.pathname === '/login' || 
                      location.pathname === '/register' ||
                      location.pathname === '/complete-profile' ||
                      location.pathname === '/forgot-password' ||
                      location.pathname === '/password-reset-sent' ||
                      location.pathname === '/reset-password' ||
                      location.pathname === '/email-verification';

  return (
    <DarkModeProvider>
      <LanguageProvider>
        <Suspense fallback={<LoadingFallback />}>
          {/* Dashboard layout */}
          {isDashboardRoute && (
            <DashboardLayout 
              isSidebarOpen={isSidebarOpen} 
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              closeSidebar={() => setIsSidebarOpen(false)}
            >
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
                    <PhysicalGoals />
                  </ProtectedRoute>
                } />
                <Route path="/mindset" element={
                  <ProtectedRoute>
                    <MindsetGoals />
                  </ProtectedRoute>
                } />
                <Route path="/habits" element={
                  <ProtectedRoute>
                    <HabitTracker />
                  </ProtectedRoute>
                } />
                <Route path="/communities" element={
                  <ProtectedRoute>
                    <Communities />
                  </ProtectedRoute>
                } />
              </Routes>
            </DashboardLayout>
          )}

          {/* Auth layout */}
          {isAuthRoute && (
            <AuthLayout>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/complete-profile" element={<CompleteProfile />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/password-reset-sent" element={<PasswordResetSent />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/email-verification" element={<EmailVerification />} />
              </Routes>
            </AuthLayout>
          )}

          {/* Main layout for public pages */}
          {!isDashboardRoute && !isAuthRoute && (
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/blog/tag/:tag" element={<BlogTag />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          )}
        </Suspense>
      </LanguageProvider>
    </DarkModeProvider>
  );
}

export default App;
