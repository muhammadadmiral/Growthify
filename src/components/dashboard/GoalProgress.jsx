// src/components/Dashboard/GoalProgress.jsx
export default function GoalProgress({ goals }) {
    // Function to get category specific colors
    const getCategoryColor = (category) => {
      switch (category) {
        case 'body':
          return 'accent';
        case 'mindset':
          return 'primary';
        case 'fitness':
          return 'secondary';
        default:
          return 'neutral';
      }
    };
    
    return (
      <div className="bg-white rounded-xl shadow-elegant p-6 border border-neutral-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-neutral-800">Goal Progress</h2>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Goal
          </button>
        </div>
        
        <div className="space-y-4">
          {goals.map((goal) => {
            const color = getCategoryColor(goal.category);
            
            return (
              <div key={goal.id} className="border border-neutral-200 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-neutral-800">{goal.name}</h3>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full bg-${color}-100 text-${color}-800 mt-1`}>
                      {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-neutral-500">Due: {goal.dueDate}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-neutral-500 mb-1">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${color}-500 rounded-full`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {goals.length === 0 && (
          <div className="text-center py-6">
            <p className="text-neutral-500">No goals created yet.</p>
            <button className="mt-2 text-primary-600 hover:text-primary-700 font-medium">
              Create your first goal
            </button>
          </div>
        )}
      </div>
    );
  }