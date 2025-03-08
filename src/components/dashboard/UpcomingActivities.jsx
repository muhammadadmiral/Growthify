// src/components/Dashboard/UpcomingActivities.jsx
export default function UpcomingActivities({ activities }) {
    // Function to get category specific colors
    const getCategoryColor = (category) => {
      switch (category) {
        case 'fitness':
          return 'secondary';
        case 'nutrition':
          return 'accent';
        case 'mindset':
          return 'primary';
        default:
          return 'neutral';
      }
    };
    
    return (
      <div className="bg-white rounded-xl shadow-elegant p-6 border border-neutral-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-neutral-800">Upcoming Activities</h2>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {activities.map((activity) => {
            const color = getCategoryColor(activity.category);
            
            return (
              <div 
                key={activity.id}
                className="border border-neutral-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-neutral-800">{activity.title}</h3>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full bg-${color}-100 text-${color}-800 mt-1`}>
                      {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                    </span>
                  </div>
                  <button>
                    <svg className="h-5 w-5 text-neutral-400 hover:text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center text-neutral-500 text-sm">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {activity.datetime}
                </div>
              </div>
            );
          })}
        </div>
        
        {activities.length === 0 && (
          <div className="text-center py-6">
            <p className="text-neutral-500">No upcoming activities.</p>
            <button className="mt-2 text-primary-600 hover:text-primary-700 font-medium">
              Schedule activity
            </button>
          </div>
        )}
      </div>
    );
  }