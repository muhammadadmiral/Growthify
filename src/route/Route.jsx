// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ProtectedRoute from '../components/route/ProtectedRoute';

// Eager load auth-related pages for better UX
import Login from '../pages/Login';
import Register from '../pages/Register';
import CompleteProfile from '../pages/CompleteProfile';
import ForgotPassword from '../pages/ForgotPassword';
import EmailVerification from '../pages/EmailVerification';

// Lazy load other pages for performance
const Home = lazy(() => import('../pages/Home'));
const Features = lazy(() => import('../pages/Features'));
const Pricing = lazy(() => import('../pages/Pricing'));
const Blog = lazy(() => import('../pages/Blog'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/Profile'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500"></div>
  </div>
);

/**
 * AppRoutes is the main routing component for the application
 * NOTE: This component is now obsolete as routing is handled directly in App.jsx
 * This file is kept for documentation/reference purposes only
 */
export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blog/tag/:tag" element={<Blog />} />
        
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
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
              <div className="p-6 dark:text-gray-200">Physical Goals Content</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mindset" 
          element={
            <ProtectedRoute>
              <div className="p-6 dark:text-gray-200">Mindset Content</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/habits" 
          element={
            <ProtectedRoute>
              <div className="p-6 dark:text-gray-200">Habits Content</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/communities" 
          element={
            <ProtectedRoute>
              <div className="p-6 dark:text-gray-200">Communities Content</div>
            </ProtectedRoute>
          } 
        />

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}