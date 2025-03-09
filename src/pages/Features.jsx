// src/pages/Features.jsx
import React from 'react';
import FeatureCard from '../components/Home/FeatureCard';

export default function Features() {
  // Daftar fitur; bisa ditambahkan atau dimodifikasi sesuai kebutuhan
  const features = [
    {
      title: "Mindset Transformation",
      description: "Kembangkan pola pikir yang positif, atasi keyakinan yang membatasi, dan bangun ketahanan emosional untuk meraih kesuksesan.",
      icon: (
        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      benefits: [
        "Latihan mindfulness harian",
        "Teknik kognitif reframing",
        "Sesi visualisasi terpandu"
      ],
      linkTo: "/mindset",
      color: "primary",
    },
    {
      title: "Habit Building",
      description: "Bentuk kebiasaan positif dan rutinitas yang mendukung perkembangan diri Anda.",
      icon: (
        <svg className="h-6 w-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      benefits: [
        "Sistem pelacakan kebiasaan",
        "Pembentukan micro-habits",
        "Sistem akuntabilitas"
      ],
      linkTo: "/habits",
      color: "secondary",
    },
    {
      title: "Body Transformation",
      description: "Capai bentuk tubuh ideal melalui rencana kebugaran dan nutrisi yang dipersonalisasi.",
      icon: (
        <svg className="h-6 w-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      benefits: [
        "Rencana latihan personal",
        "Panduan nutrisi & meal plan",
        "Analitik dan pelacakan progres"
      ],
      linkTo: "/body",
      color: "accent",
    },
    // Tambahkan fitur lainnya jika diperlukan...
  ];

  return (
    <div className="bg-white">
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-8 text-center">Our Features</h1>
        <p className="text-center text-lg text-neutral-600 mb-12">
          Jelajahi alat dan panduan lengkap untuk mendukung transformasi diri Anda.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}
