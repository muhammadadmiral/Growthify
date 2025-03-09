import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import BlogPostCard from '../../components/blog/BlogPostCard';
import BlogFeatured from '../../components/blog/BlogFeatured';
import BlogCategories from '../../components/blog/BlogCategories';
import BlogNewsletter from '../../components/blog/BlogNewsletter';

// Translation content
const translations = {
  en: {
    title: "Growth Insights",
    subtitle: "Practical tips, research, and guidance to support your personal development journey",
    search: "Search articles...",
    categories: {
      all: "All",
      mindset: "Mindset",
      habits: "Habits",
      body: "Body",
      nutrition: "Nutrition",
      productivity: "Productivity"
    },
    newsletter: {
      title: "Subscribe to our newsletter",
      description: "Get the latest growth insights directly to your inbox",
      placeholder: "Your email address",
      button: "Subscribe",
      privacy: "We respect your privacy. Unsubscribe at any time."
    },
    readMore: "Read More",
    recentPosts: "Recent Posts",
    popularTags: "Popular Tags",
    featuredPost: "Featured"
  },
  id: {
    title: "Wawasan Pertumbuhan",
    subtitle: "Tips praktis, penelitian, dan panduan untuk mendukung perjalanan pengembangan diri Anda",
    search: "Cari artikel...",
    categories: {
      all: "Semua",
      mindset: "Pola Pikir",
      habits: "Kebiasaan",
      body: "Tubuh",
      nutrition: "Nutrisi",
      productivity: "Produktivitas"
    },
    newsletter: {
      title: "Berlangganan newsletter kami",
      description: "Dapatkan wawasan pertumbuhan terbaru langsung ke kotak masuk Anda",
      placeholder: "Alamat email Anda",
      button: "Berlangganan",
      privacy: "Kami menghormati privasi Anda. Berhenti berlangganan kapan saja."
    },
    readMore: "Baca Selengkapnya",
    recentPosts: "Postingan Terbaru",
    popularTags: "Tag Populer",
    featuredPost: "Unggulan"
  }
};

