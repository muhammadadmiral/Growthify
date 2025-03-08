// src/components/Home/HeroSection.jsx
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Hero Background - Updated with new gradient */}
      <div 
        className="absolute inset-0 transform skewY(-6deg) origin-top-right -translate-y-36 z-0"
        style={{ 
          background: 'linear-gradient(135deg, #E6FFFA, #EBF8FF, #F0FFF4)',
          boxShadow: 'inset 0 0 30px rgba(49, 151, 149, 0.1)'
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-heading text-text-dark">
          Transform Your <span className="gradient-text">Life</span> With Growthify
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-10 text-text">
          Your personal development companion for mindset, habits, and body transformation. 
          Expert guidance tailored to your unique journey.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="px-8 py-3 rounded-md bg-primary-500 text-white font-medium shadow-lg hover:bg-primary-600 transform hover:scale-105 transition-all duration-200"
          >
            Start Your Journey
          </Link>
          
          <Link
            to="/features"
            className="px-8 py-3 rounded-md border border-secondary-300 bg-white text-secondary-700 font-medium hover:bg-secondary-50 transition-all duration-200"
          >
            Explore Features
          </Link>
        </div>
        
        {/* Feature checkmarks */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-text">
          <div className="flex items-center">
            <span className="text-primary-500 mr-2">✓</span>
            <span>Personalized Plans</span>
          </div>
          <div className="flex items-center">
            <span className="text-primary-500 mr-2">✓</span>
            <span>Expert Guidance</span>
          </div>
          <div className="flex items-center">
            <span className="text-primary-500 mr-2">✓</span>
            <span>Progress Tracking</span>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div 
          className="absolute bottom-0 right-0 w-64 h-64 opacity-20 rounded-full" 
          style={{ background: 'radial-gradient(circle, #38B2AC, transparent)' }}
        ></div>
        <div 
          className="absolute top-40 left-10 w-32 h-32 opacity-20 rounded-full hidden md:block" 
          style={{ background: 'radial-gradient(circle, #4299E1, transparent)' }}
        ></div>
      </div>
    </div>
  );
}