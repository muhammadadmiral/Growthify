// src/pages/user/HelpCenter.jsx
import { useState } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function HelpCenter() {
  const { isDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFaqs, setExpandedFaqs] = useState([]);
  
  // Categories
  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: 'rocket_launch' },
    { id: 'account', name: 'Account & Settings', icon: 'manage_accounts' },
    { id: 'physical', name: 'Physical Goals', icon: 'fitness_center' },
    { id: 'mental', name: 'Mental Growth', icon: 'psychology' },
    { id: 'habits', name: 'Habit Tracking', icon: 'checklist' },
    { id: 'premium', name: 'Premium Features', icon: 'workspace_premium' },
    { id: 'technical', name: 'Technical Support', icon: 'support_agent' }
  ];
  
  // FAQs by category
  const faqsByCategory = {
    'getting-started': [
      {
        id: 'gs-1',
        question: 'How do I set up my first goal?',
        answer: 'To create your first goal, navigate to the Dashboard and click on the "Add Goal" button. From there, you can choose the goal type, set a target date, and add specific details about what you want to achieve.'
      },
      {
        id: 'gs-2',
        question: 'How do I track my progress?',
        answer: 'You can track your progress by updating your goal status regularly. Go to the specific goal on your dashboard, and use the progress slider or update button to record your achievements. The system will automatically generate progress charts and statistics.'
      },
      {
        id: 'gs-3',
        question: 'Can I use Growthify on my mobile device?',
        answer: 'Yes! Growthify is fully responsive and works on all devices. We also offer dedicated mobile apps for iOS and Android that you can download from the respective app stores for an optimized mobile experience.'
      },
      {
        id: 'gs-4',
        question: 'How do I connect with other users?',
        answer: 'You can connect with other users through our Communities feature. Navigate to the Communities section from the sidebar, join groups that interest you, or search for specific users by username and send connection requests.'
      }
    ],
    'account': [
      {
        id: 'acc-1',
        question: 'How do I change my password?',
        answer: 'To change your password, go to Settings > Security tab. You\'ll need to enter your current password for verification, then set your new password. Make sure to use a strong password that\'s at least 8 characters long with a mix of letters, numbers, and symbols.'
      },
      {
        id: 'acc-2',
        question: 'Can I change my username?',
        answer: 'Yes, you can change your username once every 30 days. Go to Settings > Account tab and look for the username field. Click on the edit button next to it to make your change.'
      },
      {
        id: 'acc-3',
        question: 'How do I update my profile picture?',
        answer: 'To update your profile picture, go to your Profile page and click on the current profile image. You\'ll be prompted to upload a new image. We support JPG, PNG, and GIF formats up to 5MB in size.'
      }
    ],
    'physical': [
      {
        id: 'phy-1',
        question: 'How do I create a workout plan?',
        answer: 'To create a workout plan, go to the Physical Goals section and select "Workout Plans". Click on the "Create New Plan" button and follow the guided setup process. You can choose from our templates or create your own custom plan.'
      },
      {
        id: 'phy-2',
        question: 'Can I track my nutrition with Growthify?',
        answer: 'Yes! Our nutrition tracker is available in the Physical Goals section. You can log your meals, track macros and calories, and even scan barcodes for quick food entry. Premium users get additional features like meal planning and nutrient analysis.'
      }
    ],
    'mental': [
      {
        id: 'mnt-1',
        question: 'How do I start a mindfulness practice?',
        answer: 'To begin your mindfulness journey, visit the Mental Growth section and select "Mindfulness". You\'ll find guided sessions for beginners as well as more advanced practices. Start with the "Fundamentals" course if you\'re new to mindfulness meditation.'
      },
      {
        id: 'mnt-2',
        question: 'Where can I find journaling prompts?',
        answer: 'Journaling prompts are available in the Reflection Journal feature under Mental Growth. We provide daily prompts based on your goals and growth areas, or you can choose from our themed prompt collections.'
      }
    ],
    'habits': [
      {
        id: 'hab-1',
        question: 'How do I create a new habit to track?',
        answer: 'To create a new habit, go to the Habit Tracker section and click "Add New Habit". Define your habit, set the frequency (daily, weekly, etc.), and optionally link it to a specific goal. You can also set reminders to help you stay consistent.'
      },
      {
        id: 'hab-2',
        question: 'What is streak protection?',
        answer: 'Streak protection helps you maintain your habit streak even if you miss a day. Free users get 1 streak protection per month, while premium users get unlimited protection. To use it, click on a missed habit and select "Use Streak Protection".'
      }
    ],
    'premium': [
      {
        id: 'prm-1',
        question: 'What features are included in Premium?',
        answer: 'Premium includes advanced analytics, unlimited habit tracking, personalized coaching, exclusive content, priority support, and more. You also get access to our API for integrations with other apps and services.'
      },
      {
        id: 'prm-2',
        question: 'How do I upgrade to Premium?',
        answer: 'You can upgrade to Premium at any time by clicking the "Upgrade" button in your sidebar or profile. We offer monthly and annual subscription options, with a significant discount for annual plans.'
      }
    ],
    'technical': [
      {
        id: 'tec-1',
        question: 'The app is not loading properly. What should I do?',
        answer: 'First, try refreshing the page. If that doesn\'t work, clear your browser cache and cookies, or try using a different browser. If you\'re still experiencing issues, please contact our support team with details about your device and browser.'
      },
      {
        id: 'tec-2',
        question: 'How do I report a bug?',
        answer: 'To report a bug, go to Settings > Help & Support > Report a Bug. Please provide as much detail as possible, including steps to reproduce the issue, screenshots if applicable, and your device/browser information.'
      }
    ]
  };
  
  // Recent articles
  const recentArticles = [
    {
      id: 'article-1',
      title: 'Getting the Most Out of Your Daily Habit Tracking',
      category: 'Habits',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=120&q=80'
    },
    {
      id: 'article-2',
      title: '5 Mindfulness Techniques for Busy Professionals',
      category: 'Mental Growth',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=120&q=80'
    },
    {
      id: 'article-3',
      title: 'Building an Effective Workout Routine for Beginners',
      category: 'Physical Growth',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=120&q=80'
    }
  ];
  
  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Toggle FAQ expansion
  const toggleFaq = (faqId) => {
    if (expandedFaqs.includes(faqId)) {
      setExpandedFaqs(expandedFaqs.filter(id => id !== faqId));
    } else {
      setExpandedFaqs([...expandedFaqs, faqId]);
    }
  };
  
  // Filter FAQs based on search query
  const filteredFaqs = searchQuery.trim() !== '' 
    ? Object.values(faqsByCategory).flat().filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqsByCategory[activeCategory] || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Help Center</h1>
        
        {/* Hero section with search */}
        <div className={`p-8 rounded-xl mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-primary-50'} relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id="dotted-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotted-pattern)" />
            </svg>
          </div>
          
          <div className="relative">
            <h2 className="text-2xl font-bold mb-2">How can we help you?</h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400 max-w-2xl">
              Search our knowledge base or browse the categories below to find answers to your questions.
            </p>
            
            <div className="max-w-2xl relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-rounded text-gray-400">search</span>
              </div>
              <input 
                type="text" 
                className={`w-full pl-10 pr-4 py-3 rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} border shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        
        {/* Main content with categories and FAQs */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Categories sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <h3 className="font-semibold mb-3 text-lg">Categories</h3>
            <ul className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm overflow-hidden`}>
              {categories.map(category => (
                <li key={category.id}>
                  <button
                    onClick={() => {
                      setActiveCategory(category.id);
                      setSearchQuery('');
                    }}
                    className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                      activeCategory === category.id
                        ? isDarkMode 
                          ? 'bg-primary-900/30 text-primary-400' 
                          : 'bg-primary-50 text-primary-600'
                        : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="material-symbols-rounded mr-3">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                    {activeCategory === category.id && (
                      <span className={`ml-auto h-5 w-1 rounded-full ${isDarkMode ? 'bg-primary-400' : 'bg-primary-500'}`}></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Contact support card */}
            <div className={`mt-6 rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <h3 className="font-semibold mb-2">Still need help?</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Contact our support team for personalized assistance.
              </p>
              <button className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors">
                <span className="material-symbols-rounded mr-2">support_agent</span>
                Contact Support
              </button>
            </div>
          </div>
          
          {/* FAQs main content */}
          <div className="flex-grow">
            {searchQuery ? (
              <h3 className="font-semibold mb-4 text-lg">
                Search Results for "{searchQuery}"
                <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  ({filteredFaqs.length} results)
                </span>
              </h3>
            ) : (
              <h3 className="font-semibold mb-4 text-lg">
                {categories.find(c => c.id === activeCategory)?.name || 'FAQs'}
              </h3>
            )}
            
            {filteredFaqs.length > 0 ? (
              <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm overflow-hidden divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {filteredFaqs.map(faq => {
                  const isExpanded = expandedFaqs.includes(faq.id);
                  return (
                    <div key={faq.id} className="group">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
                      >
                        <h4 className={`font-medium pr-8 ${
                          searchQuery && 
                          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) 
                            ? isDarkMode ? 'text-primary-400' : 'text-primary-600'
                            : ''
                        }`}>
                          {faq.question}
                        </h4>
                        <span className={`material-symbols-rounded transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </button>
                      
                      {isExpanded && (
                        <div className={`px-6 pb-4 text-gray-600 dark:text-gray-300 ${
                          searchQuery && 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
                            ? isDarkMode ? 'bg-primary-900/10' : 'bg-primary-50/50'
                            : ''
                        }`}>
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-6 text-center`}>
                <span className="material-symbols-rounded text-4xl text-gray-400 mb-2">search_off</span>
                <h4 className="font-medium mb-1">No results found</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Try adjusting your search query or browse categories instead.
                </p>
              </div>
            )}
            
            {/* Popular articles */}
            {!searchQuery && (
              <div className="mt-8">
                <h3 className="font-semibold mb-4 text-lg">Recent Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentArticles.map(article => (
                    <div 
                      key={article.id}
                      className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md`}
                    >
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <div className="text-xs font-medium text-primary-500 mb-1">
                          {article.category}
                        </div>
                        <h4 className="font-medium mb-2 leading-snug">
                          {article.title}
                        </h4>
                        <button className="text-sm text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 flex items-center">
                          Read More
                          <span className="material-symbols-rounded text-sm ml-1">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Contact section */}
        <div className={`mt-12 rounded-xl p-8 ${isDarkMode ? 'bg-gray-800/80' : 'bg-gray-50'}`}>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Our support team is available 24/7 to assist you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:support@growthify.com" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors">
                <span className="material-symbols-rounded mr-2">mail</span>
                Email Support
              </a>
              <button className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm transition-colors">
                <span className="material-symbols-rounded mr-2">chat</span>
                Live Chat
              </button>
            </div>
          </div>
        </div>
        
        {/* Help center footer */}
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Growthify. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Privacy Policy</a>
            <a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Terms of Service</a>
            <a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}