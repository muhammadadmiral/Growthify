import { Link } from 'react-router-dom';
import HeroSection from '../../components/home/HeroSection';
import FeaturesSection from '../../components/home/FeaturesSection';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import CtaSection from '../../components/home/CtaSection';

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