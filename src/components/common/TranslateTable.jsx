import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslations } from '../../hooks/useTranslations';

// This component provides smooth transitions when changing languages
export default function TranslatableText({
  textKey,
  params = {},
  as = 'span',
  className = '',
  fallback = ''
}) {
  const { language, isChangingLanguage } = useLanguage();
  const { t, format } = useTranslations();
  
  // Navigate the nested keys to find the translation
  const getNestedTranslation = (obj, path) => {
    const keys = path.split('.');
    return keys.reduce((o, key) => (o && o[key] !== undefined) ? o[key] : undefined, obj);
  };

  // Get the translated text
  const translatedText = getNestedTranslation(t, textKey) || fallback;
  
  // Format with parameters if needed
  const finalText = params && Object.keys(params).length > 0
    ? format(translatedText, params)
    : translatedText;
  
  // Animation variants
  const variants = {
    initial: { 
      opacity: 0,
      y: 5
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };
  
  // Use React.createElement to support different HTML elements
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${language}-${textKey}`}
        className="inline-block overflow-hidden"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {React.createElement(
          as,
          { 
            className: `translatable ${className} ${isChangingLanguage ? 'opacity-50' : 'opacity-100'}`,
            style: { 
              transition: 'opacity 0.3s ease'
            }
          },
          finalText
        )}
      </motion.div>
    </AnimatePresence>
  );