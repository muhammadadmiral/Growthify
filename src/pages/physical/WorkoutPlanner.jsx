// src/pages/physical/WorkoutPlanner.jsx
import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import WorkoutHeader from '../../components/workout/WorkoutHeader';
import WorkoutCalendar from '../../components/workout/WorkoutCalendar';
import WorkoutPlanList from '../../components/workout/WorkoutPlanList';
import WorkoutDetailPanel from '../../components/workout/WorkoutDetailPanel';
import WorkoutCreateModal from '../../components/workout/WorkoutCreateModal';
import LoadingSpinner from '../../components/common/LoadingSpinner';

// Mock data for workout plans (In a real app, this would come from an API/Firebase)
const mockWorkoutPlans = [
  {
    id: "wp1",
    title: "Beginner Strength Training",
    description: "A beginner-friendly routine focusing on building basic strength and proper form.",
    level: "beginner",
    category: "strength",
    frequency: 3,
    duration: 45,
    schedule: ["monday", "wednesday", "friday"],
    exercises: [
      { id: "ex1", name: "Squats", sets: 3, reps: 10, rest: 60, notes: "Focus on form" },
      { id: "ex2", name: "Push-ups", sets: 3, reps: 10, rest: 60, notes: "Modify if needed" },
      { id: "ex3", name: "Plank", sets: 3, reps: "30s", rest: 60, notes: "Hold proper position" }
    ],
    created: new Date("2025-02-25").toISOString(),
    lastUsed: new Date("2025-03-08").toISOString(),
    completedSessions: 8,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "wp2",
    title: "HIIT Cardio Blast",
    description: "A high-intensity interval training routine to boost cardio fitness and burn calories.",
    level: "intermediate",
    category: "cardio",
    frequency: 2,
    duration: 30,
    schedule: ["tuesday", "thursday"],
    exercises: [
      { id: "ex4", name: "Jumping Jacks", sets: 3, reps: "30s", rest: 15, notes: "High intensity" },
      { id: "ex5", name: "Burpees", sets: 3, reps: "30s", rest: 15, notes: "Full extension" },
      { id: "ex6", name: "Mountain Climbers", sets: 3, reps: "30s", rest: 15, notes: "Keep core engaged" },
      { id: "ex7", name: "High Knees", sets: 3, reps: "30s", rest: 15, notes: "Maintain pace" }
    ],
    created: new Date("2025-03-01").toISOString(),
    lastUsed: new Date("2025-03-07").toISOString(),
    completedSessions: 4,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "wp3",
    title: "Yoga Flow",
    description: "A calming yoga routine to improve flexibility, balance, and mental wellbeing.",
    level: "all",
    category: "flexibility",
    frequency: 4,
    duration: 20,
    schedule: ["monday", "wednesday", "friday", "sunday"],
    exercises: [
      { id: "ex8", name: "Sun Salutation", sets: 1, reps: 5, rest: 0, notes: "Flow with breath" },
      { id: "ex9", name: "Warrior Poses", sets: 1, reps: "3 each side", rest: 0, notes: "Hold each for 5 breaths" },
      { id: "ex10", name: "Seated Forward Bend", sets: 1, reps: 3, rest: 0, notes: "Breathe deeply" }
    ],
    created: new Date("2025-02-15").toISOString(),
    lastUsed: new Date("2025-03-09").toISOString(),
    completedSessions: 12,
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  }
];

