// src/routes/AppRoutes.jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500"></div>
  </div>
);

// Eagerly loaded auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import CompleteProfile from '../pages/auth/CompleteProfile';
import ForgotPassword from '../pages/auth/ForgotPassword';
import PasswordResetSent from '../pages/auth/PasswordResetSent';
import ResetPassword from '../pages/auth/ResetPassword';
import EmailVerification from '../pages/auth/EmailVerification';

// Lazy loaded public pages
const Home = lazy(() => import('../pages/public/Home'));
const Features = lazy(() => import('../pages/public/Features'));
const Pricing = lazy(() => import('../pages/public/Pricing'));
const Blog = lazy(() => import('../pages/blog/Blog'));
const BlogPost = lazy(() => import('../pages/blog/BlogPost'));
const BlogTag = lazy(() => import('../pages/blog/BlogTag'));
const NotFound = lazy(() => import('../pages/public/NotFound'));

// Lazy loaded dashboard pages
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Profile = lazy(() => import('../pages/user/Profile'));
const PhysicalGoals = lazy(() => import('../pages/dashboard/PhysicalGoals'));
const MindsetGoals = lazy(() => import('../pages/dashboard/MindsetGoals'));
const HabitTracker = lazy(() => import('../pages/dashboard/HabitTracker'));
const Communities = lazy(() => import('../pages/dashboard/Communities'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/blog/tag/:tag" element={<BlogTag />} />
        
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset-sent" element={<PasswordResetSent />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />

        {/* Protected pages */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/physical" 
          element={
            <ProtectedRoute>
              <PhysicalGoals />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mindset" 
          element={
            <ProtectedRoute>
              <MindsetGoals />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/habits" 
          element={
            <ProtectedRoute>
              <HabitTracker />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/communities" 
          element={
            <ProtectedRoute>
              <Communities />
            </ProtectedRoute>
          } 
        />

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}