// src/components/Dashboard/HabitTracker.jsx
import { useState } from 'react';
import { format } from 'date-fns';

export default function HabitTracker({ habits, currentDate }) {
  const [habitData, setHabitData] = useState(habits);
  
  // Format the current date for display
  const formattedDate = format(currentDate, 'EEEE, MMMM d');
  
  // Handle habit toggle
  const toggleHabit = (id) => {
    setHabitData(
      habitData.map(habit => 
        habit.id === id 
          ? { 
              ...habit, 
              completed: !habit.completed,
              streak: !habit.completed ? habit.streak + 1 : habit.streak - 1
            } 
          : habit
      )
    );
  };
  
  return (
    <div className="bg-white rounded-xl shadow-elegant p-6 border border-neutral-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-neutral-800">Daily Habits</h2>
          <p className="text-sm text-neutral-500">{formattedDate}</p>
        </div>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Habit
        </button>
      </div>
      
      <div className="space-y-3">
        {habitData.map((habit) => (
          <div 
            key={habit.id}
            className={`
              border rounded-lg p-4 flex items-center justify-between
              ${habit.completed 
                ? 'border-primary-200 bg-primary-50' 
                : 'border-neutral-200'
              }
              transition-colors duration-200
            `}
          >
            <div className="flex items-center">
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`
                  h-6 w-6 rounded-full flex items-center justify-center border
                  ${habit.completed 
                    ? 'bg-primary-500 border-primary-500 text-white' 
                    : 'border-neutral-300'
                  }
                  transition-colors duration-200
                `}
              >
                {habit.completed && (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <div className="ml-3">
                <h3 className="font-medium text-neutral-800">{habit.name}</h3>
                <p className="text-xs text-neutral-500">{habit.time}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="text-right mr-4">
                <span className="text-xs font-medium text-neutral-500">Streak</span>
                <div className="flex items-center text-accent-600">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="font-semibold">{habit.streak}</span>
                </div>
              </div>
              
              <button className="text-neutral-400 hover:text-neutral-500">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {habitData.length === 0 && (
        <div className="text-center py-6">
          <p className="text-neutral-500">No habits added yet.</p>
          <button className="mt-2 text-primary-600 hover:text-primary-700 font-medium">
            Create your first habit
          </button>
        </div>
      )}
    </div>
  );
}