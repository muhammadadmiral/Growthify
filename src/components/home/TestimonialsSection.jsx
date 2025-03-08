// src/components/Home/TestimonialsSection.jsx
import TestimonialCard from './TestimonialCard';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Growthify's habit building system completely changed my life. I've gone from procrastinating daily to having a productive morning routine I never miss. The mindset coaching was exactly what I needed.",
      name: "James Davis",
      role: "Marketing Executive",
      initials: "JD",
      color: "primary"
    },
    {
      quote: "I've lost 30 pounds and gained so much confidence using Growthify's body transformation program. The personalized approach made all the difference, and the community support kept me going when things got tough.",
      name: "Sarah Lee",
      role: "Software Engineer",
      initials: "SL",
      color: "secondary"
    },
    {
      quote: "As an entrepreneur, I struggled with balancing work and personal growth. Growthify helped me create systems that prioritize my wellbeing while growing my business. The results have been transformational.",
      name: "Michael Renner",
      role: "Startup Founder",
      initials: "MR",
      color: "accent"
    }
  ];

  return (
    <div className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-neutral-900 mb-4">
            Success Stories
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-neutral-600">
            See how Growthify has helped people transform their lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}