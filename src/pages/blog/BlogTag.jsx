// src/pages/blog/BlogTag.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import BlogPostCard from '../../components/blog/BlogPostCard';

export default function BlogTag() {
  const { tag } = useParams();
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch blog posts with the specified tag
    // For now, we'll simulate loading and then set placeholder data
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // This would be your actual fetch call in a real application
      // const response = await fetch(`/api/blog/tags/${tag}`);
      // const data = await response.json();
      
      // Placeholder data based on the tag
      const mockPosts = [
        {
          id: 1,
          title: {
            en: "5 Strategies for Building Lasting Habits",
            id: "5 Strategi untuk Membangun Kebiasaan yang Bertahan"
          },
          excerpt: {
            en: "Learn how to create habits that stick with these proven strategies...",
            id: "Pelajari cara membuat kebiasaan yang bertahan dengan strategi terbukti ini..."
          },
          author: {
            name: "John Doe",
            avatar: "/avatars/john.jpg"
          },
          publishDate: new Date().toISOString(),
          readTime: 5,
          category: "habits",
          tags: [tag, "personal-development"],
          imageUrl: "https://via.placeholder.com/800x500"
        },
        {
          id: 2,
          title: {
            en: "The Science Behind Habit Formation",
            id: "Sains di Balik Pembentukan Kebiasaan"
          },
          excerpt: {
            en: "Discover what neuroscience tells us about creating new habits...",
            id: "Temukan apa yang dikatakan ilmu saraf tentang menciptakan kebiasaan baru..."
          },
          author: {
            name: "Jane Smith",
            avatar: "/avatars/jane.jpg"
          },
          publishDate: new Date().toISOString(),
          readTime: 7,
          category: "mindset",
          tags: [tag, "science", "psychology"],
          imageUrl: "https://via.placeholder.com/800x500"
        }
      ];
      
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000); // Simulate network delay
  }, [tag]);
  
  // Format the tag name for display (replace hyphens with spaces, capitalize)
  const formatTagName = (tag) => {
    return tag
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className={`h-10 w-1/2 mb-8 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`h-64 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className={`h-64 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
          Posts tagged with #{formatTagName(tag)}
        </h1>
        <Link to="/blog" className={`inline-flex items-center text-sm ${
          isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
        }`}>
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all posts
        </Link>
      </div>
      
      {posts.length === 0 ? (
        <div className={`p-8 text-center rounded-lg ${
          isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-neutral-100 text-neutral-600'
        }`}>
          <p>No posts found with the tag "{formatTagName(tag)}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map(post => (
            <BlogPostCard 
              key={post.id}
              post={post}
              language={language}
              isDarkMode={isDarkMode}
              readMoreText={language === 'en' ? 'Read More' : 'Baca Selengkapnya'}
            />
          ))}
        </div>
      )}
    </div>
  );
}