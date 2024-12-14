'use client';

export default function QuizCard({ quiz }) {
  return (
    <button 
      className="w-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300
                 hover:scale-[1.02] active:scale-[0.98] border-2 border-transparent hover:border-gray-200"
    >
      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">
            {quiz.title}
          </h2>
          <span className="text-4xl font-bold text-gray-900">
            {quiz.percentage}%
          </span>
        </div>

        <p className="text-lg text-gray-600 font-medium">
          {quiz.correct} of {quiz.total} Correct
        </p>

        <div className="h-2 relative w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`absolute left-0 top-0 h-full ${quiz.color} transition-all duration-500`}
            style={{ width: `${quiz.percentage}%` }}
          />
        </div>
      </div>
    </button>
  );
}