// Translation content
const translations = {
  en: {
    title: "Workout Planner",
    subtitle: "Create, schedule, and track your workout routines",
    loading: "Loading workout plans...",
    error: "Failed to load workout plans. Please try again.",
    createPlan: "Create New Plan",
    noPlans: "No workout plans found. Create your first plan to get started.",
    upcoming: "Upcoming Workouts",
    noUpcoming: "No upcoming workouts scheduled",
    today: "Today",
    stats: {
      title: "Activity Stats",
      workouts: "Workouts Completed",
      streak: "Current Streak",
      minutes: "Total Minutes",
      days: "days"
    },
    filters: {
      all: "All Plans",
      strength: "Strength",
      cardio: "Cardio",
      flexibility: "Flexibility"
    }
  },
  id: {
    title: "Perencana Latihan",
    subtitle: "Buat, jadwalkan, dan lacak rutinitas latihan Anda",
    loading: "Memuat rencana latihan...",
    error: "Gagal memuat rencana latihan. Silakan coba lagi.",
    createPlan: "Buat Rencana Baru",
    noPlans: "Tidak ada rencana latihan ditemukan. Buat rencana pertama Anda untuk memulai.",
    upcoming: "Latihan Mendatang",
    noUpcoming: "Tidak ada latihan yang dijadwalkan",
    today: "Hari ini",
    stats: {
      title: "Statistik Aktivitas",
      workouts: "Latihan Diselesaikan",
      streak: "Rangkaian Saat Ini",
      minutes: "Total Menit",
      days: "hari"
    },
    filters: {
      all: "Semua Rencana",
      strength: "Kekuatan",
      cardio: "Kardio",
      flexibility: "Fleksibilitas"
    }
  }
};

export default function WorkoutPlanner() {
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const t = translations[language] || translations.en;

  // Simulated data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWorkoutPlans(mockWorkoutPlans);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading workout plans:', err);
        setError(t.error);
        setIsLoading(false);
      }
    };

    loadData();
  }, [t.error]);

  // Filter workout plans based on selected category
  const filteredWorkoutPlans = filter === 'all' 
    ? workoutPlans 
    : workoutPlans.filter(plan => plan.category === filter);

  // Handle plan selection
  const handleSelectPlan = (planId) => {
    const plan = workoutPlans.find(p => p.id === planId);
    setSelectedPlan(plan);
  };

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Handle creating a new workout plan
  const handleCreatePlan = (newPlan) => {
    // In a real app, this would send data to an API/Firebase
    const planWithId = {
      ...newPlan,
      id: `wp${workoutPlans.length + 1}`,
      created: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
      completedSessions: 0
    };
    
    setWorkoutPlans([...workoutPlans, planWithId]);
    setIsCreateModalOpen(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full p-6 flex flex-col justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="large" />
        <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-neutral-600'}`}>
          {t.loading}
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full p-6">
        <div className={`p-6 rounded-xl ${
          isDarkMode ? 'bg-red-900/20 border-red-900 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
        } border text-center`}>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className={`mt-4 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-red-700 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'} text-white`}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      {/* Header with title and create button */}
      <WorkoutHeader 
        title={t.title} 
        subtitle={t.subtitle}
        onCreateClick={() => setIsCreateModalOpen(true)}
        createButtonText={t.createPlan}
        stats={{
          workouts: workoutPlans.reduce((sum, plan) => sum + plan.completedSessions, 0),
          streak: 5, // This would come from user data in a real app
          minutes: workoutPlans.reduce((sum, plan) => sum + (plan.completedSessions * plan.duration), 0)
        }}
        translations={t.stats}
        isDarkMode={isDarkMode}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Left column - Calendar and Workout Plans */}
        <div className="lg:col-span-2 space-y-6">
          {/* Workout Calendar */}
          <WorkoutCalendar 
            workoutPlans={workoutPlans} 
            todayText={t.today}
            upcomingText={t.upcoming}
            noUpcomingText={t.noUpcoming}
            isDarkMode={isDarkMode}
            language={language}
          />
          
          {/* Workout Plan List */}
          <WorkoutPlanList 
            workoutPlans={filteredWorkoutPlans}
            selectedPlanId={selectedPlan?.id}
            onSelectPlan={handleSelectPlan}
            onFilterChange={handleFilterChange}
            currentFilter={filter}
            filters={t.filters}
            noPlansText={t.noPlans}
            isDarkMode={isDarkMode}
          />
        </div>
        
        {/* Right column - Workout Details */}
        <div>
          <WorkoutDetailPanel 
            selectedPlan={selectedPlan}
            isDarkMode={isDarkMode}
            language={language}
          />
        </div>
      </div>
      
      {/* Workout Create Modal */}
      <WorkoutCreateModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreatePlan}
        isDarkMode={isDarkMode}
        language={language}
      />
    </div>
  );
}