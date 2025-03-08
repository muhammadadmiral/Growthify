// src/components/Home/TestimonialCard.jsx
export default function TestimonialCard({ testimonial }) {
    const { quote, name, role, initials, color } = testimonial;
    
    return (
      <div className="bg-white rounded-xl shadow-elegant p-6 relative">
        <div className={`absolute -top-4 left-6 h-8 w-8 bg-${color}-500 rounded-full flex items-center justify-center`}>
          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
          </svg>
        </div>
        <div className="pt-4">
          <p className="text-neutral-700 italic mb-6">
            "{quote}"
          </p>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center">
              <span className="text-neutral-700 font-medium">{initials}</span>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-semibold text-neutral-900">{name}</h4>
              <p className="text-xs text-neutral-500">{role}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }