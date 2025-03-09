// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-6xl font-extrabold font-heading bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text mb-6">
          404
        </h2>
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">Page Not Found</h1>
        <p className="text-neutral-600 mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-2 rounded-md bg-primary-600 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-150"
          >
            Return Home
          </Link>
          <Link
            to="/help"
            className="px-6 py-2 rounded-md border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition-all duration-150"
          >
            Contact Support
          </Link>
        </div>
        
        {/* Growth tip */}
        <div className="mt-16 bg-gradient-premium from-primary-50 to-secondary-50 p-4 rounded-lg inline-block">
          <h3 className="text-sm font-medium text-neutral-800">💡 While you're here...</h3>
          <p className="text-xs text-neutral-700 mt-1">
            "Every setback is a setup for a comeback. Keep growing!"
          </p>
        </div>
      </div>
    </div>
  );
}