// src/App.jsx
import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import AuthLayout from './components/layout/AuthLayout';
import LoadingFallback from './components/common/LoadingFallback';
import ProtectedRoute from './routes/ProtectedRoute';

// Eager load auth-related pages for better UX
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CompleteProfile from './pages/auth/CompleteProfile';
import ForgotPassword from './pages/auth/ForgotPassword';
import EmailVerification from './pages/auth/EmailVerification';
import PasswordResetSent from './pages/auth/PasswordResetSent';
import ResetPassword from './pages/auth/ResetPassword';

// User pages that were having issues
import HelpCenter from './pages/user/HelpCenter';
import Settings from './pages/user/Settings';

// Lazy load other pages
const Home = lazy(() => import('./pages/public/Home'));
const Features = lazy(() => import('./pages/public/Features'));
const Pricing = lazy(() => import('./pages/public/Pricing'));
const Blog = lazy(() => import('./pages/blog/Blog'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost'));
const BlogTag = lazy(() => import('./pages/blog/BlogTag'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Profile = lazy(() => import('./pages/user/Profile'));

// Physical Pages
const WorkoutPlanner = lazy(() => import('./pages/physical/WorkoutPlanner'));
const BodyTransformation = lazy(() => import('./pages/physical/BodyTransformation'));
const Nutrition = lazy(() => import('./pages/physical/Nutrition'));
const Skincare = lazy(() => import('./pages/physical/Skincare'));
const WorkoutProgress = lazy(() => import('./pages/physical/WorkoutProgress'));
const WorkoutHistory = lazy(() => import('./pages/physical/WorkoutHistory'));
const WorkoutStatistics = lazy(() => import('./pages/physical/WorkoutStatistics'));

// Mental Pages
const GoalSetting = lazy(() => import('./pages/mental/GoalSetting'));
const MotivationCenter = lazy(() => import('./pages/mental/MotivationCenter'));
const ReflectionJournal = lazy(() => import('./pages/mental/ReflectionJournal'));

// Habits Pages
const HabitTracker = lazy(() => import('./pages/habits/HabitTracker'));
const StreakAnalytics = lazy(() => import('./pages/habits/StreakAnalytics'));
const HabitsChallenge = lazy(() => import('./pages/habits/HabitsChallenge'));

// Social Pages
const Communities = lazy(() => import('./pages/social/Communities'));
const AccountabilityPartners = lazy(() => import('./pages/social/AccountabilityPartners'));
const LiveEvents = lazy(() => import('./pages/social/LiveEvents'));

// Other Pages
const NotFound = lazy(() => import('./pages/public/NotFound'));

// Router component that determines layouts
function AppRouter() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  
  // Enhanced path detection
  const isDashboardPath = (path) => {
    return path.startsWith('/dashboard') || 
           path.startsWith('/profile') || 
           path.startsWith('/physical') || 
           path.startsWith('/mental') || 
           path.startsWith('/habits') || 
           path.startsWith('/social') ||
           path === '/help' ||
           path === '/settings';
  };

  const isAuthPath = (path) => {
    return path === '/login' || 
           path === '/register' || 
           path === '/complete-profile' || 
           path === '/forgot-password' || 
           path === '/password-reset-sent' || 
           path === '/reset-password' || 
           path === '/email-verification';
  };
  
  const isDashboardRoute = isDashboardPath(location.pathname);
  const isAuthRoute = isAuthPath(location.pathname);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Dashboard layout */}
      {isDashboardRoute && (
        <DashboardLayout 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          closeSidebar={() => setIsSidebarOpen(false)}
        >
          <Routes>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute><HelpCenter /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            
            {/* Physical Routes */}
            <Route path="/physical/body-transformation" element={<ProtectedRoute><BodyTransformation /></ProtectedRoute>} />
            <Route path="/physical/nutrition" element={<ProtectedRoute><Nutrition /></ProtectedRoute>} />
            <Route path="/physical/workout-planner" element={<ProtectedRoute><WorkoutPlanner /></ProtectedRoute>} />
            <Route path="/physical/skincare" element={<ProtectedRoute><Skincare /></ProtectedRoute>} />
            <Route path="/physical/workout-progress" element={<ProtectedRoute><WorkoutProgress /></ProtectedRoute>} />
            <Route path="/physical/workout-history" element={<ProtectedRoute><WorkoutHistory /></ProtectedRoute>} />
            <Route path="/physical/workout-statistics" element={<ProtectedRoute><WorkoutStatistics /></ProtectedRoute>} />

            {/* Mental Routes */}
            <Route path="/mental/goal-setting" element={<ProtectedRoute><GoalSetting /></ProtectedRoute>} />
            <Route path="/mental/motivation" element={<ProtectedRoute><MotivationCenter /></ProtectedRoute>} />
            <Route path="/mental/reflection" element={<ProtectedRoute><ReflectionJournal /></ProtectedRoute>} />

            {/* Habits Routes */}
            <Route path="/habits/tracker" element={<ProtectedRoute><HabitTracker /></ProtectedRoute>} />
            <Route path="/habits/streaks" element={<ProtectedRoute><StreakAnalytics /></ProtectedRoute>} />
            <Route path="/habits/challenges" element={<ProtectedRoute><HabitsChallenge /></ProtectedRoute>} />

            {/* Social Routes */}
            <Route path="/social/communities" element={<ProtectedRoute><Communities /></ProtectedRoute>} />
            <Route path="/social/partners" element={<ProtectedRoute><AccountabilityPartners /></ProtectedRoute>} />
            <Route path="/social/events" element={<ProtectedRoute><LiveEvents /></ProtectedRoute>} />
            
            {/* Fallback for any other protected routes */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
            {/* Fallback for any other auth routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
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
    </>
  );
}

function App() {
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

  return (
    <DarkModeProvider>
      <LanguageProvider>
        <Suspense fallback={<LoadingFallback />}>
          <AppRouter />
        </Suspense>
      </LanguageProvider>
    </DarkModeProvider>
  );
}

export default App;