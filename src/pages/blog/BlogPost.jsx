// src/pages/blog/BlogPost.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function BlogPost() {
  const { id } = useParams();
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // In a real app, fetch the blog post data from your API or database
    // For now, we'll simulate loading and then set placeholder data
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // This would be your actual fetch call in a real application
        // const response = await fetch(`/api/blog/${id}`);
        // const data = await response.json();
        
        // Placeholder data
        const mockPost = {
          id: id,
          title: {
            en: "How to Build Lasting Habits",
            id: "Cara Membangun Kebiasaan yang Bertahan Lama"
          },
          content: {
            en: "<p>This is a placeholder content for the blog post.</p>",
            id: "<p>Ini adalah konten placeholder untuk postingan blog.</p>"
          },
          author: {
            name: "John Doe",
            avatar: "/avatars/john.jpg"
          },
          publishDate: new Date().toISOString(),
          readTime: 5,
          category: "habits",
          tags: ["habits", "personal-development", "mindset"]
        };
        
        setPost(mockPost);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load blog post");
        setIsLoading(false);
      }
    }, 1000); // Simulate network delay
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className={`h-10 w-3/4 mb-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div className={`h-6 w-1/2 mb-8 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div className={`h-4 w-full mb-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div className={`h-4 w-full mb-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div className={`h-4 w-3/4 mb-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-red-900/20 text-red-300' : 'bg-red-50 text-red-700'}`}>
          <p>{error}</p>
          <Link to="/blog" className={`mt-4 inline-block px-4 py-2 rounded-lg ${
            isDarkMode ? 'bg-primary-700 text-white' : 'bg-primary-600 text-white'
          }`}>
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-yellow-900/20 text-yellow-300' : 'bg-yellow-50 text-yellow-700'}`}>
          <p>Blog post not found</p>
          <Link to="/blog" className={`mt-4 inline-block px-4 py-2 rounded-lg ${
            isDarkMode ? 'bg-primary-700 text-white' : 'bg-primary-600 text-white'
          }`}>
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
        {post.title[language]}
      </h1>
      
      <div className="flex items-center mb-8">
        <div className="flex items-center">
          {post.author.avatar ? (
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-10 h-10 rounded-full mr-3"
            />
          ) : (
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              isDarkMode ? 'bg-primary-700' : 'bg-primary-500'
            } text-white font-medium`}>
              {post.author.name.charAt(0)}
            </div>
          )}
          <div>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              {post.author.name}
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
              {new Date(post.publishDate).toLocaleDateString()} • {post.readTime} min read
            </p>
          </div>
        </div>
      </div>
      
      <div 
        className={`prose ${isDarkMode ? 'prose-dark text-gray-300' : 'text-neutral-700'} max-w-none`}
        dangerouslySetInnerHTML={{ __html: post.content[language] }}
      ></div>
      
      <div className="mt-8 pt-8 border-t flex flex-wrap gap-2">
        {post.tags.map(tag => (
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
  );
}