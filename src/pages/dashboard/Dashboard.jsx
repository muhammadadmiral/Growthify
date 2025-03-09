import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';

import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatsSummary from '../../components/dashboard/StatsSummary';
import GoalProgress from '../../components/dashboard/GoalProgress';
import HabitTracker from '../../components/dashboard/HabitTracker';
import UpcomingActivities from '../../components/dashboard/UpcomingActivities';

export default function Dashboard() {
  const [currentDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState([]);
  const [goals, setGoals] = useState([]);
  const [habits, setHabits] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          // Fetch user profile
          const userRef = doc(db, 'users', authUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUser({
              uid: authUser.uid,
              name: userData.name || authUser.displayName || 'User',
              email: authUser.email,
              avatar: userData.profileImage || authUser.photoURL,
              streak: userData.streak || 0,
              points: userData.points || 0,
              level: userData.level || 1
            });

            // If we don't have real data yet, create some mock data for demonstration
            await fetchOrCreateMockData(authUser.uid, userData);
            
          } else {
            // User document doesn't exist - this shouldn't normally happen with protected routes
            console.error('No user document found');
            navigate('/complete-profile');
          }
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
          setError('Failed to load dashboard data. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      } else {
        // No authenticated user
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Fetch or create mock data for demonstration
  const fetchOrCreateMockData = async (userId, userData) => {
    try {
      // Fetch goals
      const goalsRef = collection(db, 'users', userId, 'goals');
      const goalsSnapshot = await getDocs(goalsRef);
      let fetchedGoals = goalsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // If no goals exist, we'll use mock data
      if (fetchedGoals.length === 0) {
        fetchedGoals = [
          {
            id: 'goal1',
            name: 'Lose 5kg',
            category: 'body',
            dueDate: new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            progress: 35
          },
          {
            id: 'goal2',
            name: 'Meditate Daily',
            category: 'mindset',
            dueDate: new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            progress: 60
          },
          {
            id: 'goal3',
            name: 'Run 5km',
            category: 'fitness',
            dueDate: new Date(currentDate.getTime() + 45 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            progress: 20
          }
        ];
      }
      setGoals(fetchedGoals);

      // Fetch habits
      const habitsRef = collection(db, 'users', userId, 'habits');
      const habitsSnapshot = await getDocs(habitsRef);
      let fetchedHabits = habitsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // If no habits exist, we'll use mock data
      if (fetchedHabits.length === 0) {
        fetchedHabits = [
          {
            id: 'habit1',
            name: 'Morning Exercise',
            time: '06:30 AM',
            completed: false,
            streak: 5
          },
          {
            id: 'habit2',
            name: 'Drink 2L Water',
            time: 'Throughout day',
            completed: true,
            streak: 12
          },
          {
            id: 'habit3',
            name: 'Read 30 minutes',
            time: '09:00 PM',
            completed: false,
            streak: 8
          }
        ];
      }
      setHabits(fetchedHabits);

      // Fetch upcoming activities
      const activitiesRef = collection(db, 'users', userId, 'activities');
      const activitiesQuery = query(
        activitiesRef, 
        where('completed', '==', false)
      );
      const activitiesSnapshot = await getDocs(activitiesQuery);
      let fetchedActivities = activitiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        datetime: doc.data().date ? new Date(doc.data().date.seconds * 1000).toLocaleString() : 'Upcoming'
      }));
      
      // If no activities exist, we'll use mock data
      if (fetchedActivities.length === 0) {
        fetchedActivities = [
          {
            id: 'activity1',
            title: 'Yoga Session',
            category: 'fitness',
            datetime: new Date(currentDate.getTime() + 1 * 24 * 60 * 60 * 1000).toLocaleString()
          },
          {
            id: 'activity2',
            title: 'Nutrition Workshop',
            category: 'nutrition',
            datetime: new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleString()
          },
          {
            id: 'activity3',
            title: 'Meditation Class',
            category: 'mindset',
            datetime: new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleString()
          }
        ];
      }
      setActivities(fetchedActivities);

      // Calculate stats from user data or use placeholders
      const calculatedStats = calculateStats(userData);
      setStats(calculatedStats);
    } catch (error) {
      console.error('Error setting up dashboard data:', error);
      setError('Failed to prepare dashboard data. Please try again later.');
    }
  };

  // Function to calculate dashboard stats
  const calculateStats = (userData) => {
    return [
      { 
        label: language === 'en' ? "Workout Streak" : "Streak Latihan", 
        value: `${userData.workoutStreak || 3} ${language === 'en' ? "days" : "hari"}`, 
        icon: "🏋️‍♂️", 
        change: `+${userData.workoutStreakChange || 1}`, 
        changeType: "positive" 
      },
      { 
        label: language === 'en' ? "Mindfulness" : "Kesadaran", 
        value: `${userData.mindfulnessHours || 5} ${language === 'en' ? "hrs" : "jam"}`, 
        icon: "🧘‍♂️", 
        change: `+${userData.mindfulnessChange || 2}`, 
        changeType: "positive" 
      },
      { 
        label: language === 'en' ? "Sleep Quality" : "Kualitas Tidur", 
        value: `${userData.sleepQuality || 85}%`, 
        icon: "😴", 
        change: `+${userData.sleepQualityChange || 3}`, 
        changeType: "positive" 
      },
      { 
        label: language === 'en' ? "Nutrition" : "Nutrisi", 
        value: userData.nutritionStatus || (language === 'en' ? "Good" : "Baik"), 
        icon: "🥗", 
        change: "", 
        changeType: "neutral" 
      }
    ];
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-neutral-50'}`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 ${isDarkMode ? 'border-primary-400' : 'border-primary-500'}`}></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`flex justify-center items-center min-h-screen p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-neutral-50'}`}>
        <div className={`text-center max-w-md p-6 rounded-xl shadow-lg ${
          isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-neutral-800'
        }`}>
          <svg className="h-12 w-12 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold mb-3">{language === 'en' ? 'Error Loading Dashboard' : 'Kesalahan Memuat Dasbor'}</h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className={`px-4 py-2 rounded-lg ${
              isDarkMode ? 'bg-primary-600 hover:bg-primary-700' : 'bg-primary-500 hover:bg-primary-600'
            } text-white transition-colors`}
          >
            {language === 'en' ? 'Refresh Page' : 'Segarkan Halaman'}
          </button>
        </div>
      </div>
    );
  }

  // No user data
  if (!user) {
    return null;
  }

  // Success state - dashboard content
  return (
    <div className={`w-full p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-neutral-50'}`}>
      <DashboardHeader user={user} currentDate={currentDate} />
      
      {/* Stats */}
      <div className="mt-8">
        <StatsSummary stats={stats} />
      </div>
      
      {/* Two column layout */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <GoalProgress goals={goals} />
          <HabitTracker habits={habits} currentDate={currentDate} />
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          <UpcomingActivities activities={activities} />
          
          {/* Motivation card */}
          <div className={`${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-neutral-100'
          } rounded-xl shadow-elegant p-6 border`}>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-800'} mb-4`}>
              {language === 'en' ? 'Daily Inspiration' : 'Inspirasi Harian'}
            </h3>
            <div className={`${
              isDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600' : 'bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-100'
            } p-4 rounded-lg border`}>
              <p className={`${isDarkMode ? 'text-gray-200' : 'text-neutral-800'} italic`}>
                {language === 'en' 
                  ? '"The only person you should try to be better than is the person you were yesterday."' 
                  : '"Satu-satunya orang yang harus Anda coba untuk lebih baik adalah diri Anda kemarin."'}
              </p>
              <div className="mt-2 text-right">
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>— Unknown</span>
              </div>
            </div>
          </div>
          
          {/* Premium upgrade card */}
          <div className={`rounded-xl overflow-hidden relative ${
            isDarkMode ? 'border border-gray-700' : 'border border-primary-100'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-20"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                  {language === 'en' ? 'Premium Features' : 'Fitur Premium'}
                </h3>
                <span className="px-2 py-1 text-xs font-medium bg-yellow-400 text-yellow-800 rounded-full">PRO</span>
              </div>
              
              <p className={`text-sm mb-5 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                {language === 'en' 
                  ? 'Unlock advanced tracking, expert guidance, and personalized plans.' 
                  : 'Buka pelacakan lanjutan, panduan ahli, dan rencana personal.'}
              </p>
              
              <button className={`w-full py-2 px-4 rounded-lg text-white transition-colors ${
                isDarkMode ? 'bg-primary-600 hover:bg-primary-700' : 'bg-primary-500 hover:bg-primary-600'
              }`}>
                {language === 'en' ? 'Upgrade Now' : 'Tingkatkan Sekarang'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}