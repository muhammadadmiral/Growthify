// src/pages/Blog.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: '5 Ways to Transform Your Mindset Today',
      excerpt: 'Temukan tips praktis untuk mengubah cara berpikir Anda dan mengoptimalkan potensi diri. Mulailah perjalanan transformasi Anda dengan metode yang telah terbukti.',
      date: 'March 10, 2025',
      imageUrl: 'https://via.placeholder.com/600x400'
    },
    {
      id: 2,
      title: 'How to Build Lasting Habits for Success',
      excerpt: 'Pelajari rahasia di balik pembentukan kebiasaan dan bagaimana menciptakan rutinitas yang bertahan lama. Dari langkah kecil harian hingga perubahan besar dalam hidup.',
      date: 'March 8, 2025',
      imageUrl: 'https://via.placeholder.com/600x400'
    },
    {
      id: 3,
      title: 'Nutrition Tips for a Healthier, Happier You',
      excerpt: 'Berikan asupan yang tepat untuk tubuh Anda dan nikmati manfaat kesehatan yang maksimal. Jelajahi tips nutrisi dari para ahli untuk hidup lebih optimal.',
      date: 'March 5, 2025',
      imageUrl: 'https://via.placeholder.com/600x400'
    }
    // Tambahkan postingan lainnya jika diperlukan...
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-8 text-center">Blog</h1>
        <p className="text-center text-lg text-neutral-600 mb-12">
          Dapatkan tips, cerita, dan wawasan terbaru seputar pertumbuhan diri dan pengembangan pribadi.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-neutral-50 rounded-xl shadow-elegant overflow-hidden border border-neutral-200">
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">{post.title}</h2>
                <p className="text-sm text-neutral-500 mb-4">{post.date}</p>
                <p className="text-neutral-700 mb-6">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="text-primary-600 font-medium hover:text-primary-700">
                  Read More &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
