// src/components/Home/CtaSection.jsx
import { Link } from 'react-router-dom';

export default function CtaSection() {
  return (
    <div className="bg-gradient-premium from-primary-500 to-secondary-500 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold font-heading text-white mb-6">
          Ready to Transform Your Life?
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-white opacity-90 mb-10">
          Join thousands of others who have already started their growth journey. 
          Get access to personalized plans, expert guidance, and a supportive community.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="px-8 py-3 rounded-md bg-white text-primary-600 font-medium shadow-lg hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-150"
          >
            Get Started Now
          </Link>
          <Link
            to="/pricing"
            className="px-8 py-3 rounded-md border border-white text-white font-medium hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-150"
          >
            View Pricing
          </Link>
        </div>
        <p className="mt-6 text-sm text-white opacity-80">
          No credit card required to start your free 7-day trial
        </p>
      </div>
    </div>
  );
}