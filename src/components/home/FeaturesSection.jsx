// src/components/Home/FeaturesSection.jsx
import { Link } from 'react-router-dom';
import FeatureCard from './FeatureCard';

export default function FeaturesSection() {
  const features = [
    {
      title: "Mindset Transformation",
      description: "Develop a growth mindset, overcome limiting beliefs, and build emotional resilience for success in all areas of life.",
      icon: (
        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      benefits: [
        "Daily mindfulness practices",
        "Cognitive reframing techniques",
        "Guided visualization sessions"
      ],
      linkTo: "/mindset",
      color: "primary",
    },
    {
      title: "Habit Building",
      description: "Create and maintain positive habits that stick. Break negative patterns and establish routines that serve your goals.",
      icon: (
        <svg className="h-6 w-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      benefits: [
        "Habit tracking system",
        "Micro-habit formation",
        "Accountability systems"
      ],
      linkTo: "/habits",
      color: "secondary",
    },
    {
      title: "Body Transformation",
      description: "Achieve your ideal physique with personalized fitness and nutrition plans, whether you want to lose weight or build muscle.",
      icon: (
        <svg className="h-6 w-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      benefits: [
        "Personalized workout plans",
        "Nutrition guidance & meal plans",
        "Progress tracking & analytics"
      ],
      linkTo: "/body",
      color: "accent",
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-heading text-neutral-900 mb-4">
            Transform Every Aspect of Your Life
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-neutral-600">
            Growthify provides comprehensive tools and guidance to help you evolve in three key areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}