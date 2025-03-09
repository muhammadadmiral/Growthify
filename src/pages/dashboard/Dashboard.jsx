// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import DashboardHeader from '../../components/Dashboard/DashboardHeader';
import StatsSummary from '../../components/Dashboard/StatsSummary';
import GoalProgress from '../../components/Dashboard/GoalProgress';
import HabitTracker from '../../components/Dashboard/HabitTracker';
import UpcomingActivities from '../../components/Dashboard/UpcomingActivities';

export default function Dashboard() {
  const [currentDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState([]);
  const [goals, setGoals] = useState([]);
  const [habits, setHabits] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
              name: userData.name || 'User',
              email: authUser.email,
              avatar: userData.photoURL || null,
              streak: userData.streak || 0,
              points: userData.points || 0,
              level: userData.level || 1
            });

            // Fetch goals
            const goalsRef = collection(db, 'users', authUser.uid, 'goals');
            const goalsSnapshot = await getDocs(goalsRef);
            const fetchedGoals = goalsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setGoals(fetchedGoals);

            // Fetch habits
            const habitsRef = collection(db, 'users', authUser.uid, 'habits');
            const habitsSnapshot = await getDocs(habitsRef);
            const fetchedHabits = habitsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setHabits(fetchedHabits);

            // Fetch upcoming activities
            const activitiesRef = collection(db, 'users', authUser.uid, 'activities');
            const activitiesQuery = query(
              activitiesRef, 
              where('date', '>=', new Date()),
              where('completed', '==', false)
            );
            const activitiesSnapshot = await getDocs(activitiesQuery);
            const fetchedActivities = activitiesSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              datetime: doc.data().date.toDate().toLocaleString()
            }));
            setActivities(fetchedActivities);

            // Calculate stats
            const calculatedStats = calculateStats(userData, fetchedGoals, fetchedHabits);
            setStats(calculatedStats);

            setIsLoading(false);
          } else {
            // User document doesn't exist
            console.error('No user document found');
            navigate('/complete-profile');
          }
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
          setIsLoading(false);
        }
      } else {
        // No authenticated user
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Function to calculate dashboard stats
  const calculateStats = (userData, goals, habits) => {
    return [
      { 
        label: "Workout Streak", 
        value: `${userData.workoutStreak || 0} days`, 
        icon: "🏋️‍♂️", 
        change: `+${userData.workoutStreakChange || 0}`, 
        changeType: "positive" 
      },
      { 
        label: "Mindfulness", 
        value: `${userData.mindfulnessHours || 0} hrs`, 
        icon: "🧘‍♂️", 
        change: `+${userData.mindfulnessChange || 0}`, 
        changeType: "positive" 
      },
      { 
        label: "Sleep Quality", 
        value: `${userData.sleepQuality || 0}%`, 
        icon: "😴", 
        change: `+${userData.sleepQualityChange || 0}`, 
        changeType: "positive" 
      },
      { 
        label: "Nutrition", 
        value: userData.nutritionStatus || "Good", 
        icon: "🥗", 
        change: "", 
        changeType: "neutral" 
      }
    ];
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500"></div>
      </div>
    );
  }

  // No user data
  if (!user) {
    return null;
  }

  return (
    <div className="w-full p-6 bg-background">
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
          <div className="bg-content rounded-xl shadow-elegant p-6 border border-primary-100">
            <h3 className="text-lg font-semibold text-text-dark mb-4">Daily Inspiration</h3>
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-4 rounded-lg border border-primary-100">
              <p className="text-text-dark italic">
                "The only person you should try to be better than is the person you were yesterday."
              </p>
              <div className="mt-2 text-right">
                <span className="text-xs text-text-muted">— Unknown</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}