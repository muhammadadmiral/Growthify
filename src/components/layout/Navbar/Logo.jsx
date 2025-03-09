// src/components/layout/Navbar/Logo.jsx
import { Link } from 'react-router-dom';

export default function Logo({ isDarkMode }) {
  // Logo background effect for dark/light mode  
  const logoBgEffect = isDarkMode 
    ? 'from-primary-700/20 via-secondary-700/20 to-primary-700/20'
    : 'from-primary-500/20 via-secondary-500/20 to-primary-500/20';

  return (
    <Link to="/" className="flex-shrink-0 group relative">
      <div className={`absolute -inset-4 rounded-2xl bg-gradient-to-r ${logoBgEffect} opacity-0 blur-xl group-hover:opacity-100 group-hover:duration-1000 duration-300 group-hover:animate-pulse-slow`}></div>
      <div className="relative flex items-center">
        <div className="relative">
          <div className="font-heading font-bold text-2xl md:text-3xl bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-500 bg-clip-text text-transparent bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500">
            Growthify
          </div>
          {/* Animated underline effect */}
          <div className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
        {/* Orbiting dot animation */}
        <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 group-hover:animate-orbit transition-opacity duration-300"></div>
      </div>
    </Link>
  );
}