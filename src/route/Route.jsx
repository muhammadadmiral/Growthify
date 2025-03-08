// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Import komponen halaman
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from '../components/route/ProtectedRoute';
import CompleteProfile from '../pages/CompleteProfile';
import ForgotPassword from '../pages/ForgotPassword';
import EmailVerification from '../pages/EmailVerification';  // Tambahkan ini

// Lazy load komponen dashboard dan lainnya untuk performa
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/Profile'));
const Home = lazy(() => import('../pages/Home'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500"></div>
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Halaman publik */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/email-verification" element={<EmailVerification />} />

        {/* Halaman yang memerlukan autentikasi */}
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

        {/* Halaman melengkapi profil */}
        <Route path="/complete-profile" element={<CompleteProfile />} />

        {/* Halaman 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}