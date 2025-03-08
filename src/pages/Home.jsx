// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import CtaSection from '../components/Home/CtaSection';

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}