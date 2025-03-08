// src/components/Home/FeatureCard.jsx
import { Link } from 'react-router-dom';

export default function FeatureCard({ feature }) {
  const { title, description, icon, benefits, linkTo, color } = feature;
  
  return (
    <div className={`bg-white rounded-xl shadow-elegant p-6 border border-neutral-100 hover:border-${color}-100 transition-all duration-300 hover:shadow-premium`}>
      <div className={`h-12 w-12 rounded-lg bg-${color}-100 flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-3">{title}</h3>
      <p className="text-neutral-600 mb-4">
        {description}
      </p>
      <ul className="space-y-2 mb-6">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <svg className={`h-5 w-5 text-${color}-500 mr-2 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-neutral-700">{benefit}</span>
          </li>
        ))}
      </ul>
      <Link
        to={linkTo}
        className={`inline-flex items-center text-${color}-600 font-medium hover:text-${color}-700`}
      >
        Learn more
        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
}