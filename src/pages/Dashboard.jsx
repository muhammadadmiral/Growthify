// src/pages/Dashboard.jsx
import { useState } from 'react';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import StatsSummary from '../components/Dashboard/StatsSummary';
import GoalProgress from '../components/Dashboard/GoalProgress';
import HabitTracker from '../components/Dashboard/HabitTracker';
import UpcomingActivities from '../components/Dashboard/UpcomingActivities';

export default function Dashboard() {
  const [currentDate] = useState(new Date());
  
  // Mock user data
  const user = {
    name: "Alex Johnson",
    avatar: null, // Will use initials if null
    streak: 15,
    points: 2750,
    level: 8
  };
  
  // Mock stats data
  const stats = [
    { label: "Workout Streak", value: "15 days", icon: "🏋️‍♂️", change: "+3", changeType: "positive" },
    { label: "Mindfulness", value: "7.5 hrs", icon: "🧘‍♂️", change: "+1.2", changeType: "positive" },
    { label: "Sleep Quality", value: "85%", icon: "😴", change: "+5%", changeType: "positive" },
    { label: "Nutrition", value: "Good", icon: "🥗", change: "", changeType: "neutral" }
  ];
  
  // Mock goals data
  const goals = [
    { id: 1, name: "Lose 15 pounds", progress: 65, category: "body", dueDate: "May 15" },
    { id: 2, name: "Meditate daily", progress: 80, category: "mindset", dueDate: "Ongoing" },
    { id: 3, name: "Run 10K", progress: 40, category: "fitness", dueDate: "June 30" }
  ];
  
  // Mock habits data
  const habits = [
    { id: 1, name: "Morning workout", completed: true, streak: 15, time: "6:00 AM" },
    { id: 2, name: "Meditation", completed: true, streak: 22, time: "7:00 AM" },
    { id: 3, name: "Reading", completed: false, streak: 8, time: "9:00 PM" },
    { id: 4, name: "Drink water", completed: true, streak: 30, time: "Throughout day" },
    { id: 5, name: "Journal", completed: false, streak: 5, time: "9:30 PM" }
  ];
  
  // Mock upcoming activities
  const activities = [
    { id: 1, title: "HIIT Workout", datetime: "Today, 6:00 PM", category: "fitness", completed: false },
    { id: 2, title: "Meal Prep", datetime: "Tomorrow, 11:00 AM", category: "nutrition", completed: false },
    { id: 3, title: "Mindfulness Webinar", datetime: "Mar 15, 7:00 PM", category: "mindset", completed: false }
  ];
  
  return (
    <div className="w-full p-6">
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
          <div className="bg-white rounded-xl shadow-elegant p-6 border border-neutral-100">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Daily Inspiration</h3>
            <div className="bg-gradient-premium from-primary-50 to-secondary-50 p-4 rounded-lg">
              <p className="text-neutral-700 italic">
                "The only person you should try to be better than is the person you were yesterday."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}