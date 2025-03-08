// src/components/Dashboard/DashboardHeader.jsx
import { format } from 'date-fns';

export default function DashboardHeader({ user, currentDate }) {
  // Format the current date
  const formattedDate = format(currentDate, 'EEEE, MMMM d, yyyy');
  
  // Generate initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">
          Welcome back, {user.name.split(' ')[0]}!
        </h1>
        <p className="text-neutral-500">{formattedDate}</p>
      </div>
      
      <div className="mt-4 md:mt-0 flex items-center space-x-6">
        <div className="flex items-center">
          <div className="bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm font-medium flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{user.streak} Day Streak</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-neutral-900">Level {user.level}</p>
            <p className="text-xs text-neutral-500">{user.points} points</p>
          </div>
          
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium">
              {getInitials(user.name)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}