// Mock blog post data
const blogPostsData = [
  {
    id: 1,
    title: {
      en: "5 Science-Backed Ways to Build Lasting Habits",
      id: "5 Cara Berbasis Sains untuk Membangun Kebiasaan yang Bertahan"
    },
    excerpt: {
      en: "Discover the key principles from habit research that can help you create positive changes that stick for the long term.",
      id: "Temukan prinsip-prinsip utama dari penelitian kebiasaan yang dapat membantu Anda menciptakan perubahan positif yang bertahan untuk jangka panjang."
    },
    content: {
      en: "Full content here...",
      id: "Konten lengkap di sini..."
    },
    author: {
      name: "Dr. Alex Johnson",
      avatar: "/avatars/alex.jpg",
      role: "Behavioral Psychologist"
    },
    category: "habits",
    tags: ["habit-building", "psychology", "behavior-change"],
    publishDate: "2025-03-05T08:00:00Z",
    readTime: 7,
    featured: true,
    imageUrl: "https://via.placeholder.com/800x500"
  },
  {
    id: 2,
    title: {
      en: "Mindfulness Meditation: A Beginner's Guide",
      id: "Meditasi Mindfulness: Panduan untuk Pemula"
    },
    excerpt: {
      en: "Learn how to start a mindfulness practice and integrate it into your daily routine for better focus, reduced stress, and improved emotional regulation.",
      id: "Pelajari cara memulai latihan mindfulness dan mengintegrasikannya ke dalam rutinitas harian Anda untuk fokus yang lebih baik, stres berkurang, dan regulasi emosi yang lebih baik."
    },
    content: {
      en: "Full content here...",
      id: "Konten lengkap di sini..."
    },
    author: {
      name: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      role: "Meditation Coach"
    },
    category: "mindset",
    tags: ["meditation", "mindfulness", "mental-health"],
    publishDate: "2025-03-01T10:30:00Z",
    readTime: 5,
    featured: false,
    imageUrl: "https://via.placeholder.com/800x500"
  },
  {
    id: 3,
    title: {
      en: "The Optimal Protein Intake for Muscle Growth",
      id: "Asupan Protein Optimal untuk Pertumbuhan Otot"
    },
    excerpt: {
      en: "What does the latest research tell us about protein requirements for building muscle? This article breaks down the science and provides practical guidelines.",
      id: "Apa yang dikatakan penelitian terbaru tentang kebutuhan protein untuk membangun otot? Artikel ini menguraikan ilmunya dan memberikan panduan praktis."
    },
    content: {
      en: "Full content here...",
      id: "Konten lengkap di sini..."
    },
    author: {
      name: "Dr. Martin Kim",
      avatar: "/avatars/martin.jpg",
      role: "Sports Nutritionist"
    },
    category: "nutrition",
    tags: ["nutrition", "muscle-building", "fitness"],
    publishDate: "2025-02-25T14:15:00Z",
    readTime: 8,
    featured: false,
    imageUrl: "https://via.placeholder.com/800x500"
  },
  {
    id: 4,
    title: {
      en: "How to Design Your Environment for Success",
      id: "Cara Mendesain Lingkungan Anda untuk Kesuksesan"
    },
    excerpt: {
      en: "Your environment has a profound impact on your behaviors and habits. Learn how to structure your surroundings to support your goals.",
      id: "Lingkungan Anda memiliki dampak mendalam pada perilaku dan kebiasaan Anda. Pelajari cara menyusun lingkungan Anda untuk mendukung tujuan Anda."
    },
    content: {
      en: "Full content here...",
      id: "Konten lengkap di sini..."
    },
    author: {
      name: "Jessica Moore",
      avatar: "/avatars/jessica.jpg",
      role: "Productivity Coach"
    },
    category: "productivity",
    tags: ["environment-design", "productivity", "habit-building"],
    publishDate: "2025-02-20T09:45:00Z",
    readTime: 6,
    featured: false,
    imageUrl: "https://via.placeholder.com/800x500"
  },
  {
    id: 5,
    title: {
      en: "The Science of Sleep: How to Optimize Your Rest for Recovery",
      id: "Ilmu Tidur: Cara Mengoptimalkan Istirahat Anda untuk Pemulihan"
    },
    excerpt: {
      en: "Quality sleep is essential for physical and mental recovery. Discover research-backed strategies to improve your sleep quality and duration.",
      id: "Tidur berkualitas sangat penting untuk pemulihan fisik dan mental. Temukan strategi berbasis penelitian untuk meningkatkan kualitas dan durasi tidur Anda."
    },
    content: {
      en: "Full content here...",
      id: "Konten lengkap di sini..."
    },
    author: {
      name: "Dr. Rachel Thompson",
      avatar: "/avatars/rachel.jpg",
      role: "Sleep Researcher"
    },
    category: "body",
    tags: ["sleep", "recovery", "health"],
    publishDate: "2025-02-15T11:20:00Z",
    readTime: 9,
    featured: false,
    imageUrl: "https://via.placeholder.com/800x500"
  },
  {
    id: 6,
    title: {
      en: "The Power of Keystone Habits: Small Changes, Big Results",
      id: "Kekuatan Kebiasaan Kunci: Perubahan Kecil, Hasil Besar"
    },
    excerpt: {
      en: "Some habits matter more than others. Learn how to identify and cultivate keystone habits that can transform multiple areas of your life.",
      id: "Beberapa kebiasaan lebih penting dari yang lain. Pelajari cara mengidentifikasi dan mengembangkan kebiasaan kunci yang dapat mengubah berbagai area kehidupan Anda."
    },
    content: {
      en: "Full content here...",
      id: "Konten lengkap di sini..."
    },
    author: {
      name: "Marcus Brown",
      avatar: "/avatars/marcus.jpg",
      role: "Habit Coach"
    },
    category: "habits",
    tags: ["keystone-habits", "habit-building", "personal-development"],
    publishDate: "2025-02-10T16:40:00Z",
    readTime: 7,
    featured: true,
    imageUrl: "https://via.placeholder.com/800x500"
  }
];

