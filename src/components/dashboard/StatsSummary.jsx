// src/components/Dashboard/StatsSummary.jsx
export default function StatsSummary({ stats }) {
    return (
      <div>
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">Your Progress</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-elegant p-4 border border-neutral-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-neutral-500 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-semibold text-neutral-900">{stat.value}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              
              {stat.change && (
                <div className="mt-2">
                  <span className={`
                    text-xs font-medium px-2 py-1 rounded-full
                    ${stat.changeType === 'positive' ? 'bg-green-100 text-green-800' : 
                      stat.changeType === 'negative' ? 'bg-red-100 text-red-800' : 
                      'bg-neutral-100 text-neutral-600'}
                  `}>
                    {stat.changeType === 'positive' ? '↑' : 
                     stat.changeType === 'negative' ? '↓' : '→'} {stat.change} this week
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }