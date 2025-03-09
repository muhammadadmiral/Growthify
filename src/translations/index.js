// src/translations/index.js
import authTranslations from './auth';
import commonTranslations from './common';
import dashboardTranslations from './dashboard';
import homeTranslations from './home';
import blogTranslations from './blog';
import pricingTranslations from './pricing';
import featuresTranslations from './features';

// Main translation object combining all modules
const translations = {
  en: {
    ...commonTranslations.en,
    auth: authTranslations.en,
    dashboard: dashboardTranslations.en,
    home: homeTranslations.en,
    blog: blogTranslations.en,
    pricing: pricingTranslations.en,
    features: featuresTranslations.en,
  },
  id: {
    ...commonTranslations.id,
    auth: authTranslations.id,
    dashboard: dashboardTranslations.id,
    home: homeTranslations.id,
    blog: blogTranslations.id,
    pricing: pricingTranslations.id,
    features: featuresTranslations.id,
  }
};

export default translations;