export default function Blog() {
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  // Get featured posts
  const featuredPosts = blogPostsData.filter(post => post.featured);
  
  // Filter posts based on category and search query
  useEffect(() => {
    let filtered = [...blogPostsData];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => {
        const title = post.title[language].toLowerCase();
        const excerpt = post.excerpt[language].toLowerCase();
        return title.includes(query) || excerpt.includes(query);
      });
    }
    
    setFilteredPosts(filtered);
  }, [selectedCategory, searchQuery, language]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} min-h-screen`}>
      {/* Hero section with gradient background */}
      <div 
        className="relative py-20 overflow-hidden"
        style={{ 
          background: isDarkMode 
            ? 'linear-gradient(135deg, #1e3a8a10, #1e1e3a10, #1a2e3510)'
            : 'linear-gradient(135deg, #E6FFFA20, #EBF8FF20, #F0FFF420)',
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -inset-x-40 -top-40 h-[500px] w-[1000px] opacity-50 blur-3xl"
            style={{
              background: isDarkMode
                ? 'radial-gradient(circle at center, rgba(49, 151, 149, 0.1), transparent 70%)'
                : 'radial-gradient(circle at center, rgba(49, 151, 149, 0.2), transparent 70%)'
            }}
          ></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.h1 
            className={`text-4xl md:text-5xl font-bold mb-6 leading-tight font-heading ${
              isDarkMode ? 'text-white' : 'text-neutral-900'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.title}
          </motion.h1>
          
          <motion.p 
            className={`max-w-2xl mx-auto text-lg mb-10 ${
              isDarkMode ? 'text-gray-300' : 'text-neutral-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t.subtitle}
          </motion.p>
          
          {/* Search bar */}
          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-5 py-3 rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-primary-500' 
                    : 'bg-white border-neutral-200 text-neutral-900 focus:border-primary-500'
                } border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg 
                  className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main blog content - 2/3 width on desktop */}
          <div className="lg:col-span-2">
            {/* Category tabs */}
            <BlogCategories 
              categories={t.categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              isDarkMode={isDarkMode}
            />
            
            {/* Featured post */}
            {selectedCategory === 'all' && searchQuery === '' && featuredPosts.length > 0 && (
              <BlogFeatured 
                post={featuredPosts[0]} 
                language={language}
                isDarkMode={isDarkMode}
                readMoreText={t.readMore}
                featuredLabel={t.featuredPost}
              />
            )}
            
            {/* Blog posts grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
            >
              {filteredPosts.map(post => (
                <BlogPostCard 
                  key={post.id}
                  post={post}
                  language={language}
                  isDarkMode={isDarkMode}
                  readMoreText={t.readMore}
                />
              ))}
              
              {/* No results message */}
              {filteredPosts.length === 0 && (
                <div 
                  className={`col-span-2 py-12 text-center ${
                    isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                  }`}
                >
                                      <svg 
                    className="h-12 w-12 mx-auto mb-4 opacity-50" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <p className="text-lg font-medium mb-2">
                    {language === 'en' ? 'No matching articles found' : 'Tidak ada artikel yang cocok'}
                  </p>
                  <p>
                    {language === 'en' 
                      ? 'Try adjusting your search or filter to find what you\'re looking for' 
                      : 'Coba sesuaikan pencarian atau filter Anda untuk menemukan apa yang Anda cari'}
                  </p>
                </div>
              )}
            </motion.div>
            
            {/* Pagination - will be functional in a real implementation */}
            {filteredPosts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button 
                    className={`p-2 rounded-md ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' 
                        : 'bg-white text-neutral-500 hover:bg-neutral-100'
                    } border ${isDarkMode ? 'border-gray-700' : 'border-neutral-200'}`}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-md ${
                      isDarkMode 
                        ? 'bg-primary-700 text-white' 
                        : 'bg-primary-500 text-white'
                    }`}
                  >
                    1
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-md ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' 
                        : 'bg-white text-neutral-500 hover:bg-neutral-100'
                    } border ${isDarkMode ? 'border-gray-700' : 'border-neutral-200'}`}
                  >
                    2
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-md ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' 
                        : 'bg-white text-neutral-500 hover:bg-neutral-100'
                    } border ${isDarkMode ? 'border-gray-700' : 'border-neutral-200'}`}
                  >
                    3
                  </button>
                  <button 
                    className={`p-2 rounded-md ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' 
                        : 'bg-white text-neutral-500 hover:bg-neutral-100'
                    } border ${isDarkMode ? 'border-gray-700' : 'border-neutral-200'}`}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
          
          {/* Sidebar - 1/3 width on desktop */}
          <div className="space-y-8">
            {/* Recent Posts */}
            <div>
              <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {t.recentPosts}
              </h3>
              <div className="space-y-4">
                {blogPostsData.slice(0, 4).map(post => (
                  <Link 
                    key={post.id} 
                    to={`/blog/${post.id}`}
                    className="flex items-start group"
                  >
                    <div 
                      className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0"
                      style={{
                        backgroundImage: `url(${post.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                    <div className="ml-4">
                      <h4 
                        className={`font-medium group-hover:underline ${
                          isDarkMode ? 'text-white' : 'text-neutral-900'
                        }`}
                      >
                        {post.title[language]}
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                        {new Date(post.publishDate).toLocaleDateString()} • {post.readTime} min read
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Tags */}
            <div>
              <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {t.popularTags}
              </h3>
              <div className="flex flex-wrap gap-2">
                {[...new Set(blogPostsData.flatMap(post => post.tags))].map(tag => (
                  <Link 
                    key={tag}
                    to={`/blog/tag/${tag}`}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    } transition-colors`}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Newsletter signup */}
            <BlogNewsletter 
              isDarkMode={isDarkMode}
              newsletterData={t.newsletter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}