// src/pages/Pricing.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const pricingPlans = [
    {
      title: 'Starter',
      price: '$9/month',
      features: [
        'Akses fitur dasar',
        'Pelacakan kebiasaan terbatas',
        'Dukungan komunitas'
      ],
      popular: false
    },
    {
      title: 'Pro',
      price: '$29/month',
      features: [
        'Semua fitur Starter',
        'Pelacakan kebiasaan lanjutan',
        'Rencana pertumbuhan personal',
        'Dukungan prioritas'
      ],
      popular: true
    },
    {
      title: 'Premium',
      price: '$49/month',
      features: [
        'Semua fitur Pro',
        'Webinar eksklusif',
        'Sesi coaching 1-on-1',
        'Akses awal fitur baru'
      ],
      popular: false
    }
  ];

  return (
    <div className="bg-neutral-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-8 text-center">Pricing Plans</h1>
        <p className="text-center text-lg text-neutral-600 mb-12">
          Pilih paket yang sesuai dengan perjalanan pertumbuhan Anda. Tidak perlu kartu kredit untuk masa percobaan 7 hari.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl shadow-elegant border ${plan.popular ? 'border-primary-500' : 'border-neutral-200'} bg-white`}
            >
              {plan.popular && (
                <div className="mb-4">
                  <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">Most Popular</span>
                </div>
              )}
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">{plan.title}</h2>
              <p className="text-3xl font-bold text-neutral-900 mb-4">{plan.price}</p>
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className="block text-center px-6 py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-all duration-150"
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
