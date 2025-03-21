// src/routes/Route.jsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingFallback from '../components/common/LoadingFallback';

// Eager load auth-related pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import CompleteProfile from '../pages/auth/CompleteProfile';
import ForgotPassword from '../pages/auth/ForgotPassword';
import EmailVerification from '../pages/auth/EmailVerification';
import PasswordResetSent from '../pages/auth/PasswordResetSent';
import ResetPassword from '../pages/auth/ResetPassword';

// Lazy load other pages
const Home = lazy(() => import('../pages/public/Home'));
const Features = lazy(() => import('../pages/public/Features'));
const Pricing = lazy(() => import('../pages/public/Pricing'));
const Blog = lazy(() => import('../pages/blog/Blog'));
const BlogPost = lazy(() => import('../pages/blog/BlogPost'));
const BlogTag = lazy(() => import('../pages/blog/BlogTag'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Profile = lazy(() => import('../pages/user/Profile'));

// Physical Pages
const WorkoutPlanner = lazy(() => import('../pages/physical/WorkoutPlanner'));
const BodyTransformation = lazy(() => import('../pages/physical/BodyTransformation'));
const Nutrition = lazy(() => import('../pages/physical/Nutrition'));
const Skincare = lazy(() => import('../pages/physical/Skincare'));
const WorkoutProgress = lazy(() => import('../pages/physical/WorkoutProgress'));
const WorkoutHistory = lazy(() => import('../pages/physical/WorkoutHistory'));
const WorkoutStatistics = lazy(() => import('../pages/physical/WorkoutStatistics'));

// Mental Pages
const GoalSetting = lazy(() => import('../pages/mental/GoalSetting'));
const MotivationCenter = lazy(() => import('../pages/mental/MotivationCenter'));
const ReflectionJournal = lazy(() => import('../pages/mental/ReflectionJournal'));

// Habits Pages
const HabitTracker = lazy(() => import('../pages/habits/HabitTracker'));
const StreakAnalytics = lazy(() => import('../pages/habits/StreakAnalytics'));
const HabitsChallenge = lazy(() => import('../pages/habits/HabitsChallenge'));

// Social Pages
const Communities = lazy(() => import('../pages/social/Communities'));
const AccountabilityPartners = lazy(() => import('../pages/social/AccountabilityPartners'));
const LiveEvents = lazy(() => import('../pages/social/LiveEvents'));

// Other Pages
const NotFound = lazy(() => import('../pages/public/NotFound'));

// Import Protected Route
import ProtectedRoute from '../routes/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/blog/tag/:tag" element={<BlogTag />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset-sent" element={<PasswordResetSent />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verification" element={<EmailVerification />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Physical Routes */}
        <Route path="/physical/workout-planner" element={<ProtectedRoute><WorkoutPlanner /></ProtectedRoute>} />
        <Route path="/physical/body-transformation" element={<ProtectedRoute><BodyTransformation /></ProtectedRoute>} />
        <Route path="/physical/nutrition" element={<ProtectedRoute><Nutrition /></ProtectedRoute>} />
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

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}