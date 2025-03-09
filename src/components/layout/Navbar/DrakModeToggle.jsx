// src/components/layout/Navbar/DarkModeToggle.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useDarkMode } from '../../../contexts/DarkModeContext';

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <motion.button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg relative overflow-hidden text-primary-500 hover:text-primary-400 transition-colors duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle Dark Mode"
    >
      <span className={`absolute inset-0 rounded-lg opacity-0 hover:opacity-100 ${
        isDarkMode ? 'bg-primary-900/50' : 'bg-primary-50/70'
      } transition-opacity duration-300`}></span>
      
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDarkMode ? 'dark' : 'light'}
          initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          {isDarkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}