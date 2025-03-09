// src/components/layout/Navbar/DesktopNav.jsx
import { Link } from 'react-router-dom';

export default function DesktopNav({ links, currentPath, isDarkMode, isScrolled }) {
  // Consistent text colors across both modes
  const navLinkColor = isDarkMode
    ? 'text-primary-400 hover:text-primary-300'
    : isScrolled 
      ? 'text-primary-600 hover:text-primary-700' 
      : 'text-primary-600 hover:text-primary-700';
      
  // Active state background
  const activeNavBg = isDarkMode
    ? 'bg-primary-900/30'
    : isScrolled ? 'bg-primary-50/70' : 'bg-white/20';
    
  return (
    <div className="hidden md:flex md:items-center md:space-x-1">
      {links.map((link) => {
        const isActive = currentPath === link.path;
        return (
          <Link 
            key={link.name} 
            to={link.path} 
            className={`px-4 py-2 mx-1 rounded-lg text-sm font-medium relative overflow-hidden transition-all duration-300 ${
              isActive 
                ? isDarkMode ? 'text-primary-300' : 'text-primary-600' 
                : navLinkColor
            }`}
          >
            {/* Dynamic highlight effect */}
            <span className={`absolute inset-0 rounded-lg -z-10 transition-opacity duration-300 
              ${isActive ? activeNavBg : 'opacity-0'}`}
            ></span>

            {/* Hover highlight */}
            <span className={`absolute inset-0 rounded-lg -z-10 opacity-0 hover:opacity-100 transition-opacity duration-300 ${
              isDarkMode ? 'bg-primary-900/50' : isScrolled ? 'bg-primary-50/70' : 'bg-white/20'
            }`}></span>
            
            {/* Text with dot indicator for active state */}
            <span className="relative flex items-center">
              {link.name}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500"></span>
              )}
            </span>
            
            {/* Animated underline with gradient */}
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-500/0 via-primary-500 to-primary-500/0 transform scale-x-0 hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
        );
      })}
    </div>
  );
}