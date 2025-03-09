// src/components/layout/Navbar/UserMenuItems.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  SettingsIcon, 
  HelpCircleIcon, 
  LogOutIcon 
} from 'lucide-react';

export default function UserMenuItems({ items, isDarkMode, onItemClick }) {
  // Get icon component based on icon name
  const getIcon = (iconName, size = 16) => {
    switch (iconName) {
      case 'profile':
        return <UserIcon size={size} />;
      case 'settings':
        return <SettingsIcon size={size} />;
      case 'help':
        return <HelpCircleIcon size={size} />;
      case 'signOut':
        return <LogOutIcon size={size} />;
      default:
        return null;
    }
  };
  
  // Animation variants for staggered children
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2
      }
    })
  };

  return (
    <div className="py-1">
      {items.map((item, index) => (
        <motion.div
          key={item.name}
          custom={index}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {item.action ? (
            // Item with action (like sign out)
            <button
              onClick={() => onItemClick(item.action)}
              className={`w-full flex items-center px-4 py-2 text-sm ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-primary-900/30 hover:text-primary-400' 
                  : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-600'
              } transition-colors group`}
            >
              {/* Icon with subtle transition */}
              <span className={`mr-3 ${
                isDarkMode 
                  ? 'text-gray-500 group-hover:text-primary-400' 
                  : 'text-neutral-500 group-hover:text-primary-600'
              } transition-colors`}>
                {getIcon(item.icon)}
              </span>
              {item.name}
            </button>
          ) : (
            // Navigation link
            <Link
              to={item.path}
              className={`flex items-center px-4 py-2 text-sm ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-primary-900/30 hover:text-primary-400' 
                  : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-600'
              } transition-colors group`}
            >
              {/* Icon with subtle transition */}
              <span className={`mr-3 ${
                isDarkMode 
                  ? 'text-gray-500 group-hover:text-primary-400' 
                  : 'text-neutral-500 group-hover:text-primary-600'
              } transition-colors`}>
                {getIcon(item.icon)}
              </span>
              {item.name}
            </Link>
          )}
        </motion.div>
      ))}
    </div>
  );
}