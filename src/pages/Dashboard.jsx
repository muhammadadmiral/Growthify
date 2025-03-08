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
          <div className="bg-content rounded-xl shadow-elegant p-6 border border-primary-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-text-dark">Goal Progress</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Goal
              </button>
            </div>
            
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="border border-secondary-100 rounded-lg p-4 hover:border-secondary-200 transition-colors">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-text-dark">{goal.name}</h3>
                      {goal.category === 'body' && (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-accent-100 text-accent-800 mt-1">
                          Body
                        </span>
                      )}
                      {goal.category === 'mindset' && (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800 mt-1">
                          Mindset
                        </span>
                      )}
                      {goal.category === 'fitness' && (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-secondary-100 text-secondary-800 mt-1">
                          Fitness
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-text-muted">Due: {goal.dueDate}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-text-muted mb-1">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
                      {goal.category === 'body' && (
                        <div 
                          className="h-full bg-accent-500 rounded-full"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      )}
                      {goal.category === 'mindset' && (
                        <div 
                          className="h-full bg-primary-500 rounded-full"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      )}
                      {goal.category === 'fitness' && (
                        <div 
                          className="h-full bg-secondary-500 rounded-full"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-content rounded-xl shadow-elegant p-6 border border-primary-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-text-dark">Daily Habits</h2>
                <p className="text-sm text-text-muted">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              </div>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Habit
              </button>
            </div>
            
            <div className="space-y-3">
              {habits.map((habit) => (
                <div 
                  key={habit.id}
                  className={`
                    border rounded-lg p-4 flex items-center justify-between transition-colors
                    ${habit.completed 
                      ? 'border-primary-200 bg-primary-50' 
                      : 'border-secondary-200'
                    }
                  `}
                >
                  <div className="flex items-center">
                    <button
                      className={`
                        h-6 w-6 rounded-full flex items-center justify-center border transition-colors
                        ${habit.completed 
                          ? 'bg-primary-500 border-primary-500 text-white' 
                          : 'border-secondary-300'
                        }
                      `}
                    >
                      {habit.completed && (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div className="ml-3">
                      <h3 className="font-medium text-text-dark">{habit.name}</h3>
                      <p className="text-xs text-text-muted">{habit.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="text-right mr-4">
                      <span className="text-xs font-medium text-text-muted">Streak</span>
                      <div className="flex items-center text-accent-600">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span className="font-semibold">{habit.streak}</span>
                      </div>
                    </div>
                    
                    <button className="text-text-muted hover:text-text transition-colors">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          <div className="bg-content rounded-xl shadow-elegant p-6 border border-primary-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-text-dark">Upcoming Activities</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {activities.map((activity) => (
                <div 
                  key={activity.id}
                  className="border border-secondary-200 rounded-lg p-4 hover:border-secondary-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-text-dark">{activity.title}</h3>
                      {activity.category === 'fitness' && (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-secondary-100 text-secondary-800 mt-1">
                          Fitness
                        </span>
                      )}
                      {activity.category === 'nutrition' && (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-accent-100 text-accent-800 mt-1">
                          Nutrition
                        </span>
                      )}
                      {activity.category === 'mindset' && (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800 mt-1">
                          Mindset
                        </span>
                      )}
                    </div>
                    <button>
                      <svg className="h-5 w-5 text-text-muted hover:text-text transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex items-center text-text-muted text-sm">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {activity.datetime}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
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
          
          {/* Stats overview card */}
          <div className="bg-content rounded-xl shadow-elegant p-6 border border-primary-100">
            <h3 className="text-lg font-semibold text-text-dark mb-4">Monthly Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Goals Completed</span>
                <div className="flex items-center">
                  <span className="font-medium text-text-dark">8/12</span>
                  <span className="text-xs text-accent-600 ml-2">+3</span>
                </div>
              </div>
              <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent-500 rounded-full"
                  style={{ width: '67%' }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-text-muted">Habit Consistency</span>
                <div className="flex items-center">
                  <span className="font-medium text-text-dark">82%</span>
                  <span className="text-xs text-accent-600 ml-2">+5%</span>
                </div>
              </div>
              <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 rounded-full"
                  style={{ width: '82%' }}
                ></div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-secondary-100">
                <button className="w-full py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                  View Full Statistics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}